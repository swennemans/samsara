define(function (require, exports, module) {
    // Creates background render loop for both running in Node and the browser

    var Engine = require('samsara/core/Engine');

    var loop;
    var cancel = false;
    var running = false;

    if (typeof window === 'object') loop = Engine;
    else {
        loop = {
            start : function () {
                if (running) return;
                running = true;
                process.nextTick(function loop() {
                    if (!cancel) {
                        Engine.step();
                        process.nextTick(loop);
                    }
                    else running = false;
                });
            },
            stop : function () {
                cancel = true;
            }
        };
    }

    module.exports = loop;
});