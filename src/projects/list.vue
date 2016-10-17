<template>
  <div class="about">
    this is list
    <p class="detail">
      {{ msg }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChartsView',

  components: {
  },

  data () {
    return {
      msg: '2222222'
    }
  },

  vuex: {
    actions: {
    },
    getters: {
      // list: getChartList
    }
  },

  computed: {
    href (url) {
      console.log(url)
      return url
    }
  },

  route: {
    data ({ to }) {
      console.log(11111)
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
