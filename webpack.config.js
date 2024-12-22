const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	...defaultConfig,
	entry: {
		dashboard: [ path.resolve( __dirname, 'src', '', 'index.js' ) ],
		widget: [ path.resolve( __dirname, 'src', 'widget', 'index.js' ) ],
		table: [ path.resolve( __dirname, 'src', 'table', 'index.js' ) ],
	},
	output: {
		filename: '[name]/index.js',
		path: path.resolve( process.cwd(), 'build' ),
		clean: true,
	},
	plugins: [
		new DependencyExtractionWebpackPlugin(),
		new MiniCssExtractPlugin(),
	],
};
