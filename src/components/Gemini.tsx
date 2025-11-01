import React from "react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Gemini({ prompt, onResponse, variant = "default" }: {
  prompt: string;
  onResponse?: (response: string) => void;
  variant?: "member" | "group" | "trip" | "default";
}) {
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!prompt) return;

    const fetchAIResponse = async () => {
      setResponse("Analyzing...");
      try {
        const backendUrl = "https://team-mavrix-backend.vercel.app/";
        const res = await fetch(`${backendUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        setResponse(data.response);
        if (onResponse) onResponse(data.response);
      } catch (err) {
        setResponse("Error fetching AI response.");
      }
    };

    fetchAIResponse();
  }, [prompt]);

  const baseClass =
    "text-sm rounded-xl prose prose-sm max-w-none overflow-y-auto scrollbar-thin shadow-sm transition-all duration-200";

  const styles = {
    member: `${baseClass} bg-blue-50 border border-blue-200 p-2 scrollbar-thumb-blue-300 scrollbar-track-transparent`,
    group: `${baseClass} bg-blue-50 border border-blue-200 p-3 mt-3 mx-auto scrollbar-thumb-blue-300 scrollbar-track-transparent`,
    trip: `${baseClass} bg-blue-50 border border-blue-200 p-3 mt-4 mx-auto scrollbar-thumb-blue-300 scrollbar-track-transparent`,
    default: `${baseClass} bg-gray-50 border border-gray-200 p-2 mt-2 mx-auto scrollbar-thumb-gray-300 scrollbar-track-transparent`,
  };

  const boxStyle = {
    maxHeight:
      variant === "trip" ? "220px" : variant === "group" ? "180px" : "140px",
    width:
      variant === "trip"
        ? "99%"
        : variant === "group"
        ? "99%"
        : "85%",
    minHeight: "60px",
    lineHeight: "1.55",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <div className={styles[variant]} style={boxStyle}>
      {response === "Analyzing..." ? (
        <p className="italic text-gray-500 text-center">{response}</p>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {response}
        </ReactMarkdown>
      )}
    </div>
  );
}