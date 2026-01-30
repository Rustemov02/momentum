import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const HISTORY_KEY = "momentum_ai_history";

// localStorage-dən history oxu
function loadHistory(): Array<{
  role: string;
  parts: Array<{ text: string }>;
}> {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// localStorage-ə history yaz
function saveHistory(
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (err) {
    console.error("History saxlanmadı:", err);
  }
}

let conversationHistory = loadHistory();

// Retry funksiyası
async function retryWithDelay<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 2000,
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isLastRetry = i === maxRetries - 1;
      const isOverloaded = error?.message?.includes("overloaded");

      if (isOverloaded && !isLastRetry) {
        console.log(
          `Server məşğuldur, ${delay}ms sonra yenidən cəhd edirəm...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Maksimum cəhd sayına çatıldı");
}

export async function sendMessageToGemini(
  message: string,
  userName?: string,
): Promise<string> {
  try {
    if (conversationHistory.length === 0) {
      conversationHistory.push({
        role: "user",
        parts: [
          {
            text: `Sən Momentum tətbiqinin AI köməkçisisən. Yalnız Momentum haqqında (qeyd, tag, axtarış, edit, silmək) qısa cavab ver. Başqa mövzularda "Mən yalnız Momentum haqqında kömək edə bilərəm" de.`,
          },
        ],
      });
      conversationHistory.push({
        role: "model",
        parts: [{ text: "Anladım!" }],
      });
      saveHistory(conversationHistory);
    }

    conversationHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    const result = await retryWithDelay(async () => {
      const responsePromise = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: conversationHistory,
      });
      return await responsePromise;
    });

    // @ts-ignore
    const aiResponse = result.text || "Cavab alına bilmədi";

    conversationHistory.push({
      role: "model",
      parts: [{ text: aiResponse }],
    });

    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    saveHistory(conversationHistory);

    return aiResponse;
  } catch (err: any) {
    console.log("GEMINI AI ERROR : ", err);

    if (err?.message?.includes("overloaded")) {
      return "Server hazırda çox məşğuldur. Zəhmət olmasa bir neçə saniyə sonra yenidən cəhd edin.";
    }

    return "Üzr istəyirik xəta baş verdi. Zəhmət olmasa yenidən cəhd edin!";
  }
}

export function resetConversation() {
  conversationHistory = [];
  localStorage.removeItem(HISTORY_KEY);
}
