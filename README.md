# PostCSS Prepend Imports [![Build Status][ci-img]][ci]

[PostCSS] plugin to automatically import global dependencies.

That's quite useful when you need to preload variables in all css files.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ramonvictor/postcss-prepend-imports.svg
[ci]:      https://travis-ci.org/ramonvictor/postcss-prepend-imports

**Example using Gulp**
```js
gulp.task('css', function() {
    return gulp.src('./src/*.css')
        .pipe(postcss([
            require('postcss-prepend-imports')(['partials/color.css']),
            require('postcss-import')(),
            require('postcss-custom-properties')()
        ]))
        .pipe(gulp.dest('./build'));
});

```

**Variables file example**
```css
/* ./src/partials/color.css */
:root {
    --background-default: #ccc;
}
```

**Input**
```css
/* ./src/main.css */
.main {
    background: var(--background-default);
}
```

**Output**
```css
/* ./build/main.css */
.main {
    background: #ccc;
}
```

## Usage

```js
postcss([ require('postcss-prepend-imports') ])
```

See [PostCSS] docs for examples for your environment.
