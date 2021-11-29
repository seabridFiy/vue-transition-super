# `VueTransitionSuper`

`VueTransitionSuper`组件是基于`transiton`内置组件的封装的一个自动监听页面的前进与后退操作并执行相应的切场过渡动画的组件，其中后退动作的监听是通过调用`router.go(n)`或`router.back`触发，如果需要手动触发后退操作可以通过给组件绑定一个ref的方式通过调用`this.$refs.refName.changeRoute()`可告知组件当前切换动作属于后退操作执行响应的动画。

## 特性

* 动画基于`animate.css`切换顺滑。
* 使用简单直接包裹在`router-view`组件外层即可，无需再像使用`<transition>`一般监听动作修改动画名称等冗余且麻烦的操作。
* 体积小，组件本身大小仅为`3kb`。

## 用法

一个用于`vue`单页应用切换页面过渡动画的插件，使用方法如下：

```js
// main.js
import Vue from 'vue'
import VueTransitionSuper from 'vue-transition-super'
Vue.use(VueTransitionSuper)
// or 
Vue.use(VueTransitionSuper, option) // option为配置对象，详情见下文
```

```vue
// app.vue
<vue-transition-super ref="transitionSuper">
  <keep-alive>
    <router-view />
   </keep-alive>
</vue-transition-super>
```

`VueTransitionSuper`组件的进场动画及离场动画可以自定义进行配置，可以通过对象的`props`项绑定`animate.css`的`class`名称来配置切页进场离场过渡动画，除此之外你也可以按照自己的需求自定义切场动画并将相应的`class`名称作为`props`绑定到组件或是在注册组件时以`option`的形式传入，如果不想使用`animate.css`还可以通过绑定`notUseAnimate`为`true`来屏蔽`animate.css`的动画`class`

在`Vue.use(VueTransitionSuper, option)`中`option`表示的是一个配置对象，配置项如下表，传入的配置项会作为组件的`props`默认值，它的优先级会低于通过`v-bind`传入的`props`项 

**组件props 与 option**

| 参数名                         | 类型           | 默认值                    | 描述                                                         |
| ------------------------------ | -------------- | ------------------------- | :----------------------------------------------------------- |
| `forwardeEnterActiveClass`     | `String|Array` | `animate__bounceInLeft`   | 路由前进时进场动画`class`名称, 如果想指定多个动画class可以bind一个Array |
| `forwardeLeaveActiveClasslass` | `String|Array` | `animate__bounceOutRight` | 路由前进时离场动画`class`名称, 如果想指定多个动画class可以bind一个Array |
| `backEnterActiveClasslass`     | `String|Array` | `animate__bounceInRight`  | 路由后退时进场动画`class`名称, 如果想指定多个动画class可以bind一个Array |
| `backLeaveActiveClasslass`     | `String|Array` | `animate__bounceOutLeft`  | 路由后退时离场动画`class`名称, 如果想指定多个动画class可以bind一个Array |
| `notUseAnimate`                | `Boolean`      | `false`                   | 不使用`animate.css`动画效果, 如果想指定多个动画class可以bind一个Array |

