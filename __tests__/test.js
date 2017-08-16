var postcss = require('postcss');
var atImport = require('postcss-import');
var customProperties = require('postcss-custom-properties');
var prependImports = require('../');
var rootPath = process.cwd();

// postcss-prepend-imports options:
var OPTIONS = {
    path: '__tests__/fixtures',
    files: ['colors.css']
};

var OPTIONS_TWO = {
    path: '__tests__',
    files: ['colors.css']
};

function run(input, output, plugins) {
    return postcss(plugins).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('Prepends colors.css - without @import', () => {
    return run(
    	'.main { background: var(--background-default); }',
    	`@import "${rootPath}/__tests__/fixtures/colors.css";\n.main { background: var(--background-default); }`,
        [ prependImports(OPTIONS) ]
    );
});

it('Prepends colors.css + @import', () => {
    return run(
        '.main { background: var(--background-default); }',
        `:root {\n    --background-default: #ccc;\n}\n.main { background: var(--background-default); }`,
        [ prependImports(OPTIONS), atImport() ]
    );
});

it('Prepends colors.css + @import + parse variables', () => {
    return run(
        '.main { background: var(--background-default); }',
        `.main { background: #ccc; }`,
        [ prependImports(OPTIONS), atImport(), customProperties() ]
    );
});

it('Prepends colors.css + @import + parse variables + new path', () => {
    return run(
        '.main { background: var(--background-default); }',
        `.main { background: #000; }`,
        [ prependImports(OPTIONS_TWO), atImport(), customProperties() ]
    );
});
