**1.清除单个FormItem校验信息**

给FormItem加ref
```html
  <FormItem ref="name" >
            <Input v-model="model.name1" placeholder="请输入" />
  </FormItem>
```
 调用
```javascript
 this.$refs.name.resetField()
```

**2.给某一个FormItem做单独校验**
 给Form添加ref，给FormItem添加prop
```javascript
   <Form ref="formValidate ">
        <FormItem  prop="passwdCheck">
            <Input type="password" v-model="formValidate .passwdCheck" />
        </FormItem>
    </Form>
```
 调用
````javascript
 this.$refs.formValidate .validateField('passwdCheck')
````
**3.需要校验的字段名必须一样**

```html
<template>
      <Form :model="model" >
          <FormItem  prop="name" >
            <Input v-model="model.name" placeholder="请输入客户名称" />
          </FormItem>
	</Form>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: "", //客户名称
      },
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ]
};
</script>
```
**4. 校验规则**
```javascript
	data(){
			return{
			  name: [
					  { required: true, message: "请输入联系人", trigger: "blur" },
					  {type:'string', max: 20, message: "最多输入10个字", trigger: "blur,change" },
					  //或者
					  { message: "只能输入中文字符", pattern: /[\u4E00-\u9FA5]/g,trigger: "blur,change" }
			   ],
			}
	}
```
 如果做校验，name字段必须和FormItem标签中的prop字段一样

 ```javascript
 <FormItem label="联系人:" prop="name">
          <Input v-model="model.linkMan" placeholder="请输入联系人" />
  </FormItem>
```
trigger 设置成 trigger: "blur,change"  可以在不失去焦点时检验规则
type属相默认为'string' 可不填写  它可校验的类型有很多，具体可看此文档
> https://github.com/yiminghe/async-validator

**iview2.0 遇到的问题 **
1.如果在formItem上面加v-if 就会使检验规则变混乱，比如某个item是必填项可能会变成不必填项，不必填项会变成必填项

```html
  <FormItem v-if="true" ></FormItem>
```
解决办法 用v-show来处理显示隐藏

2.关于检验规则
错误用法
```javascript
     name: [
			 { required: true, message: "请输入联系人", trigger: "blur" },
			  {type:'string', max: 20, message: "最多输入10个字", trigger: "blur,change" },
			  { message: "只能输入中文字符", pattern: /[\u4E00-\u9FA5]/g,trigger: "blur,change" }
			 ]
```
最多只能写两种校验类型，多了剩下的校验会不生效

```javascript
 name: [
			   { required: true, message: "请输入联系人", trigger: "blur" },
		    	{type:'string', max: 20, message: "最多输入10个字", trigger: "blur,change" }
		 ]
```





