var postcss = require('postcss');
var path = require('path');

module.exports = postcss.plugin('postcss-prepend-imports', function (opts) {
    opts = opts || {};
    opts.path = opts.path || '';
    opts.files = opts.files || [];
    opts.afterAllImports = opts.afterAllImports || false;

    return function (root) {
        opts.files.reverse().forEach(file => {
            file = path.resolve(opts.path, file);
            if (opts.afterAllImports) {
                let lastImport = null;
                root.nodes.forEach(node => {
                    if (node.type === 'atrule' && node.name === 'import') {
                        lastImport = node;
                    }
                });
                lastImport.after({ name: 'import', params: '"' + file + '"' });
            } else {
                root.prepend({ name: 'import', params: '"' + file + '"' });
            }
        });
    };
});
