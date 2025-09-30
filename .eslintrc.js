/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  settings: { react: { version: 'detect' } },
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['import'],
  rules: {
    // ---- Désactivations utiles ----
    'react/react-in-jsx-scope': 'off', // React 17+ n’exige plus l’import
    'react/jsx-uses-react': 'off',

    // ---- Règles transformées en WARNING ----
    indent: ['warn', 2, { SwitchCase: 1, ignoredNodes: ['JSXElement *'] }],
    semi: ['warn', 'never'],
    quotes: ['warn', 'single', { avoidEscape: true }],
    'no-use-before-define': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn', // encourager l’utilisation de const quand une variable n’est pas réaffectée
    'no-lone-blocks': 'off', // pour permettre les blocs dans JSX { condition && <>{...}</> }
    'multiline-ternary': 'warn', // pour permettre les ternaires sur plusieurs lignes
    'react/jsx-pascal-case': 'off', // pour permettre les composants non PascalCase (ex: <HOC>)
    'object-curly-spacing': ['warn', 'always'],
    // 'comma-dangle': ['warn', 'always-multiline'], // forcer une virgule finale dans les objets/arrays multi-lignes (meilleures diff Git). Désactivée car rajoute une virgule dans les composants React
    'no-console': ['warn', { allow: ['warn', 'error'] }], // autoriser console.warn & console.error
    'no-alert': 'warn', // éviter les alert/prompt/confirm
    'react/jsx-boolean-value': ['warn', 'never'], // dans JSX, pas besoin de préciser la valeur true pour les props booléennes
    'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }] // éviter les props en double dans JSX, insensible à la casse
  }
}
