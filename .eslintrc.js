module.exports = { // Use Babel's parser to support modern JavaScript and JSX
  parserOptions: {
    ecmaVersion: 2021, // ECMAScript version
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Enable parsing of JSX
    },
  },
  env: {
    es2021: true, // Sets up the environment for modern JavaScript
    node: true,   // Node.js global variables and Node.js scoping
    browser: true, // Browser global variables like window, document
  },
  plugins: [
    'react', // Enables React-specific linting rules
  ],
  extends: [
    'eslint:recommended', // Use recommended rules
    'plugin:react/recommended', // Use recommended React rules
  ],
  rules: {
    // Add any custom rules here, for example:
    'react/prop-types': 'off', // Example rule: turn off prop-types rule
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
