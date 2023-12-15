/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [ "./src/**/*.{js,ts,jsx,tsx}" ],
	styles: {
		// Add your custom styles here
		// These styles will override the default Tailwind styles
		global: `
			img, video {
				max-width: 100%;
			}
    `,
	},
	theme: {
		extend: {},
	},
	plugins: [],
}
