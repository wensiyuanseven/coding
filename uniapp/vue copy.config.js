const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages()
const FileManagerPlugin = require('filemanager-webpack-plugin');
const {
	CleanWebpackPlugin
} = require("clean-webpack-plugin");
// 读取 manifest.json ，修改后重新写入
const fs = require('fs')
const path = require('path')
const dist = path.join(__dirname, 'dist')
const manifestPath = path.join(__dirname, 'manifest.json')
const deploy = require('./deploy/common')
const gitHEAD = fs.readFileSync(path.join(__dirname, '.git/HEAD'), 'utf-8').trim()
const gitBranch = gitHEAD.split("refs/heads/")[1] //获取git版本
const timestamp = new Date().getTime()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// webpack.config.js
const HelloWorldPlugin = require('./webpack-plugin.js');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const manifest = fs.readFileSync(manifestPath, {
	encoding: 'utf-8'
})
const resolve = dir => path.resolve(__dirname, '../', dir)
const plugins = [
	new webpack.DefinePlugin({
		ROUTES: webpack.DefinePlugin.runtimeValue(() => {
			const tfPages = new TransformPages({
				includes: ['path', 'name', 'meta', 'aliasPath']
			});
			return JSON.stringify(tfPages.routes)
		}, true)
	})
]

if (process.env.NODE_ENV === 'production') {
	// process.env.VUE_APP_INDEX_CSS_HASH = 1111111
	setPlugin()
	// const getManifestFile = replaceManifest(manifest, 'h5.publicPath', JSON.stringify(deploy.BASE_URL))
	// 重新写入
	// fs.writeFileSync(manifestPath, getManifestFile, {
	// 	"flag": "w"
	// }) //flag传值，r代表读取文件，w代表写文件，a代表追加
}

function setPlugin() {
	plugins.push(
		new HelloWorldPlugin({
			options: true
		}),
		// new MiniCssExtractPlugin({
		// 	// 修改打包后css文件名
		// 	filename: `css/abc.css`,
		// 	chunkFilename: `css/[name].abccc.css`
		// }),
		// new HtmlWebpackPlugin(),
		// 清除外部dist目录
		new CleanWebpackPlugin({
			verbose: true,
			dry: false,
			dangerouslyAllowCleanPatternsOutsideProject: true,
			cleanOnceBeforeBuildPatterns: ["./../../../../dist"]
		}),
		new FileManagerPlugin({
			events: {
				onEnd: {
					copy: [{
						source: path.join(__dirname, 'unpackage/dist/build/h5'),
						destination: dist
					}]
				},
			},
		}))
}

function replaceManifest(manifest, path, value) {
	const arr = path.split('.')
	const len = arr.length
	const lastItem = arr[len - 1]
	let i = 0
	let manifestArr = manifest.split(/\n/)
	for (let index = 0; index < manifestArr.length; index++) {
		const item = manifestArr[index]
		if (new RegExp(`"${arr[i]}"`).test(item)) ++i;
		if (i === len) {
			const hasComma = /,/.test(item)
			manifestArr[index] = item.replace(new RegExp(`"${lastItem}"[\\s\\S]*:[\\s\\S]*`),
				`"${lastItem}": ${value}${hasComma ? ',' : ''}`)
			break;
		}
	}
	return manifestArr.join('\n')
}

// 编译环境判断，可以根据不同环境来做相应的配置
// if (process.env.UNI_PLATFORM === 'h5') {
// 	filePath = 'static/js/'
// 	timestamp = '.' + new Date().getTime();
// }

module.exports = {
	// 重置文件名
	// chainWebpack: config => {
	// 	config.plugin('mini-css-extract-plugin')
	// 		.use(require('mini-css-extract-plugin'), []).end()
	// },
	configureWebpack: {
		output: { // 输出重构
			filename: `static/${gitBranch}/[name].js?v=${timestamp}`,
			chunkFilename: `static/${gitBranch}/[name].js?v=${timestamp}`
		},
		plugins: plugins
	}
}
