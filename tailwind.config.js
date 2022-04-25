module.exports = {
  content: [
    'html/**/*.{html,js}',
  ],
  theme: {
    extend: {
    	colors: {
    		"primary": "#dc2626",
    		"primary-dark": "#7f1d1d",
    		"secondary": "#2563eb",
    		"secondary-dark": "#182C4F",
    	}
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Poppins', 'serif'],
      poppins: ['Poppins', 'serif'],
    },
    container: {
    	center: true,
    	padding: "1.5rem",
    	screens: {
    		lg: "1324px",
    		xl: "1324px",
    		"2xl": "1324px",
    	}
    }
  },
  plugins: [],
}
