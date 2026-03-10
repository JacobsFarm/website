import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: { 
        adapter: adapter({
            // fallback: '404.html' zorgt dat routes ook werken na een refresh op GitHub Pages
            fallback: '404.html' 
        }),
        paths: {
            // Omdat je repo 'website' heet, gebruik je '/website'
            base: process.env.NODE_ENV === 'production' ? '/website' : '',
        }
    },
    preprocess: [mdsvex()],
    extensions: ['.svelte', '.svx']
};

export default config;
