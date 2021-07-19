class Text{
    constructor(){
        console.info('创建');
        return {test : 'TEXT'}
    }
}

module.exports = {
    module: {
        rules: [
            {
                test: 'jsx',
                options: [
                    'm1',
                ],
                [Symbol.for('key')]: 'jsx'
            }
        ]
    },
    plugins:[
        new Text()
    ]
}