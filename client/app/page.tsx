"use client";
import { useState } from "react";

const apiCall = async (url: string, options: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Server error");
  return res.json();
};

export default function Home() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [showResponse, toggleResponse] = useState(true);
  const SERVER_ENDPOINT =
    process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
    "https://resume-ge1m.onrender.com";

  const handleRequest = async (
    url: string,
    options: RequestInit,
    reset: () => void
  ) => {
    try {
      const result = await apiCall(url, options);
      setResponse(result);
      reset();
    } catch (error: any) {
      setResponse({ response: error.message || "Error" });
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-10 text-center">
          AI Resume Scanning
        </h1>
        <section className="mb-12 bg-blue-50 p-4 rounded">
          <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("pdf", file);
              handleRequest(
                `${SERVER_ENDPOINT}/upload`,
                { method: "POST", body: formData },
                () => (e.target.value = "")
              );
            }}
            className="p-2 border rounded"
            aria-label="Upload PDF"
          />
        </section>
        <hr className="my-8" />
        <section className="mb-12 bg-green-50 p-4 rounded">
          <h2 className="text-2xl font-semibold mb-4">Send Job Details</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-4 border rounded"
            aria-label="Input text to send"
          ></textarea>
          <button
            onClick={() =>
              handleRequest(
                `${SERVER_ENDPOINT}/print-text`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ text }),
                },
                () => setText("")
              )
            }
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded"
          >
            Confirm
          </button>
        </section>
        {showResponse && response?.response && (
          <ResponseSection
            title="Response"
            content={response.response}
            toggle={toggleResponse}
          />
        )}
        {!showResponse && response && (
          <ResponseSection
            title="Additional Information"
            content={JSON.stringify(response, null, 2)}
            toggle={toggleResponse}
          />
        )}
      </div>
    </div>
  );
}

const ResponseSection = ({
  title,
  content,
  toggle,
}: {
  title: string;
  content: string;
  toggle: () => void;
}) => (
  <section className="mt-8 p-6 border rounded bg-gray-50">
    <h3 className="text-2xl font-semibold mb-4">{title}:</h3>
    <p className="text-lg">{content}</p>
    <button
      onClick={toggle}
      className="mt-4 bg-red-500 hover:bg-red-600 text-white p-4 rounded"
    >
      Toggle
    </button>
  </section>
);
