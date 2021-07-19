template=$1;

npm i webpack webpack-cli webpack-dev-server less-loader -D
npm i html-webpack-plugin clean-webpack-plugin -D
npm i babel-loader @babel/core @babel/preset-env @babel/preset-react -D
npm i style-loader css-loader less-loader mini-css-extract-plugin -D
npm i html-loader -D
npm i @ipackage/merge -D

if [[$template == 'react']]; then
npm i @babel/preset-react -D
npm i react -S
npm i react-dom -S
fi