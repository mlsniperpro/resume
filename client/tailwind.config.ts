import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#4B9CD3", // Replace with the hex code for your custom blue color
        "custom-cyan": "#2CAEBA", // Replace with the hex code for your custom cyan color
      },
      gradientColorStops: (theme) => ({
        "custom-blue-start": "#4B9CD3", // Replace with the starting hex code of your gradient
        "custom-blue-end": "#2CAEBA", // Replace with the ending hex code of your gradient
      }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // Define a custom linear gradient
        "gradient-custom-linear":
          "linear-gradient(to right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
