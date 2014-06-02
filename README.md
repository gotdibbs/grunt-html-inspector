# grunt-html-inspector

> Phantomjs-based HTML Inspector implementation in Grunt. Runs [HTML Inspector](https://github.com/philipwalton/html-inspector) by @philipwalton against an HTML page.

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

## Release History

- **v0.1.5** - 06/02/2014 - Updated HTML Inspector to v0.8.1.
- **v0.1.4** - 10/02/2013 - Updated HTML Inspector to v0.5.1.
- **v0.1.3** - 06/24/2013 - Updated HTML Inspector to v0.3.0.
- **v0.1.2** - 06/20/2013 - Updated to remove jQuery dependency.
- **v0.1.1** - 06/17/2013 - Updated to be a true grunt multi-task.
- **v0.1.0** - 06/16/2013 - Initial release.