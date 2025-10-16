import React, { useState } from "react";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse("Thinking...");

    const res = await fetch("http://127.0.0.1:8000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-lg rounded-xl p-4 w-96">
      <h2 className="text-lg font-bold mb-2">Gemini Assistant</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border rounded-md p-2 text-sm"
          rows={3}
          placeholder="Ask Gemini something..."
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-black px-3 py-1 rounded-md text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </form>
      {response && (
        <div className="mt-3 bg-gray-100 p-2 rounded-md text-sm whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}
