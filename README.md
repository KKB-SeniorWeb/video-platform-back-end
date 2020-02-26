# video-platform-back-end
开课吧视频平台后端

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+


### swagger 
使用 egg-swagger-doc 来生成对应的 api 文档
具体使用说明请查看插件文档  [传送门](https://www.npmjs.com/package/egg-swagger-doc)


### 配置 eslint
设置 .settings.json 文件，用以支持自动格式化代码
```

    "eslint.options": {
        "extensions": [
            ".js",
            ".vue",
            ".ts",
            ".tsx"
        ]
    },
    "eslint.validate": [
        {
            "language": "html",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        }
    ],
    "eslint.enable": true,
    "eslint.autoFixOnSave": true,
```
