// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'MyReactComponents',
			fileName: format => `my-react-components.${format}.js`,
		},
		rollupOptions: {
			// Usamos RegEx para cubrir todos los paquetes de MUI y Emotion de golpe
			external: [
				'react',
				'react-dom',
				'prop-types',
				/^@mui\/.*/, // Cubre @mui/material, @mui/icons-material y sus sub-rutas
				/^@emotion\/.*/, // Cubre @emotion/react y @emotion/styled
			],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'prop-types': 'PropTypes',
					'@mui/material': 'MaterialUI',
					'@mui/icons-material': 'MaterialUIIcons',
				},
			},
		},
	},
});
