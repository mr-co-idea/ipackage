const path = require('path');
class Context {
    constructor(ctx) {
        this.__ctx = ctx
    }

    get ctx() {
        return require(this.__ctx);
    }
}

module.exports = dirname => file => new Context(path.join(dirname, file)).ctx;