import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        socialMediaDark: {
          "primary": "#1DA1F2",   // Twitter Blue for main actions
          "secondary": "#F44336", // Red for alerts or notifications
          "accent": "#FFC107",    // Yellow for highlights
          "neutral": "#222222",   // Dark Gray for secondary background
          "base-100": "#000000",  // Pure Black for main background
          "info": "#3B82F6",      // Info messages in blue
          "success": "#10B981",   // Green for success actions
          "warning": "#F59E0B",   // Orange for warnings
          "error": "#EF4444",     // Red for errors
        },
      },
    ],
  },
}

