<template>
   <div class="user-content">
      <Button type="primary" @click="back">
          login
        </Button>
   </div>
</template>
<script>
export default {
    methods: {
        back() {
this.$router.push({ name: 'user'})
        }
    }
}
</script>

<style>
</style>

