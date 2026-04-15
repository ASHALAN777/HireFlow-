const { pdfToText } = require("text-from-pdf");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const scoreResume = async (req, res) => {
  const tempFilePath = path.join("/tmp", `resume_${Date.now()}.pdf`);

  try {
    const { jobDescription } = req.body;

    if (!req.file || !jobDescription) {
      return res
        .status(400)
        .json({ message: "Upload a PDF and provide a Job Description" });
    }

    fs.writeFileSync(tempFilePath, req.file.buffer);

    logger.info("DEBUG: File saved to /tmp. Starting text extraction...");

    let resumeText = "";
    try {
      resumeText = await pdfToText(tempFilePath);
      logger.info("DEBUG: Extraction Success. Length:", resumeText.length);
    } catch (pdfErr) {
      logger.info.error("PDF EXTRACTION FAILED:", pdfErr.message);
      return res.status(500).json({
        message: "Failed to read PDF content.",
        error: pdfErr.message,
      });
    } finally {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return res
        .status(400)
        .json({ message: "The PDF seems to be empty or a scanned image." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Analyze Resume: ${resumeText} against Job: ${jobDescription}. Return JSON: {score, strengths, weaknesses, feedback, missingSkills}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });

    const rawText = result.response.text();
    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanJson);

    res.status(200).json(jsonResponse);
  } catch (error) {
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);

    logger.info.error("AI ROUTE ERROR:", error);
    res
      .status(500)
      .json({ message: "Failed to analyze resume.", details: error.message });
  }
};

module.exports = { scoreResume };
