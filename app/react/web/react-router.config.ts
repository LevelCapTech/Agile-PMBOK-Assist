import type { Config } from '@react-router/dev/config';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default {
	appDirectory: './src/app',
	buildDirectory: 'dist',
	// GitHub Pages is static hosting, so disable SSR there to emit index.html.
	ssr: !isGitHubActions,
	// Avoid generating odd wildcard prerender paths on static builds.
	...(isGitHubActions ? {} : { prerender: ['/*?'] }),
} satisfies Config;
