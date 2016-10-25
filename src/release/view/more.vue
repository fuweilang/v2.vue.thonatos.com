<template>
  <div class="about">
    this is more
    <p class="detail">
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'more',

  data () {
    return {
      msg: '111111'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .about{
    padding: 1rem;

    .detail{
      font-size: 1rem;
      margin: 0;
      font-family: monospace;
    }
  }
</style>
