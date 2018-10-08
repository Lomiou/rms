<template>
<div class="classify">
  <goodsearch></goodsearch>
  <classifytab></classifytab>
</div>
</template>
<script>
  import goodsearch from '../search/goodsearch'
  import classifytab from '../table/classifytab'
export default {
  components: {
    goodsearch,
    classifytab
  }
}
</script>
<style lang="scss" scoped>
.classify{
  // width: 1000px;
  overflow: hidden;
}
</style>