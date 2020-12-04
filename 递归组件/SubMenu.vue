<template>
    <div>
        <div class="title" @click="change">
            <slot name="title"></slot>
        </div>
        <!-- 用v-if可以把状态都销毁 -->
        <div v-show="flag" class="sub">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag: true,
        }
    },
    methods: {
        change() {
            this.flag = !this.flag;
        }
    }
}
</script>
<style>
.title{
    cursor: pointer;
  font-weight: bold;
}
.sub {
    padding-left: 20px;
}
</style>

