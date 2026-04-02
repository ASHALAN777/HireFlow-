const { GoogleGenerativeAI } = require("@google/generative-ai");
const pdf = require("pdf-parse");
const logger = require("../middleware/logger");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const scoreResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!req.file || !jobDescription) {
      return res
        .status(400)
        .json({ message: "Upload a PDF and provide a Job Description" });
    }

    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    // --- NEW: PRE-CHECK (Save your API Quota) ---
    if (resumeText.length < 50 || jobDescription.length < 20) {
      return res.status(400).json({
        message:
          "The resume or job description is too short to analyze. Please provide more detail.",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analyze this Resume against the Job Description.
      Resume: ${resumeText}
      Job Description: ${jobDescription}

      Return ONLY a JSON object:
      {
        "score": <number 0-100>,
        "strengths": ["list"],
        "weaknesses": ["list"],
        "feedback": "string",
        "missingSkills": ["list"]
      }
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });

    let jsonResponse = JSON.parse(result.response.text());

    // --- NEW: SMART BACKUP LOGIC (Based on Score) ---

    // 1. Handle Strengths
    if (!jsonResponse.strengths || jsonResponse.strengths.length === 0) {
      jsonResponse.strengths = ["No specific strengths found for this match."];
    }

    // 2. Handle Weaknesses (SMART)
    if (!jsonResponse.weaknesses || jsonResponse.weaknesses.length === 0) {
      if (jsonResponse.score > 80) {
        // High score? Then say it's a great match
        jsonResponse.weaknesses = [
          "No significant weaknesses found. Great match!",
        ];
      } else if (jsonResponse.score < 20) {
        // Low score? Then tell them the content is missing
        jsonResponse.weaknesses = [
          "The resume does not provide enough information to match this job.",
        ];
      } else {
        // Medium score? Just a neutral message
        jsonResponse.weaknesses = [
          "No major weaknesses, but consider adding more relevant projects.",
        ];
      }
    }

    res.status(200).json(jsonResponse);
  } catch (error) {
    logger.error("AI Error:", error);
    if (error.status === 429) {
      return res
        .status(429)
        .json({ message: "AI busy. Try again in 1 minute." });
    }
    res.status(500).json({ message: "Failed to score resume." });
  }
};

module.exports = { scoreResume };
