// 依赖注入

// 公共依赖
const dependence = `
npm i webpack webpack-cli webpack-dev-server webpack-merge less-loader -D
npm i html-webpack-plugin clean-webpack-plugin -D
npm i babel-loader @babel/core @babel/preset-env @babel/preset-react -D
npm i style-loader css-loader less-loader mini-css-extract-plugin -D
npm i html-loader -D
`

/**
 * 依赖注入
 * @param { string } customDependence 自定义依赖命令，非必填
 */
const generateDependence = async (customDependence = '') => {
    return dependence + customDependence;
}

module.exports = {
    dependence,
    generateDependence,
}