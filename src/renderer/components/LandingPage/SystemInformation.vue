<template>
  <div class="company">航通智能提供技术支持</div>
</template>

<script>
  export default {
    data () {
      return {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>

<style scoped>
  .company {
    position: absolute;
    width: 100vw;
    bottom: 15px;
    left: 0;
    font-size: 12px;
    color: #999;
    text-align: center;
  }
</style>
