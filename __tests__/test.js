var postcss = require('postcss');
var plugin = require('../');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('Prepends colors.css', () => {
    return run(
    	'.main { background: var(--background-default); }',
    	'@import "./fixtures/colors.css";\n.main { background: var(--background-default); }',
    	['./fixtures/colors.css']
    );
});

