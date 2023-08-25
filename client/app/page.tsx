"use client"

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [responseText, setResponseText] = useState("");

  const SERVER_ENDPOINT =
    process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
    "https://resume-ge1m.onrender.com";

  const handleFileUpload = async (event:any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch(`${SERVER_ENDPOINT}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      
      const result = await response.json();
      console.log(result);
      setResponseText(result.response);
      event.target.value = ""; // Reset file input
    } catch (error) {
      setResponseText(error.message || "Error uploading file.");
    }
  };

  const handleTextSubmit = async () => {
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/print-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const result = await response.text();
      setResponseText(result);
      setText(""); // Reset text area
    } catch (error) {
      setResponseText(error.message || "Error sending text.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Test API</h1>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Upload PDF</h2>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="border p-2"
          aria-label="Upload PDF"
        />
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Send Text</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full p-2 border"
          aria-label="Input text to send"
        ></textarea>
        <button
          onClick={handleTextSubmit}
          className="mt-3 bg-blue-500 text-white p-2 rounded"
        >
          Send Text
        </button>
      </section>

      {responseText && (
        <section className="mt-5 p-5 border rounded">
          <h3 className="text-xl font-semibold mb-3">Response:</h3>
          <p>{responseText}</p>
        </section>
      )}
    </div>
  );
}
