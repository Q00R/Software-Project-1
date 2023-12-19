/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          "light-blue": "#9cdbff",
          "cyan": "#9cdbff",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      screens: {
        
      },
    },
  },
  plugins: [],
});
