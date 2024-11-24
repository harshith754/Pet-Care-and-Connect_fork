/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        deepskyblue: "#00ACE5",
        aliceblue: {
          "100": "#ebf2fb",
          "200": "#ebf2fb",
        },
        gray: {
          "100": "#1e2640",
          "200": "rgba(0, 0, 0, 0.5)",
        },
        darkgray: {
          "100": "#b4b4b4",
          "200": "#9c9c9c",
        },
        ghostwhite: "#f6faff",
        black: "#000",
        darkslategray: "#19355b",
      },
      fontFamily: {
        inter: "Inter",
        roboto: "Roboto",
        puritan: "Puritan",
        "radio-canada": "'Radio Canada'",
        jaldi: "Jaldi",
        jua: "Jua",
        inherit: "inherit",
        "istok-web": "'Istok Web'",
        times: ["Times New Roman", "serif"], 
      },
      borderRadius: {
        "281xl": "300px",
        "41xl": "60px",
        "101xl": "120px",
        "61xl": "80px",
        "11xl": "30px",
        xl: "20px",
        "81xl": "100px",
      },
    },
    fontSize: {
      "6xl": "25px",
      "11xl": "30px",
      "21xl": "40px",
      "61xl": "80px",
      "16xl": "35px",
      "41xl": "60px",
      "31xl": "50px",
      xl: "20px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1500px",
      },
      md: {
        max: "960px",
      },
      sm: {
        max: "420px",
      },
    },
    backgroundImage: {
      "deepskyblue": ' linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);',
    },
    

  },
  corePlugins: {
    preflight: false,
  },
}
