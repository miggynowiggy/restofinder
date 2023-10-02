/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx,jsx,js,ts}"],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      fontFamily: {
        body: "Inter, Avenir, Helvetica, Arial, san-serif"
      }
    }
  },
  plugins: []
};
