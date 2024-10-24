export default {
  extends: [
    'stylelint-config-standard-scss'
  ],
  ignoreFiles: [
    'node_modules/*'
  ],
  rules: {
    'color-hex-length': null,
    'color-function-notation': null,
    'alpha-value-notation': 'number',
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'block-no-empty': null,
    'no-duplicate-selectors': null,
    'font-family-no-duplicate-names': null,
    'shorthand-property-no-redundant-values': null,
    'custom-property-empty-line-before': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'scss/at-mixin-argumentless-call-parentheses': null,
    'selector-class-pattern': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [
          '/^ion-/'
        ]
      }
    ],
    'declaration-empty-line-before': [
      'always',
      {
        ignore: [
          'after-comment',
          'after-declaration',
          'first-nested',
          'inside-single-line-block'
        ]
      }
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: [
          '/flex/'
        ]
      }
    ],
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: [
          '/font/'
        ],
        camelCaseSvgKeywords: true
      }
    ],

    // Tailwind CSS
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen'
        ]
      }
    ]
  }
}
