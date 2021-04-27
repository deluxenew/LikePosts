const path = require('path');


module.exports = {
    devServer: {
        port: 3000,
    },
    chainWebpack: (config) => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach((type) => addStyleResource(config.module.rule('sass')
            .oneOf(type)));
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'))
    },
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/scss/styles.scss'),
            ],
        });
}
