# Icon 图标

### 介绍

基于字体的图标集，可以通过 Icon 组件使用。

### 引入

```js
import Vue from 'vue'
import { Icon } from 'dam-ui'

Vue.use(Icon)
```

## 代码演示

### 基础用法

`name`为图标名称

```html
<dam-icon name="success" />
```

### 徽标提示

设置 `dot` 属性后，会在图标右上角展示一个小红点；

设置 `badge` 属性后，会在图标右上角展示相应的徽标。

```html
<van-icon name="success" dot />
<van-icon name="success" badge="9" />
<van-icon name="success" badge="99+" />
```

### 图标颜色

`Icon` 的 `color` 属性用来设置图标的颜色。

```html
<dam-icon name="success" color="#1989fa" />
<dam-icon name="search" color="#ee0a24" />
```

### 图标大小

`Icon` 的 `size` 属性用来设置图标的尺寸大小，默认单位为 `px`。

```html
<van-icon name="success" size="40" /> <van-icon name="success" size="3rem" />
```

## API

### Props

| 参数  | 说明                                      | 类型               | 默认值    |
| ----- | ----------------------------------------- | ------------------ | --------- |
| name  | 图标名称                                  | _string_           | -         |
| color | 图标颜色                                  | _string_           | `inherit` |
| size  | 图标大小，如 `20px` `2em`，默认单位为`px` | _number \| string_ | `inherit` |
| tag   | HTML 标签                                 | _string_           | `i`       |

### Events

| 事件名 | 说明           | 回调参数       |
| ------ | -------------- | -------------- |
| click  | 点击图标时触发 | _event: Event_ |
