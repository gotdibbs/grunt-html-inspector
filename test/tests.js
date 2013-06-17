exports.nodeunit = (function (){
    'use strict';
    
    var grunt = require('grunt'),
        _ = grunt.util._,
        HtmlInspector = require('../tasks/lib/HtmlInspector');

    function _getMockTask(filesSrc, opts) {
        if (!opts) { 
            opts = {}; 
        }
    
        return {
            filesSrc: filesSrc,
            options: function options(config){ 
                return _.defaults(opts, config);
            },
            async: function noop() { }
        };
    }

    function _getMockGrunt() {
        return {
            calledName: null,
            calledFunc: null,
            registerMultiTask: function registerMultiTask(name, description, func) {
                this.calledName = name,
                this.calledFunc = func
            }
        };
    }

    function _getMockPhantom() {
        return {
            handlers: [],
            calledUrl: null,
            calledOptions: null,
            spawn: function spawn(url, options) {
                this.calledUrl = url;
                this.calledOptions = options;
            },
            on: function on(handler) { 
                this.handlers.push(handler)
            }
        };
    }
    
    function exists(test) {
        test.expect(1);
        test.ok(HtmlInspector, 'Should exist.');
        test.done();
    }
    
    function setsDefaults(test) {
        var task = new HtmlInspector(_getMockTask());
        
        test.expect(5);
        test.ok(task, 'Task should exist.');
        test.ok(task.options, 'Options should exist.');
        test.strictEqual(task.src, null, 'Src should be null.');
        test.ok(task.options.phantomOptions, 'Phantom options should exist.');
        test.strictEqual(task.options.parameters, null, 'Page parameters should be null.');
        test.done();
    }
    
    function registersSelfWithGrunt(test) {
        var mockGrunt = _getMockGrunt();
    
        test.expect(3);
        test.ok(HtmlInspector.registerWithGrunt, 'Registration function should exist.');
        HtmlInspector.registerWithGrunt(mockGrunt);
        test.strictEqual(mockGrunt.calledName, 'html-inspector', 'Registers with the correct name.');
        test.ok(mockGrunt.calledFunc, 'Should be passed a valid function.');
        test.done();
    }

    function runRegistersPhantomHandlers(test) {
        var task,
            mockPhantom = _getMockPhantom();

        task = new HtmlInspector(
            _getMockTask(['test/test.html'], { }), 
            mockPhantom);

        test.expect(2);
        task.run();
        test.strictEqual(mockPhantom.handlers.length, 1, 'One handler should be registered.');
        test.notEqual(mockPhantom.handlers.indexOf('htmlinspector.done'), -1, 'qunit.done should be registered.');
        test.done();
    }

    function runSetsDefaults(test) {
        var task,
            mockPhantom = _getMockPhantom()

        task = new HtmlInspector(
            _getMockTask(['test/test.html'], { }),
            mockPhantom);

        test.expect(3);
        task.run();
        test.strictEqual(mockPhantom.calledUrl, 'test/test.html', 'Called URL should match what was passed in.');
        test.ok(mockPhantom.calledOptions, 'Called options should be defined.');
        test.ok(mockPhantom.calledOptions.options.inject.length, 2, 'Inject should be defaulted to two scripts (html inspector and default bridge).');
        test.done();
    }
    
    return {
        exists: exists,
        setsDefaults: setsDefaults,
        registersSelfWithGrunt: registersSelfWithGrunt,
        runRegistersPhantomHandlers: runRegistersPhantomHandlers,
        runSetsDefaults: runSetsDefaults
    };
}());