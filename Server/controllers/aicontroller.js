// 1. Keep the mock at the top to be 100% safe on Render
if (typeof global.DOMMatrix === 'undefined') {
  global.DOMMatrix = class DOMMatrix {
    constructor() { this.m11 = 1; this.m22 = 1; this.m33 = 1; this.m44 = 1; }
  };
}

const { pdfToText } = require("text-from-pdf"); // The New Library
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const scoreResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    // 2. Check if file arrived from Multer
    if (!req.file || !jobDescription) {
      return res.status(400).json({ message: "Please upload a PDF and provide a Job Description" });
    }

    console.log("DEBUG: Starting extraction with text-from-pdf...");

    // 3. Extract Text (This library returns a Promise by default)
    let resumeText = "";
    try {
      // Pass the buffer directly to the library
      resumeText = await pdfToText(req.file.buffer);
      console.log("DEBUG: PDF Extraction Success. Length:", resumeText.length);
    } catch (pdfErr) {
      console.error("PDF EXTRACTION FAILED:", pdfErr.message);
      return res.status(500).json({ message: "Failed to read PDF content.", error: pdfErr.message });
    }

    // 4. Safety Check
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ message: "The PDF seems to be empty or a scanned image." });
    }

    // 5. AI Section (Gemini)
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

    console.log("DEBUG: Sending to Gemini...");
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });

    // 6. Safe JSON Parsing
    const rawText = result.response.text();
    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const jsonResponse = JSON.parse(cleanJson);

    res.status(200).json(jsonResponse);

  } catch (error) {
    console.error("AI ROUTE ERROR:", error);
    res.status(500).json({ message: "Failed to analyze resume.", details: error.message });
  }
};

module.exports = { scoreResume };