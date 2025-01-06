const API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const API_KEY = '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';



export async function sendMsgToGPT2(message) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: message })
    });
  
    const data = await response.json();
    return data[0]?.generated_text;
  } catch (error) {
    console.error("Error communicating with OpenAI API:", error.message);
    throw new Error("Failed to fetch response from OpenAI.");
  }
}
