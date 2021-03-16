<template>
   <div id="app">
       <!-- iview 中 menu MenuItem SubMenu -->
       <!-- 递归组件 数结构 菜单 -->
       <Menu>
           <template v-for="menu in menuList" >
               <MenuItem :key="menu.title" v-if="!menu.children">{{menu.title}}-自定义</MenuItem>
               <!-- 把重复的部分 先去抽离出去 -->
               <ReSubMenu :key="menu.title" v-else :data="menu"></ReSubMenu>
           </template>
       </Menu>
   </div>
</template>

<script>
    import Menu from './Menu'
    import MenuItem from './MenuItem'
    import ReSubMenu from './ReSubMenu'
    // 使用组件 3步  定义组件 引用组件 注册组件
    export default {
        name: "App",
        data(){
            return {
                menuList:[
                    {
                        title:'菜单1',
                        children:[
                            {
                                title:'菜单1-1',
                                children:[
                                    {title:'菜单1-1-1'},
                                    {title:'菜单1-1-2'},
                                    {
                                        title:'菜单1-1-3',
                                        children:[
                                            {title:'菜单1-1-1'},
                                            {title:'菜单1-1-2'},
                                            {title:'菜单1-1-3'}
                                        ]
                                    }
                                ]
                            },
                            {title:'菜单1-2'},
                            {title:'菜单1-3'},
                             {title:'菜单1-4'}
                        ]
                    },
                    {
                        title:'菜单2'
                    },
                    {
                        title:'菜单3'
                    }
                ]
            }
        },
        components:{
            Menu,
            MenuItem,
            ReSubMenu
        }
    }
</script>

<style scoped>
    #app{
        color: red;
    }
</style>