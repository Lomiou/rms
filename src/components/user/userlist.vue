<template>
<div class="user">
  <usersearch></usersearch>
  <usertab></usertab>
</div>
</template>
<script>
  import usersearch from '../search/usersearch'
  import usertab from '../table/usertab'
export default {
  components: {
    usersearch,
    usertab
  }
}
</script>
<style lang="scss" scoped>
.user{
//  min-width: 800px;
  overflow: hidden;
}
</style>