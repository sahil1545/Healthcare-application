const express = require('express');
const router = express.Router();

// Fallback chain: try newer models first, fall back to stable ones
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];

async function callGemini(prompt) {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) throw new Error('GEMINI_API_KEY is not set in environment variables');

  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    const data = await response.json();

    if (data.error) {
      console.error(`[Gemini] Model "${model}" failed:`, JSON.stringify(data.error));
      continue; // try next model in chain
    }

    console.log(`[Gemini] Success with model: ${model}`);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }

  throw new Error('All Gemini models failed. Check API key quota or permissions.');
}

// ─── AI Chat ──────────────────────────────────────────────────────────────────
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'No message provided' });

    const prompt = `You are an AI Health Assistant for a platform called WellnessHub. The user says: "${message}". Describe potential non-diagnostic medical information realistically or answer any queries directly. End by warning this is an AI response.`;

    const replyText = await callGemini(prompt);
    res.json({ reply: replyText || "I'm sorry, I couldn't process your request." });

  } catch (error) {
    console.error('[AI Chat Error]', error.message);
    res.json({
      reply: `⚠️ The AI assistant is temporarily unavailable. Error: ${error.message}. Please ensure the backend GEMINI_API_KEY is valid.`
    });
  }
});

// ─── AI Symptom Checker Predictor ─────────────────────────────────────────────
router.post('/predict', async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) return res.status(400).json({ message: 'No symptoms provided' });

    const prompt = `Based on the following symptoms: "${symptoms}", predict the possible diseases or conditions. Also strictly recommend ONE specialized doctor type (e.g. Neurologist, Cardiologist, Dermatologist, etc.) that the patient should consult. Provide the output ONLY as a raw valid JSON object without markdown formatting, matching this exact schema: { "conditions": ["Condition 1", "Condition 2"], "specialist": "Specialist Type", "advice": "Brief advice on what to do immediately" }`;

    let replyText = await callGemini(prompt);
    if (!replyText) throw new Error('Empty response from Gemini');

    // Strip markdown code fences if present
    replyText = replyText.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(replyText));

  } catch (error) {
    console.error('[AI Predict Error]', error.message);
    res.json({
      conditions: ['Unable to predict — AI service error'],
      specialist: 'General Physician',
      advice: `AI prediction failed: ${error.message}. Please consult a doctor directly.`,
    });
  }
});

module.exports = router;
