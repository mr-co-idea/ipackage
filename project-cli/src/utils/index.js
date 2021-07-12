const { runShell } = require('./shell'),
    { compile, initialCompile } = require('./compile'),
    { copy } = require('./copy');

module.exports = {
    runShell,
    compile,
    initialCompile,
    copy,
}