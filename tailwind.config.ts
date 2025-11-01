// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          50: "#eff6ff",
        },
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(2,6,23,0.2)",
      },
    },
  },
  plugins: [],
};
