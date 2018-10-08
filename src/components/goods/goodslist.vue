<template>
<div class="goodslist">
  <!-- <goodsearch></goodsearch> -->
  <goodslisttab></goodslisttab>
</div>
</template>
<script>
  import goodsearch from '../search/goodsearch'
  import goodslisttab from '../table/goodslisttab'
export default {
  components: {
    goodsearch,
    goodslisttab
  }
}
</script>
<style lang="scss" scoped>
.goodslist{
  // min-width: 1000px;
  overflow: hidden;
}
</style>