module.exports = {
  overrides: [
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss', 'stylelint-config-idiomatic-order'],
      plugins: 'stylelint-order',
      rules: { 'declaration-empty-line-before': null, 'no-missing-end-of-source-newline': null, 'no-empty-source': null },
    },
  ],
};
