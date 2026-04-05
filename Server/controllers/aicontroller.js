const { pdfToText } = require("text-from-pdf");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");   // New: for temp files
const path = require("path"); // New: for paths

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const scoreResume = async (req, res) => {
  // Define a temporary path in the only writable folder on Render
  const tempFilePath = path.join("/tmp", `resume_${Date.now()}.pdf`);

  try {
    const { jobDescription } = req.body;

    if (!req.file || !jobDescription) {
      return res.status(400).json({ message: "Upload a PDF and provide a Job Description" });
    }

    // --- STEP 1: Save the Binary Buffer to a temporary file ---
    // text-from-pdf MUST have a file path to work
    fs.writeFileSync(tempFilePath, req.file.buffer);

    console.log("DEBUG: File saved to /tmp. Starting text extraction...");

    // --- STEP 2: Extract Text using the file path ---
    let resumeText = "";
    try {
      resumeText = await pdfToText(tempFilePath);
      console.log("DEBUG: Extraction Success. Length:", resumeText.length);
    } catch (pdfErr) {
      console.error("PDF EXTRACTION FAILED:", pdfErr.message);
      return res.status(500).json({ message: "Failed to read PDF content.", error: pdfErr.message });
    } finally {
      // --- STEP 3: Clean up (Delete the temp file) ---
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }

    // 4. Safety Check
    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ message: "The PDF seems to be empty or a scanned image." });
    }

    // 5. AI Section (Gemini)
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
    // Ensure file is deleted even if AI fails
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    
    console.error("AI ROUTE ERROR:", error);
    res.status(500).json({ message: "Failed to analyze resume.", details: error.message });
  }
};

module.exports = { scoreResume };