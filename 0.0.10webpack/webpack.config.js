/*
webpack配置中最重要的也是必选的两项就是入口和出口
入口(entry)告诉webpack从哪里开始寻找依赖，并且编译
出口(output)则用来配置编译后的文件存储位置和文件名
 */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
    entry: {
        main: './main'// 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打
    },
    output: {
        path: path.join(__dirname, './dist'),// 项目的打包文件路径
        publicPath: '/dist/',// 通过devServer访问路径
        filename: 'main.js'
    },
    module: {
        //当webpack编译过程中遇到require()或import语句导入一个后缀为.css的文件，先将其
        //通过css-loader转换，在通过style-loader转换，然后继续打包
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                // use: [ // 顺序执行，style必须放在css前面
                //     'style-loader',
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        // 重命名提取后的css文件
        new ExtractTextPlugin('main.css'),
        new VueLoaderPlugin()
    ]
};

//这里不能直接使用 export default config
// export 需要安装es6 的编译插件
module.exports = config;
