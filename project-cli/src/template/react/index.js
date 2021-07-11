const index = `
import React from 'react'
import ReactDOM from 'react-dom'
import Index from './src';

ReactDOM.render(
  React.createElement(Index),
  document.getElementById('root'),
)
`
const config = {
    react: {
        base: {
            resolve: {
                extensions: ['.jsx'],
            },
        }
    }
}

const dependence = `
npm i @babel/preset-react -D
npm i react -S
npm i react-dom -S
`

module.exports ={
    index,
    config,
    dependence,
}