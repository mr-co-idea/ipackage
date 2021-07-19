const { runShell } = require('./shell'),
    { compile, initialCompile } = require('./compile'),
    { copy } = require('./copy'),
    { getParams } = require('./inline'),
    { clear } = require('./clear');

module.exports = {
    runShell,
    compile,
    initialCompile,
    copy,
    getParams,
    clear,
}