const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.s*css$/, //иногда импортируем чистый css - лучше сразу включить его в работу
                    // include: paths, Если знаешь зачем - то реализуй, но при вызове из конфига ты не передавал параметры
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        }
    }
}
