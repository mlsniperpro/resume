const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const cors = require("cors");
const fetch = require("node-fetch");

require("dotenv").config();
const openaiApiKey = process.env.OPENAI_API_KEY;

const reformatResumeArr = [
  {
    role: "system",
    content: `Given the following resume, please restructure it in a standardized format that makes it easier to extract details using regular expressions. Ensure the following:

1. The name should be prefixed with "Name: ".
2. The email should be clearly distinguishable and prefixed with "Email: ".
3. The phone number should be in a clear format and prefixed with "Phone: ".
4. LinkedIn profiles should be clearly mentioned and prefixed with "LinkedIn: ".
5. Job durations should be in the format "YYYY-YYYY".
6. Educational details, especially graduation, should mention the degree, specialization, and year clearly.
7. Any certifications should be clearly listed and prefixed with "Certification: ".
8. Bullet points in work experience should be clear. Also, ensure that:
   - Bullet points with more than one sentence are easily distinguishable.
   - Bullet points starting without a verb are marked.
   - Bullet points without quantification (like percentages or numbers) are marked.
9. Subheadings like "WORK EXPERIENCE", "EDUCATION", etc., should be in uppercase and clearly distinguishable.
10. Ensure there's clear white space between sections for easy identification.

I am looking to extract and analyze the following details:
- Double Sentence %
- Passive Words %
- Impactless %
- Sub Heading %
- White Space %
- Frequency of Job Change
- Certifications
- Level of Education
- Phone Number Mentioned
- Email Mentioned
- Linkedin Profile Mentioned
- Name mentioned
`
  }

]

const conversationArr = [
  {
    role: "system",
    content:
      "You are a technical reviewer for the resume. Give feedback for the user's resume and areas of improvements.",
  },
];

const handleSubmit = async (messages_) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-16k",
        messages: messages_,
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const rankResume = (resumeText, reformatedResume) => {
  // Bullet Points
  const bulletPoints = resumeText.match(/•[^\n]+/g) || [];
  const totalBulletPoints = bulletPoints.length;

  // Double Sentence Bullet Points
  const doubleSentenceBulletPoints = bulletPoints.filter(
    (bp) => bp.split(".").length > 2
  ).length;

  // Passive Bullet Points (simplified)
  const passiveBulletPoints = bulletPoints.filter(
    (bp) => !/^[•\s]*(\w+ed |is |was |were |be |been )/.test(bp)
  ).length;

  // Impactless Bullet Points
  const impactlessBulletPoints = bulletPoints.filter(
    (bp) => !/\d/.test(bp)
  ).length;

  // Subheadings
  // Subheadings (Capturing lines that are in uppercase and followed by a newline)
  const subHeadingsMatches = resumeText.match(/^[A-Z\s]+$/gm);
  const subHeadings = subHeadingsMatches ? subHeadingsMatches.length : 0;

  // White Space
  const whiteSpaces = resumeText.match(/\n\s*\n/g) || [];
  const whiteSpacePercentage =
    (whiteSpaces.length / resumeText.split("\n").length) * 100;

  // Phone Number (Adjusted for different formats)
  const hasPhoneNumber =
    /\b(\+\d{1,4}[-.\s]?)?\d{1,4}[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b/.test(
      reformatedResume
    )
      ? "Yes"
      : "No";

  // Email
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/.test(
    resumeText
  )
    ? "Yes"
    : "No";

  // LinkedIn Profile
  const hasLinkedIn = /linkedin\.com\/in\/[A-Za-z0-9_-]+/.test(reformatResumeArr)
    ? "Yes"
    : "No";

  // Name (simplified)
  const hasName = /Name: [A-Za-z\s]+/.test(reformatedResume) ? "Yes" : "No";

  // Frequency of Job Change
  const jobDurations = resumeText.match(/\b\d{4}\b-\b\d{4}\b/g) || [];
  const frequentJobChanges = jobDurations.filter((duration) => {
    const [start, end] = duration.split("-").map(Number);
    return end - start < 2;
  }).length;

  // Certifications (simplified)
  const certifications = ["CertA", "CertB", "CertC"]; // Example certifications
  const mentionedCertifications = certifications.filter((cert) =>
    new RegExp(cert).test(resumeText)
  );

  // Level of Education and Age (simplified)
  const bachelorsMatch = resumeText.match(/Bachelors in [A-Za-z\s]+, (\d{4})/);
  const graduationYear = bachelorsMatch ? parseInt(bachelorsMatch[1]) : null;
  const currentYear = new Date().getFullYear();
  const ageAfterGraduation = graduationYear
    ? currentYear - graduationYear
    : null;

  let ageCategory;
  if (ageAfterGraduation <= 24) {
    ageCategory = "Up to 24";
  } else if (ageAfterGraduation <= 27) {
    ageCategory = "24-27";
  } else {
    ageCategory = "Over 27";
  }

  return {
    doubleSentencePercentage:
      totalBulletPoints !== 0
        ? (doubleSentenceBulletPoints / totalBulletPoints) * 100
        : 0,
    passiveWordsPercentage:
      totalBulletPoints !== 0
        ? (passiveBulletPoints / totalBulletPoints) * 100
        : 0,
    impactlessPercentage:
      totalBulletPoints !== 0
        ? (impactlessBulletPoints / totalBulletPoints) * 100
        : 0,
    subHeadings,
    whiteSpacePercentage,
    hasPhoneNumber,
    hasEmail,
    hasLinkedIn,
    hasName,
    frequentJobChanges,
    mentionedCertifications,
    ageCategory,
  };
};


const app = express();
const port = 3000;

app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.json());

app.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  console.log(req.file);
  try {
    const data = await pdf(req.file.buffer);
    const reformatedResumeArr = [
      ...reformatResumeArr,
      {
        role: "user",
        content: data.text,
      },
    ]
    const reformatedResume = await handleSubmit(reformatedResumeArr);
    console.log("The reformated resume", reformatedResume);
    const rankedData = rankResume(data.text, reformatedResume);
    const feedbackMessage = `The resume has a double sentence percentage of ${
      rankedData.doubleSentencePercentage
    }% and ${
      rankedData.passiveWordsPercentage
    }% of bullet points start without a verb. The impactless percentage is ${
      rankedData.impactlessPercentage
    }%. The resume has ${
      rankedData.subHeadings
    } subheadings and a whitespace percentage of ${
      rankedData.whiteSpacePercentage
    }%. Phone number mentioned: ${
      rankedData.hasPhoneNumber
    }. Email mentioned: ${rankedData.hasEmail}. LinkedIn profile mentioned: ${
      rankedData.hasLinkedIn
    }. Name mentioned: ${
      rankedData.hasName
    }. The candidate changed jobs frequently ${
      rankedData.frequentJobChanges
    } times. Certifications mentioned match with work experience: ${rankedData.mentionedCertifications.join(
      ", "
    )}. Age category after graduation: ${rankedData.ageCategory}.`;
    const newConversationArr = [
      ...conversationArr,
      {
        role: "user",
        content: feedbackMessage,
      },
    ];
    const response = await handleSubmit(newConversationArr);
    const finalResponse = {
      ...rankedData,
      response,
    }
    console.log("The final response", finalResponse);
    res.status(200).send(finalResponse);
  } catch (err) {
    res.status(500).send("Error processing PDF");
  }
});

app.post("/print-text", (req, res) => {
  if (!req.body.text) {
    return res.status(400).send("No text provided");
  }
  console.log(req.body.text);
  res.status(200).send("Text received and printed");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
