/**
 * @type {import("prettier").Config}
 * Need to restart IDE when changing configuration
 * Open the command palette (Ctrl + Shift + P) and execute the command > Reload Window.
 */
const config = {
  semi: true,
  tabWidth: 2,
  endOfLine: 'lf',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
