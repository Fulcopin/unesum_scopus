// eslint.config.js
export default [
    {
      files: ["src/**/*.js", "src/**/*.jsx"],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        globals: {
          // Definir variables globales específicas del navegador
          window: "readonly",
          document: "readonly",
          navigator: "readonly"
        }
      },
      rules: {
        "no-console": "warn",
        "semi": ["error", "always"]
      }
    }
  ];
  