// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '', // leave this blank for Vercel (unlike GitHub Pages)
  plugins: [react()],
});