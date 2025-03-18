## 简介

hmd 是一个简单的 markdown 解析器。

## 安装

```bash
npm install hmd
```

## 使用

### 编译

```js
import Hmd from "hmd";
const html = hmd().complie("**Hello World**");
```

### 插件

```js
import Hmd, { htmlEscape } from "hmd";
const hmd = new Hmd();
hmd.use(htmlEscape);
const html = hmd.complie("<script>xss</script>");
```
---

(GitHub)[https://github.com/AechWhyL/hmd]