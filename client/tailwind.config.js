/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        
        green: {
          50: '#30AF5B',
          90: '#292C27',
        },
        gray: {
          10: '#EEEEEE',
          20: '#A2A2A2',
          30: '#7B7B7B',
          
          90: '#141414',
        },
      },
      backgroundImage: {
        hero: "url('/src/assets/bgecom.png')",
        banneroffer: "url('/src/assets/banneroffer.png')",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require("tailwind-scrollbar"),

  ],
}

