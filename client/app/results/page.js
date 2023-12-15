"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
const ResumeAnalysis = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Resume scan results</h1>
          <div className="flex items-center">
            <button className="text-blue-500 hover:text-blue-600">
              Dashboard
            </button>
            <span className="mx-2">|</span>
            <button className="text-blue-500 hover:text-blue-600">
              LinkedIn Scan
            </button>
            <span className="mx-2">|</span>
            <button className="text-blue-500 hover:text-blue-600">
              Job Tracker
            </button>
            <span className="mx-2">|</span>
            <button className="text-blue-500 hover:text-blue-600">
              Scan History
            </button>
            <span className="mx-2">|</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              New Scan
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/4 pr-4">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Full stack engineer</h2>
                <span className="text-sm text-gray-500">PETER</span>
              </div>
              <div className="mt-2">
                <div className="w-32 h-32 bg-gray-300 rounded-full text-sm flex items-center justify-center">
                  <span>
                    Low
                    <br />
                    Match rate
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
                Upload & rescan
              </button>
            </div>
            <div className="mb-4">
              <button className="bg-gray-300 text-gray-700 w-full py-2 rounded hover:bg-gray-400">
                Power Edit
              </button>
            </div>
            <div className="text-sm">
              <div className="mb-2">
                <span className="font-semibold">Searchability</span>{" "}
                <span className="text-red-500">3 issues to fix</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Skills</span>{" "}
                <span className="text-red-500">34 issues to fix</span>
              </div>
              <div className="mb-2">Recruiter tips</div>
              <div className="mb-2">Formatting</div>
              <div className="mb-2">Cover letter</div>
              <div className="mb-2">Guide me</div>
            </div>
          </div>
          <div className="w-3/4 pl-4">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Searchability</h2>
                <span className="text-sm text-gray-500">IMPORTANT</span>
              </div>
              <p className="text-sm mt-2">
                Applicant Tracking Systems (ATS) are computers that process your
                resume to understand your work history and relevance to the job
                description. These findings typically include your work history,
                job titles, relevant skills and education, as well as contact
                information like your name, phone number, and email address.
              </p>
              <p className="text-sm mt-2">
                Tip: Complete all checks below to ensure your resume is easily
                searchable by recruiters and ATS.
              </p>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">ATS tip</h3>
                <span className="text-red-500 text-sm">
                  <FontAwesomeIcon icon={faTimesCircle} /> Adding this job's
                  company name and web address can help us provide you
                  ATS-specific tips.
                </span>
              </div>
              <div className="text-sm mt-2 text-blue-500 hover:text-blue-600 cursor-pointer">
                Add missing scan information
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Contact info</h3>
                <div>
                  <span className="text-green-500 text-sm">
                    <FontAwesomeIcon icon={faCheckCircle} /> You provided your
                    phone number.
                  </span>
                  <span className="text-green-500 text-sm ml-4">
                    <FontAwesomeIcon icon={faCheckCircle} /> You provided your
                    email.
                  </span>
                  <span className="text-red-500 text-sm ml-4">
                    <FontAwesomeIcon icon={faTimesCircle} /> We did not find an
                    address in your resume.
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Job title match</h3>
                <span className="text-red-500 text-sm">
                  <FontAwesomeIcon icon={faTimesCircle} /> The full stack
                  engineer job title provided or found in the job description
                  was not found in your resume.
                </span>
              </div>
              <div className="text-sm mt-2 text-blue-500 hover:text-blue-600 cursor-pointer">
                Incorrect job title in the job description?
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Education match</h3>
                <span className="text-red-500 text-sm">
                  <FontAwesomeIcon icon={faTimesCircle} /> This job requires or
                  prefers a Bachelor's degree. A Bachelor's degree was found in
                  your resume.
                </span>
              </div>
              <div className="text-sm mt-2 text-blue-500 hover:text-blue-600 cursor-pointer">
                Update required education level
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Section headings</h3>
                <div>
                  <span className="text-green-500 text-sm">
                    <FontAwesomeIcon icon={faCheckCircle} /> We found the work
                    experience section in your resume.
                  </span>
                  <span className="text-green-500 text-sm ml-4">
                    <FontAwesomeIcon icon={faCheckCircle} /> We found the
                    education section in your resume.
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Date formatting</h3>
                <span className="text-green-500 text-sm">
                  <FontAwesomeIcon icon={faCheckCircle} /> The dates in your
                  work experience section are properly formatted.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
