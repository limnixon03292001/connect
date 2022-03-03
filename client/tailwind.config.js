module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		backgroundColor: theme => ({
			...theme('colors'),
			'primary': '#3E2C41',
			'secondary': '#261C2C',
			'modal': '#5C527F',
			'button1': '#CF6AE8',
			'button2': '#E12BFF',
			'overlay': 'linear-gradient(180deg,rgb(6 90 96 / 0%),rgb(6,90,96))',
		   }),
		   borderColor: theme => ({
			...theme('colors'),
			 DEFAULT: theme('colors.gray.300', 'currentColor'),
			'borderColor': '#4E3752',
			'borderProfile': '#3E2C41',
			'button2': '#E12BFF',
			
		   }),
		minWidth: {
			'0': '0',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			'full': '100%',
		   },
		extend: {
			fontFamily: {
				hammerSmith:['Hammersmith One'],
				paytoneOne:['Paytone One'],
			  },
		}
	},
	variants: {
		extend: {
			backgroundColor: ['active'],
			backgroundOpacity: ['active'],
		},
	},
	plugins: []
};
