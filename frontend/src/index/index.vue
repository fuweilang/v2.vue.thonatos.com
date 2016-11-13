<template>
  <div id="pano">
    <div id='panoplayer' v-panoplayer="pano"  :muted="unmuted"></div>
    <a href="#" @click="mutedControl" class="muted-control">
       <img src="../assets/icon-unmuted.png" v-show="unmuted"/>
       <img src="../assets/icon-muted.png" v-show="!unmuted"/>
    </a>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      unmuted: true,
      pano: {
        url: require('file!../assets/index.mp4')
      }
    }
  },
  methods: {
    mutedControl: function () {
      this.unmuted = !this.unmuted
    }
  },
  created () {
    var _this = this
    setTimeout(() => {
      _this.muted = true
    }, 2000)
  }
}
</script>

<style lang="less">
  * {
    box-sizing: border-box;
  }
  html,
  body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Helvetica, sans-serif;
  }
  #pano,
  #panoplayer{
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
  }
  .muted-control{
    position: fixed;
    left: 16px;
    bottom: 16px;
    background: #2d2d2d;
    width: 36px;
    height: 36px;
    line-height: 36px;
    display:block;
    border:1px solid #2d2d2d;
    border-radius:5px;
    img{
      padding: 6px;
    }
  }
</style>
