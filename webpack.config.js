const path = require("path"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	ImageminPlugin = require('imagemin-webpack-plugin').default,
	cleanWebpackPlugin = require("clean-webpack-plugin"),
	CopyWebpackPlugin = require("copy-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	glob = require("glob");

let pages = glob.sync(__dirname + '/src/pug/*.pug'),
	pluginsOptions = [];

pages.forEach(function (file) {
	let base = path.basename(file, '.pug');
	pluginsOptions.push(
		new HtmlWebpackPlugin({
			filename: './' + base + '.html',
			template: './src/pug/' + base + '.pug',
		})
	)
});

module.exports = {
	entry: {
		common: "./src/ts/common.ts",
		// "main-page": "./src/ts/main-page.ts",
	},
	output: {
		path: path.resolve(__dirname, "./docs/"),
		filename: "js/[name].js"
	},
	devServer: {
		contentBase: "./docs",
		overlay: true
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
                test: /\.woff?2$|\.ttf$|\.eot$/,
                loader : 'file-loader',
                options: {
                    name : 'fonts/[name].[ext]',
                    context: ''
                },
                exclude: /(node_modules)/,
            },
			{
				test: /\.ts$/,
				loader: "ts-loader",
				// exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							minimize: true,
							sourceMap: true
						}
					}
				]
			},
			{
			    test: /\.(png|jpg|gif|ico|svg)$/,
			    use: [
			    	{
			    		loader: 'file-loader',
					    options: {
					        name: '../img/[name].[ext]',
					        context: ''
					    }
			    	}
			    ],
			},
			{
				test: /\.sss$/,
				use: [
					{
						loader: "style-loader",
						options: { sourceMap: true }
					},
					{
			        	loader: MiniCssExtractPlugin.loader
					},
			        {
			          loader: 'css-loader'
			        }, 
			        {
			        	loader: "resolve-url-loader"
			        },
			        {
			          loader: 'postcss-loader',
			          options: { 
			          	sourceMap: true, 
			          	config: { 
			          		path: './postcss.config.js' 
			          	} 
			          }
			        }
			    ]
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: "pug-loader",
						options: {
							doctype: false,
							pretty: true,
						}
					},
				]
            },
            
		]
	},
	resolve: {
		extensions: [
			".ts",
			".tsx",
			".js"
		]
	},
	plugins: [
		new cleanWebpackPlugin({

		}),
		new MiniCssExtractPlugin({
			filename: "./css/main.css",
		}),
		new CopyWebpackPlugin([{
			from: 'src/img/',
			to: path.resolve(__dirname, "docs/img")
		}]),
		new CopyWebpackPlugin([{
			from: 'src/img/src',
			to: path.resolve(__dirname, "docs/img")
		}]),
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			optimizationLevel: 9,
			fileName: '[path][name].[ext]',
			jpegtran: { 
				progressive: true 
			},
			cacheFolder: path.resolve(__dirname, './cache'),

		}),
	].concat(pluginsOptions)
}