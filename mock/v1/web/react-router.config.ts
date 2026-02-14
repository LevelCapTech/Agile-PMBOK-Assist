import type { Config } from '@react-router/dev/config';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const rawBasePath =
  process.env.VITE_BASE_PATH ??
  (isGitHubActions ? "/agile-pmbok-assist/" : "/");
const basename = rawBasePath === '/' ? '/' : rawBasePath.replace(/\/$/, '');

export default {
	appDirectory: './src/app',
	buildDirectory: 'dist',
	basename,
	// GitHub Pages is static hosting, so disable SSR there to emit index.html.
	ssr: !isGitHubActions,
	// Avoid generating odd wildcard prerender paths on static builds.
	...(isGitHubActions ? {} : { prerender: ['/*?'] }),
} satisfies Config;
