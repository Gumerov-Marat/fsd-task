module.exports = function () {
    return {
        devServer: {
            stats: 'errors-only',
            open: true,
            overlay: true,
            port: 9000
        },
    }
};