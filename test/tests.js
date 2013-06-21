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
            calledUrls: [],
            calledOptions: null,
            spawn: function spawn(url, options, onComplete) {
                this.calledUrls.push(url);
                this.calledOptions = options;
                if (options && options.done) {
                    options.done();
                }
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
        test.ok(!task.filesSrc, 'Src should be false-ish.');
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
        test.strictEqual(mockPhantom.handlers.length, 3, 'Three handlers should be registered.');
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
        test.strictEqual(mockPhantom.calledUrls[0], 'test/test.html', 'Called URL should match what was passed in.');
        test.ok(mockPhantom.calledOptions, 'Called options should be defined.');
        test.ok(mockPhantom.calledOptions.options.inject.length, 2, 'Inject should be defaulted to two scripts (html inspector and default bridge).');
        test.done();
    }

    function runsMultipleFiles(test) {
        var task,
            mockPhantom = _getMockPhantom()

        task = new HtmlInspector(
            _getMockTask(['test/test.html', 'test/test2.html'], { }),
            mockPhantom);

        test.expect(3);
        task.run();
        test.strictEqual(mockPhantom.calledUrls.length, 2, 'Exactly two files should be processed.');
        test.strictEqual(mockPhantom.calledUrls[0], 'test/test.html', 'Called URL #1 should be test.html.');
        test.strictEqual(mockPhantom.calledUrls[1], 'test/test2.html', 'Called URL #2 should be test2.html.');
        test.done();
    }
    
    return {
        exists: exists,
        setsDefaults: setsDefaults,
        registersSelfWithGrunt: registersSelfWithGrunt,
        runRegistersPhantomHandlers: runRegistersPhantomHandlers,
        runSetsDefaults: runSetsDefaults,
        runsMultipleFiles: runsMultipleFiles
    };
}());