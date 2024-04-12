module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: 'xo',
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},
		},
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'new-cap': 'off',
		'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: true }],
    '@typescript-eslint/no-unsafe-assignment': ['error', { checkProperties: true }],
    '@typescript-eslint/naming-convention': ['error', { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] }],
	},
};
