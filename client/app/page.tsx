"use client";

import { useState } from "react";

// Function to handle API calls
const apiCall = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Server responded with an error");
  }
  return response.json();
};

export default function Home() {
  const [text, setText] = useState<string>("");
  const [responseText, setResponseText] = useState<string | null>(null);
  const [serverData, setServerData] = useState<any>(null);
  const [showResponse, setShowResponse] = useState<boolean>(true);

  const SERVER_ENDPOINT =
    process.env.NEXT_PUBLIC_SERVER_ENDPOINT ||
    "https://resume-ge1m.onrender.com";

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const result = await apiCall(`${SERVER_ENDPOINT}/upload`, {
        method: "POST",
        body: formData,
      });
      setResponseText(result.response);
      setServerData(result); // Store the entire result object
      event.target.value = ""; // Reset file input
    } catch (error: any) {
      setResponseText(error.message || "Error uploading file.");
    }
  };

  const handleTextSubmit = async () => {
    try {
      const result = await apiCall(`${SERVER_ENDPOINT}/print-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      setResponseText(result.response);
      setServerData(result); // Store the entire result object
      setText(""); // Reset text area
    } catch (error: any) {
      setResponseText(error.message || "Error sending text.");
    }
  };

  const toggleResponse = () => {
    setShowResponse(!showResponse);
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
            onChange={handleFileUpload}
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
            onClick={handleTextSubmit}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded"
          >
            Confirm
          </button>
        </section>
        {showResponse && responseText && (
          <section className="mt-8 p-6 border rounded bg-gray-50">
            <h3 className="text-2xl font-semibold mb-4">Response:</h3>
            <p className="text-lg">{responseText}</p>
            <button
              onClick={toggleResponse}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white p-4 rounded"
            >
              Hide Response
            </button>
          </section>
        )}
        {!showResponse && serverData && (
          <section className="mt-8 p-6 border rounded bg-gray-50">
            <h3 className="text-2xl font-semibold mb-4">
              Additional Information:
            </h3>
            <div>
              <p>
                Double Sentence Percentage:{" "}
                {serverData.doubleSentencePercentage}
              </p>
              <p>
                Passive Words Percentage: {serverData.passiveWordsPercentage}
              </p>
              <p>Impactless Percentage: {serverData.impactlessPercentage}</p>
              <p>Sub Headings: {serverData.subHeadings}</p>
              <p>White Space Percentage: {serverData.whiteSpacePercentage}</p>
              <p>Frequent Job Changes: {serverData.frequentJobChanges}</p>
              <p>Age Category: {serverData.ageCategory}</p>
              <p>
                Has Phone Number:
                <input
                  type="radio"
                  checked={serverData.hasPhoneNumber === "Yes"}
                  readOnly
                />{" "}
                Yes
                <input
                  type="radio"
                  checked={serverData.hasPhoneNumber === "No"}
                  readOnly
                />{" "}
                No
              </p>
              <p>
                Has Email:
                <input
                  type="radio"
                  checked={serverData.hasEmail === "Yes"}
                  readOnly
                />{" "}
                Yes
                <input
                  type="radio"
                  checked={serverData.hasEmail === "No"}
                  readOnly
                />{" "}
                No
              </p>
              <p>
                Has LinkedIn:
                <input
                  type="radio"
                  checked={serverData.hasLinkedIn === "Yes"}
                  readOnly
                />{" "}
                Yes
                <input
                  type="radio"
                  checked={serverData.hasLinkedIn === "No"}
                  readOnly
                />{" "}
                No
              </p>
              <p>
                Has Name:
                <input
                  type="radio"
                  checked={serverData.hasName === "Yes"}
                  readOnly
                />{" "}
                Yes
                <input
                  type="radio"
                  checked={serverData.hasName === "No"}
                  readOnly
                />{" "}
                No
              </p>
            </div>
            <button
              onClick={toggleResponse}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white p-4 rounded"
            >
              Show Response
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
