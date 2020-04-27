const postcss = require('postcss');
const atImport = require('postcss-import');
const customProperties = require('postcss-custom-properties');
const prependImports = require('../');
const rootPath = process.cwd();

// postcss-prepend-imports options:
const OPTIONS = {
    path: '__tests__/fixtures',
    files: ['colors.css']
};

const OPTIONS_TWO = {
    path: '__tests__',
    files: ['colors.css']
};

const OPTIONS_AFTER = {
    path: '__tests__',
    files: ['colors.css'],
    afterAllImports: true
} 

function run(input, output, plugins) {
    return postcss(plugins).process(input)
        .then(result => {
            expect(result.css).toBe(output);
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
        `:root { --background-default: #ccc; }\n.main { background: var(--background-default); }`,
        [ prependImports(OPTIONS), atImport() ]
    );
});

it('Prepends colors.css + @import + afterAllImports: true', () => {
    return run(
        `@import "some.css";\n.main { background: var(--background-default); }`,
        `@import "some.css";\n@import "${rootPath}/__tests__/colors.css";\n.main { background: var(--background-default); }`,
        [ prependImports(OPTIONS_AFTER)]
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
