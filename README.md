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
具体使用说明请查看插件文档 [传送门](https://www.npmjs.com/package/egg-swagger-doc)

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

### 初始化数据库

- 设置账号密码：

  - 默认账号密码

    1. username: "root"
    2. password: "123456"

  - 修改的 config

    1. config/config.default.ts 下的 sequelize 对象
    2. database/config/config.json
     > 如果有定制化需求的话后续在处理

- 基于 database/config/config.json 内的配置创建 3 个数据库

  1. video_platform_development 对应开发坏境
  2. video_platform_production 对应生产坏境
  3. video_platform_test 对应测试坏境

- 执行 npm run db:migrate 创建表

### HTTP status

#### 200
这个最容易理解，就是正确的请求返回正确的结果，如果不想细分正确的请求结果都可以直接返回200。

#### 400
请求出现错误，比如请求头不对等，所有不想明确区分的客户端请求出错都可以返回 400。

#### 401
没有提供认证信息。比如说，请求的时候没有带上 Token 等。

#### 403
请求的资源不允许访问。比如说，你使用普通用户的 Token 去请求管理员才能访问的资源。

#### 404
请求的内容不存在。

#### 500
服务器错误。没法明确定义的服务器错误都可以返回这个。

