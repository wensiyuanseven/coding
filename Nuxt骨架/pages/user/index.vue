<template>
   <div class="user-content">
      <Button type="primary" @click="back">
          user
        </Button>
   </div>
</template>
<script>
export default {
    methods: {
        back() {
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

<style>
</style>

