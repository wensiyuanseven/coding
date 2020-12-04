
<template>
  <div class="hello">
    <!-- <date-picker :value="now" @input="val=>value=val"></date-picker> -->
    <date-picker v-model="now" :abc="abc" class="date-picker"></date-picker>

    <!-- <div id="this_map_id" style="width:500px;height:400px">
    </!-->
  </div>
</template>
<script>
import DatePicker from './components/data-picker.vue'
export default {
  components: {
    DatePicker,
  },
  // name: 'HelloWorld',
  data() {
    return {
      now: new Date(),
      abc: '123',
    }
  },
  mounted() {
    this.abc = '456'
    console.log('父组件')
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.date-picker {
  margin-top: 30px;
}
</style>
