const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // импортируем обязательно
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
// const minicss = require('./webpack/minicss'); Этот файл открыл и закрыл... в общем, все в одном sass.js

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([{
        entry: {
            'index': PATHS.source + '/index.js',
            //'blog': PATHS.source + '/pages/blog/blog.js'
        }, //Оставил тебе твой вариант, но нам нужен один вход. Чтобы не ловить траблы с путями - index.js лучше расположить в корне src

        output: {
            path: PATHS.build,
            filename: 'js/[name].js' // тут убрал слэш впереди - он читался как абсолютный адрес
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index'],
                template: PATHS.source + '/index.pug'
            }),
            // new HtmlWebpackPlugin({
            //     filename: 'blog.html',
            //     chunks: ['blog'], //чанки на страницах тож надо будет убрать - у нас один файл стилей. Как для понимания и потренить - норм
            //     template: PATHS.source + '/pages/blog/blog.pug'
            // }),

            // Это важный блок и он тут нужен. Ввверху импорт плагина
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
    },
    pug(),
    sass()
]);


module.exports = function (env) {
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return merge([
            common,
            devserver()
        ]);
    }
};