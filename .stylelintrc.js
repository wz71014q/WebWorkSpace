module.exports = {
  processors: [],
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-scss',
  rules: {
    'at-rule-no-unknown': [true,
      {
        ignoreAtRules: ['include', 'mixin', 'extend']
      }],
    'media-feature-name-no-unknown': null,
    'rule-empty-line-before': 'never-multi-line',
    'at-rule-empty-line-before': 'never',
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'order/properties-order': [],
    'color-function-notation': 'legacy',
    'string-quotes': 'single',
    'alpha-value-notation': 'number',
    'selector-class-pattern': '.*',
    'keyframes-name-pattern': '.*',
    'selector-id-pattern': '.*'
  }
}
