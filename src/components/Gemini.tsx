import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Gemini({ prompt, onResponse }) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!prompt) return;

    const fetchAIResponse = async () => {
      setResponse("Analyzing...");
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        setResponse(data.response);
        if (onResponse) onResponse(data.response); // pass to parent
      } catch (err) {
        setResponse("Error fetching AI response.");
      }
    };

    fetchAIResponse();
  }, [prompt]);

//   return (
//     <div className="text-sm mt-2 bg-gray-50 p-2 rounded-md">
//       {response}
//     </div>
//   );
return (
  <div className="text-sm mt-2 bg-gray-50 p-3 rounded-md prose prose-sm max-w-none">
    {response === "Analyzing..." ? (
      <p className="italic text-gray-500">{response}</p>
    ) : (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {response}
      </ReactMarkdown>
    )}
  </div>
);
}
