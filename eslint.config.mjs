import react from '@eslint-react/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import { neostandard } from 'neostandard';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/', 'storybook-static/', '**/.*']),
  ...neostandard({ env: ['browser', 'es2021'], noStyle: true, ts: true }),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true },
    },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-exports': [
        'error',
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { '@eslint-react': react },
    rules: {
      '@eslint-react/no-missing-component-display-name': 'error',
      '@eslint-react/no-duplicate-key': 'error',
      '@eslint-react/jsx-no-comment-textnodes': 'error',
      '@eslint-react/jsx-no-children-prop': 'error',
      '@eslint-react/dom-no-dangerously-set-innerhtml-with-children': 'error',
      '@eslint-react/dom-no-find-dom-node': 'error',
      '@eslint-react/dom-no-render-return-value': 'error',
      '@eslint-react/dom-no-unknown-property': 'error',
      '@eslint-react/dom-no-unsafe-target-blank': 'error',
      '@eslint-react/no-direct-mutation-state': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  eslintConfigPrettier,
]);
