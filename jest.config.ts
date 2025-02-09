/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {

  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  transform: {
    '\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'jest-css-modules-transform',
      "^@pages": "<rootDir>/src/pages",
      "^@components": "<rootDir>/src/components",
      "^@ui": "<rootDir>/src/components/ui",
      "^@ui-pages": "<rootDir>/src/components/ui/pages",
      "^@utils-types": "<rootDir>/src/utils/types",
      "^@api": "<rootDir>/src/utils/burger-api.ts",
      "^@slices": "<rootDir>/src/services/slices",
      "^@selectors": "<rootDir>/src/services/selectors"
  },
  globals: {
    fetch: global.fetch,
  }

};

export default config;
