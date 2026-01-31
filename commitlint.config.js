/**
 * Commitlint Configuration
 *
 * Enforces conventional commit format:
 * type(scope): description
 *
 * Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, sec
 *
 * Examples:
 * - feat(auth): add Google OAuth login button
 * - fix(api): handle 429 rate limit responses
 * - sec(auth): fix user enumeration vulnerability
 * - docs(readme): update deployment instructions
 */
export default {
	extends: ['@commitlint/config-conventional'],
	rules: {
		// Allow 'sec' type for security-related commits
		'type-enum': [
			2,
			'always',
			[
				'feat', // New feature
				'fix', // Bug fix
				'docs', // Documentation
				'style', // Formatting, missing semicolons, etc.
				'refactor', // Code restructuring without behavior change
				'perf', // Performance improvement
				'test', // Adding/updating tests
				'build', // Build system or dependencies
				'ci', // CI configuration
				'chore', // Maintenance tasks
				'revert', // Revert previous commit
				'sec', // Security fixes
			],
		],
		// Scope is optional but encouraged
		'scope-case': [2, 'always', 'kebab-case'],
		// Subject should be lowercase
		'subject-case': [2, 'always', 'lower-case'],
		// Max 100 chars for header
		'header-max-length': [2, 'always', 100],
	},
};
