# 阿里云控制台脚手架工具

### 安装

> node版本必须4.x.x版本

您可以使用如下的方式安装

* npm
```
npm install -g console-cli
```

### 使用
```
# 在当前目录生成脚手架
console init .
```

```
# 在指定的目录（比如：my-project）生成脚手架
console init my-project
```

脚手架生成成功以后，请在**脚手架目录**下执行如下命令，安装项目依赖

```
# 使用yarn包工具（需提前[安装](https://yarnpkg.com/)），推荐
yarn

# 使用npm
npm install
```

### 启用项目
```
# 开发模式
npm run dev

# 生产模式
npm run build
```

### enjoy!!!
