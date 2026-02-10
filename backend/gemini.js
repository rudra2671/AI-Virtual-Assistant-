
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GEMINI_API_KEY, // 👈 reuse same env name
});

const geminiResponse = async (command, assistantName, userName) => {

  const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Only respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" |
          "get-time" | "get-date" | "get-day" | "get-month" |
          "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<cleaned user input>",
  "response": "<short voice-friendly reply>"
}

User input:
${command}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const text = completion.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No response from Groq");
    }

    return text;

  } catch (error) {
    console.error("Groq error:", error.message);

    // ✅ SAFE FALLBACK (prevents frontend crash)
    return JSON.stringify({
      type: "general",
      userInput: command,
      response: "I'm having trouble right now. Please try again in a moment."
    });
  }
};

export default geminiResponse;