<template>
<div class="content">
  <mheader></mheader>
  <div class="center">
    <mnav></mnav>
    <router-view></router-view>
  </div>
  
</div>
</template>
<script>
import mheader from '../header/header'
import mnav from '../nav/nav'
export default {
  data() {
    return {
      
    }
  },
  methods: {
  },
  components: {
    mheader,
    mnav
  }
}
</script>
<style lang="scss" scoped>
.center{
  display: flex;
}
</style>