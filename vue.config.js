const path = require('path');


module.exports = {
    devServer: {
        port: 3000,
    },
    chainWebpack: (config) => {
       const svgRule = config.module.rule('svg');
       const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
       types.forEach((type) => addStyleResource(config.module.rule('scss')
          .oneOf(type)));
       svgRule.uses.clear();
       svgRule
          .use('babel-loader')
          .loader('babel-loader')
          .end()
    },
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/assets/scss/common/*.scss'),
            ],
        });
}
