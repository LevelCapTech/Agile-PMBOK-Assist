import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	buildDirectory: 'dist',
	ssr: false,
	prerender: true,
} satisfies Config;
