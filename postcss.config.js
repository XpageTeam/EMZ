module.exports = ({ file, options, env }) => {
	// console.log( file, options, env )
	return {
		parser: file.extname === '.sss' ? 'sugarss' : false,
		plugins: [
			require("postcss-import"),
			require('postcss-functions')({
				functions: require("./config/functions.js")
			}),
			require("postcss-short"),
			require("postcss-preset-env"),
			// require("postcss-font-magician")(require("./config/fonts.js")),
			// require("postcss-assets"),
			require("postcss-flexbugs-fixes"),
			require("postcss-nesting"),
			require("postcss-nested"),
			require('css-mqpacker'),
			require("autoprefixer"),
			// require('cssnano')({
			// 	preset: [
			// 		'default', {
			// 			discardComments: {
			// 				removeAll: true,
			// 			}
			// 		}
			// 	]
			// })
		]
	}
}