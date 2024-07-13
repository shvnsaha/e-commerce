/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      padding:{
        DEFAULT: '1rem',
        lg: '0',
      },
      screens:{
       'xxs': '540px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1170px'
      },
    },
    extend: {
      // colors: {
      //   "green" : "#39DB4A",
      //   "red" : "#FF6868",
      //   "primaryBG" : "#FCFCFC",
      //   primary: '#212353',
      //   secondary: '#4B5D68',
      //   accent:{
      //     primary: '#9C69E2',
      //     primary_hover: '#9059DB',
      //     secondary: '#F063B8',
      //     secondary_hover: '#E350A9',
      //     tertiary: '#68C9BA',
      //   }
      // }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

