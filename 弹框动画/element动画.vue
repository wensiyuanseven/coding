<template>
  <div>
    <button @click="show">点击显示</button>
    <transition>
      <div class="abc" v-if="visible">内容回家啊啊哈哈哈</div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = !this.visible
    }
  }
}
</script>
<style scoped>
/* 变换1 */
.v-enter-active,
.v-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 30s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 30s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
  /* https://blog.csdn.net/u011848617/article/details/79039365 */
}
.v-enter,
.v-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
/* --------------------------------------------------------- */
/* .v-enter-active,
.v-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center bottom;
}
.v-enter,
.v-leave-active {
  opacity: 0;
  transform: scaleY(0);
} */

/* --------------------------------------------------------- */


/* 变换2 显隐 */
/* .v-enter-active,
.v-leave-active {
  transition: opacity 200ms linear;
}
.v-enter,
.v-leave,
.v-leave-active {
  opacity: 0;
} */

/* --------------------------------------------------------- */


/* .v-enter-active,
.v-leave-active {
  transition: opacity 200ms linear;
}
.v-enter,
.v-leave,
.v-leave-active {
  opacity: 0;
} */


/* --------------------------------------------------------- */


/* .v-enter-active,
.v-leave-active {
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.v-enter,
.v-leave-active {
  opacity: 0;
  transform: scaleX(0);
} */

/* --------------------------------------------------------- */
/* .v-enter-active,
.v-leave-active {
  opacity: 1;
  transform: scale(1, 1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) ;
  transform-origin: top left;
}
.v-enter,
.v-leave-active {
  opacity: 0;
  transform: scale(.45, .45);
} */

/* --------------------------------------------------------- */


/* .v-enter-active,
.v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-active {
  opacity: 0;
  transform: translateY(-30px);
} */

.abc {
  background: #787878;
  height: 200px;
  border: 1px solid sienna;
}
</style>