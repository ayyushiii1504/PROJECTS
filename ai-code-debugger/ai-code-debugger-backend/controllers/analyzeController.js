import { GoogleGenerativeAI } from "@google/generative-ai";
import DebugHistory from '../models/DebugHistory.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCode = async (req, res) => {
  const { code, language } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      Analyze this ${language} code for errors and suggest improvements:
      \n\n${code}
      \n\nFormat response as:
      - Line X: [ERROR_TYPE] Explanation...
      - Suggestion: Fix...
    `;

    //const result = await model.generateContent(prompt);
    const result = await model.generateContent(prompt);
    if (!result.response) {
      throw new Error('No response from Gemini API');
    }
    const response = await result.response;
    const analysis = response.text();

    // Save to database
    const newLog = new DebugHistory({
      userId,
      code,
      language,
      analysis,
      timestamp: new Date()
    });
    await newLog.save();

    res.json({ analysis });
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({
      error: err.message || 'Analysis failed',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await DebugHistory.find({ userId: req.userId })
      .sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
