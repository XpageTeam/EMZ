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
			// inject: true
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
		filename: "js/[name].js",
		// publicPath: "/img/"
	},
	devServer: {
		contentBase: "./docs",
		overlay: true,
	    // open: true,
	    // hot: true,
	    // inline: true,
	    // watchContentBase: true,
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
                    // outputPath : 'fonts/',
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
			    	},
			    	// {
			    	// 	loader: 'image-webpack-loader',
        //     			options: {}
			    	// }
			    ],
			},
			{
				test: /\.sss$/,
				use: [
					// {
					// 	loader : 'file-loader',
					// },
					{
						loader: "style-loader",
						options: { sourceMap: true }
					},
					{
			        	loader: MiniCssExtractPlugin.loader
					},
			        {
			          loader: 'css-loader',
			          options: {
			          	sourceMap: true,
			          	url(url, resourcePath){
			          		console.log(url, resourcePath)
			          		return url
			          	}
			          }
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
					// {
			  //       	loader: "file-loader"
			  //       },
					{
						loader: "pug-loader",
						options: {
							doctype: false,
							pretty: true,
						}
					},
				]
            //     test: /\.svg$|\.png$|\.jpe?g$/,
            //     loader : 'url-loader',
            //     options: {
            //         name : '[name].[ext]',
            //         outputPath : 'img/',
            //         limit : 5000,
            //     },
            //     exclude: /(node_modules)/,
            // },
            // {
            //     test: /\.gif$/,
            //     loader : 'url-loader',
            //     options: {
            //         name : '[name].[ext]',
            //         outputPath : 'img/',
            //         emitFile : false,
            //     },
            //     exclude: /(node_modules)/,
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