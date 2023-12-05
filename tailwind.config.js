/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js", // add this line
    ],
    theme: {
        extend: {
            colors: {
                gray: colors.neutral,
            },
            backgroundImage: {
                'img-home': "url('/assets/img/img-home.jpg')",
              }
        },
    },
    darkMode: "class",
    plugins: [require("flowbite/plugin")],
};
