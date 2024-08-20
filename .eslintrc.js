module.exports = {
    // root: true,
    // extends: '@react-native',
    parserOptions: {
      ecmaVersion: 2021, // or a different ECMAScript version if needed
      sourceType: 'module', // Allows for the use of imports
    },
    env: {
      es2021: true, // Sets up the environment for modern JavaScript
      node: true,   // Node.js global variables and Node.js scoping
      browser: true, // Browser global variables like window, document
    },
    rules: {
      // Add any custom rules here
    },
  };
  