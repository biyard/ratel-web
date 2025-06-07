// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import prettierPlugin from 'eslint-plugin-prettier'; // Added import

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base ESLint configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Storybook configuration
  ...storybook.configs['flat/recommended'],

  // ESLint plugin Prettier configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': [
        'error',
        {
          forbid: ['>', '}', '"'],
        },
      ],
    },
  },

  ...compat.extends('prettier'),
];

export default eslintConfig;
