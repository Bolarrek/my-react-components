// apiConfig.jsx
export const APP_TITLE = 'Vite React Template';
export const MODE = import.meta.env.MODE || __DEV__;
export const IS_DEV = MODE === __DEV__;
export const VITE_BACKEND = import.meta.env.VITE_GLOBAL_BACKEND_HOST + '/node/back_ends/api/clausulas_suelo';
export const VITE_ENABLE_SIMULATOR = import.meta.env.VITE_ENABLE_SIMULATOR;
export const VITE_USER_SIMULATOR = import.meta.env.VITE_USER_SIMULATOR;

console.log('Project:', __PROJECT_NAME__, 'MODE:', MODE);
