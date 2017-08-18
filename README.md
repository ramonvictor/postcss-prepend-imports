# PostCSS Prepend Imports [![Build Status][ci-img]][ci]

[PostCSS] plugin to automatically import global dependencies.

That's quite useful when you need to preload variables in all css files.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ramonvictor/postcss-prepend-imports.svg
[ci]:      https://travis-ci.org/ramonvictor/postcss-prepend-imports

**Disclaimer**

It's advised to use this plugin in combination with both [postcss-import](https://github.com/postcss/postcss-import) and [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties).

**Example using Gulp**

```js
gulp.task('css', function() {
    return gulp.src('./src/*.css')
        .pipe(postcss([
            require('postcss-prepend-imports')({
                path: 'shared',
                files: ['color.css']
            }),
            require('postcss-import')(),
            require('postcss-custom-properties')()
        ]))
        .pipe(gulp.dest('./build'));
});

```

**Variables file example**

```css
/* ./shared/color.css */
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
> Above snippet is the output when we use **postcss-prepend-imports** together with **postcss-import** and **postcss-custom-properties**.

## Installation

```
npm install postcss-prepend-imports --save-dev
```

## Usage

```js
var options = {
    path: '__tests__/fixtures',
    files: ['colors.css']
};

postcss([ require('postcss-prepend-imports')(options) ])
```

## Options

#### path

Type: `string` (default: `''`)

Set the root folder where `postcss-prepend-imports` plugin should find files to prepend.

#### files

Type: `array` (default: `[]`)

List of file names to prepend in all css files using `@import`.

------------------------------------
See [PostCSS] docs for examples for your environment.
