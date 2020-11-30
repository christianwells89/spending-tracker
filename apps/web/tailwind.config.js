/* eslint-disable @typescript-eslint/no-var-requires */
//   purge: { content: ['./src/**/*.html', './public/index.html', './src/**/*.tsx'] },

const colourPallete = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms/src/index');

const { gray: trueGray, blueGray: gray, ...colours } = colourPallete;

module.exports = {
  theme: {
    colors: {
      ...colours,
      gray, // originally started with gray being what is now blueGray and I like it
      trueGray,
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderStyle: ['last'],
      borderRadius: ['first', 'last'],
      padding: ['first'],
    },
  },
  plugins: [forms],
};
