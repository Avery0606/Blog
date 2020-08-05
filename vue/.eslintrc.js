module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',//禁止console报错检查
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-irregular-whitespace':'off',//禁止空格缩进检查
    'no-unused-vars':'off',//禁用声明但未使用报错检查
    'no-mixed-spaces-and-tabs':'off',
  }
}
