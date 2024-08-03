/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        0: "#EE805F",
        100: "#FE3673"
      },
      secondary: "#FFA5AB",
      success: "#44E4B7",
      accent: "#3EBCED",
      warning: "#DDB32B",
      gray: {
        0: "#B1B5BC",
        100: "#7D848F"
      },
      light: "#FDFDFD",
      dark: "#1A1A1A",
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}

