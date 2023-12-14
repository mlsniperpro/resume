// pages/optimize-resume.js in your Next.js project
"use client";
import React, { useState } from "react";
import Head from "next/head";
import { AiOutlineCloudUpload } from "react-icons/ai"; // Make sure to install react-icons

const jobSamples = [
  "Sales Applications Engineer",
  "Full Stack Engineer",
  "Application Support Engineer",
  "Cyber Security Engineer",
  "Java Software Engineer",
  "Big Data Engineer",
];

const OptimizeResume = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Start processing spinner
      setProcessing(true);
      // Simulate file processing/uploading
      setTimeout(() => {
        setProcessing(false);
        // Move to next step
        setCurrentStep(2);
      }, 3000); // Simulates a 3-second file upload
    }
  };

  const handleJobSubmission = () => {
    // Here you would handle the job description submission
    // Move to next step
    setCurrentStep(3);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Optimize Your Resume</title>
      </Head>

      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">
          Optimize Your Resume In Minutes
        </h1>

        <div className="flex justify-center space-x-4 mb-6">
          {/* Step indicators */}
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center space-x-2 ${
                currentStep === step ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <div
                className={`rounded-full ${
                  currentStep === step
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } w-10 h-10 flex items-center justify-center`}
              >
                {step}
              </div>
              <span>
                {step === 1
                  ? "Upload Resume"
                  : step === 2
                  ? "Add Job"
                  : "View Results"}
              </span>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <>
            {processing ? (
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            ) : (
              <div className="border-dashed border-2 border-blue-300 rounded p-10 mb-4">
                <AiOutlineCloudUpload className="mx-auto text-6xl text-blue-500 mb-4" />
                <p className="mb-2 font-semibold">
                  Upload your resume to get started
                </p>
                <p className="mb-4 text-gray-500">
                  Don't have a resume? Try a sample scan
                </p>
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="resume-upload"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Upload your resume
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  as .pdf or .docx file
                </p>
              </div>
            )}
          </>
        )}

        {currentStep === 2 && (
          <div className="flex gap-4">
            <div className="flex flex-col items-start p-4 border-2 border-dashed border-blue-300 rounded-lg w-1/2">
              <label
                htmlFor="job-description"
                className="text-lg font-semibold mb-2"
              >
                PASTE A JOB DESCRIPTION BELOW
              </label>
              <textarea
                id="job-description"
                placeholder="Job Description..."
                className="p-2 w-full h-48 border-2 border-gray-300 rounded-lg"
              ></textarea>
              <button
                onClick={handleJobSubmission}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                SCAN
              </button>
            </div>

            <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 w-1/2">
              <p className="text-lg font-semibold mb-4">
                USE A SAMPLE JOB DESCRIPTION
              </p>
              {jobSamples.map((job, index) => (
                <p key={index} className="cursor-pointer hover:text-blue-500">
                  {job}
                </p>
              ))}
              <p className="text-xs text-gray-500 mt-4">
                Job Descriptions from Betterteam.com
              </p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            {/* Show results or next steps here */}
            <p>View your optimized resume results...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizeResume;
