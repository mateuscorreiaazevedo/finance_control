module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'wip', 'chore', 'refactor', 'docs']],
  },
}
