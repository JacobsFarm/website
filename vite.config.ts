import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
<<<<<<< HEAD
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	]
});
=======
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['localStorage', 'navigator', 'baseLocale']
		})
	]
});
>>>>>>> 2c42776 (Lokale wijzigingen opslaan voor pull)
