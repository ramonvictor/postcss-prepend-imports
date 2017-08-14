var postcss = require('postcss');

module.exports = postcss.plugin('postcss-prepend-imports', function (opts) {
    opts = Array.isArray(opts) ? opts : [];

    return function (root) {
        opts.reverse().forEach((path) => {
            root.prepend({ name: 'import', params: '"' + path + '"' });
        });
    };
});
