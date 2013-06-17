# grunt-html-inspector

> Phantomjs-based HTML Inspector implementation in Grunt. Runs @philipwalton's [HTML Inspector](https://github.com/philipwalton/html-inspector) against an HTML page.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-inspector --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-inspector');
```

## The "html-inspector" task

### Overview
In your project's Gruntfile, add a section named `html-inspector` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    'html-inspector': {
		options: {
			includeJquery: true, // required by html inspector, useful if you're not using jquery
            parameters: 'noglobals=true'
        },
        all: {
			src: [path.join('example', 'example.html')]
        }
    },
})
```

### Options

#### src
Type: `Array [string]`
Default value: `null`

An array that represents the locations of the pages to be inspected.

#### options.includeJquery
Type: `Boolean`
Default value: `false`

A boolean value indicating whether or not to inject jquery on to the page to be inspected. **Note:**  it is required by HTML Inspector so either you have to include JQuery on your page, or set this option to true.

### options.bridge
Type: `String`
Default value: `null`

A string value that represents a path to an override bridge for HTML Inspector and this task. Override the bridge to add/configure rules and change the way HTMLInspector is configured. (Goal is to pull as much of the config as possible into the Grunt config eventually.)

#### options.parameters
Type: `String`
Default value: `null`

A string value that represents the query string parameters to be passed to the page.

#### options.phantomOptions
Type: `Object`
Default value: `{ }`

An object representing options to be passed to `grunt-lib-phantomjs` and thus subsequently to `phantomjs`. This can include things like `--web-security` and `timeout`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using `grunt` before submitting a pull request.

## License
This library is licensed under the MIT License. Portions of this code were taken and/or inspired by the [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit) and the [grunt-qunit-serverless](https://github.com/jgable/grunt-qunit-serverless) tasks.
