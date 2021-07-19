# 数据合并

## 合并对象
* `merge(target, ...[sources])`
## 合并数组下的对象
* `deepMerge(Symbol.for(x))(target, ...[sources])` 默认为Symbol.for('key')
* 待合并对象增加属性`[Symbol.for(x)]: val`