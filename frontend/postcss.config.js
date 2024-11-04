module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    // Other PostCSS plugins can go here
    require("postcss-import"),
    // require("some-postcss-plugin")({
    //   from: "C:/WebDev/MERN-CHAT-APP/frontend/src/App.css", // Specify your input file
    // }),
  ],
};
