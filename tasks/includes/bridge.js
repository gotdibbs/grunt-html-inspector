/*global QUnit:true, alert:true, HTMLInspector:true*/

// Send messages to the parent PhantomJS process via alert
function _parseErrors(errors) {
    var results = [],
        i = 0,
        len;

    for (len = errors.length; i < len; i++) {
        results[i] = {
            rule: errors[i].rule,
            message: errors[i].message
        };
    }

    return results;
}

function sendMessage() {
    var args = [].slice.call(arguments),
        msg = args[0];

    if (msg === 'htmlinspector.done') {
        args[1] = _parseErrors(args[1]);
    }
    alert(JSON.stringify(args));
}

HTMLInspector.inspect({
    onComplete: function onComplete(errors) {
        sendMessage('htmlinspector.done', errors);
    }
});