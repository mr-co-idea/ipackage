const { deepMerge } = require('@ipackage/merge');
const path = require('path');
const fs = require('fs');
const merge = deepMerge(Symbol.for('key'));
const project = {
    index: `
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Index from './src';
    
    ReactDOM.render(
      React.createElement(Index),
      document.getElementById('root'),
    )
    `,
    config: {
        base: {
            resolve: {
                extensions: ['.jsx'],
            },
        },
        loader: {
            module: {
                rules: [
                    {
                        options: {
                            presets: [
                                '@babel/preset-react',
                            ],
                        },
                        [Symbol.for('key')]: '.jsx'
                    },
                ]
            }
        }
    },
    dependencies: {
        "react": "^17.0.2",
        "react-dom": "^17.0.2"
    },
}

const $temp = process.env.TEMPLATE.replace(/^.+_/, '');

switch ($temp) {
    case 'custom':
        break;
    case 'all':
        module.exports = merge(project, ...readSources());
        break;
    default:
        module.exports = merge(project, require(path.join(__dirname, `./source/${$temp}`)));
        break;
}

function readSources() {
    return fs.readdirSync(path.join(__dirname, './source')).map(item => require(path.join(__dirname, `./source/${item}`)));
}