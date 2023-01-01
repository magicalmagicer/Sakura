# myblog

## 基于 Vue.js+element-ui 实现的个人博客

### 技术栈主要包括`Vue`,`Vuex`,`axios`,`Vue Router`,`Less`。

## 1.网站模块

1.  文章相关功能
2.  留言评论
3.  用户注册登录
4.  网易云音乐在线听

以上只做了这几个模块，没有单独做主页展示，考虑到我的文章数量并不多，所以直接将博文归档放在主页，同时也起到一个重点突出博文的作用。

## 2.技术栈

前端主要使用 vue2 进行编写，后端使用 node，数据库采用 mysql
主要技术有

前端：`Vue-Cli` `Element ui` `VueX` `Vue router` `Less` `axios`

后端：`Nodejs` `Express` `MySQL`

## 3.主要功能

1. 文章浏览
   对于文章的布局和排版，直接使用的是==markdown==语法来编辑文章，再将文本内容保存到数据库中，浏览文章的时候使用==mavon-editor==插件来解析数据库中的文本内容。
2. 文章评论
   因为是个人博客，并没有很大的流量和稳定的用户访问，所以评论功能目前只实现二级评论。
3. 文章点赞
   文章详细页左侧有一个点赞按钮，根据用户登录后存储的==cookie==判断是否可以点赞，点赞成功后刷新仍可继续点赞。
4. 用户个人空间
   用户输入用户名、密码进行登录注册，登录成功后可进入个人空间进行信息修改，点击头像位置可更换头像。
5. 网易云音乐在线听歌
   目前只支持简单听歌功能，用户网易云账号登录尚未实现，同时部分付费歌曲无法播放。后续版本更新考虑完善此功能。

## 4.后台管理

目前是对文章和用户信息进行管理，主要操作包括查看详细内容、修改更新、删除的操作，永远离不开的增删改查。

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
