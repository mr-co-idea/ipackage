module.exports = {
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
        }
    },
    dependencies: {
        "react": "^17.0.2",
        "react-dom": "^17.0.2"
    },
    devDependencies: {
    }
}