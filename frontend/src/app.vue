<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>
<script>
import Navigation from './index/navigation'
export default{
  data () {
    return {
    }
  },
  components: {
    Navigation
  }
}
</script>
<style lang="less">
  html,
  body,#app{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  * {
    font-family: "Helvetica Neue", Roboto, Arial, "Droid Sans", sans-serif;
    box-sizing: border-box;
  }
  table{
    border-collapse:
    collapse;
    border-spacing:0;
  }
  fieldset,img{
    border:0;
  }
  a{
    text-decoration:none;
    color:#000;
  }
  h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
    font-size:100%;
    font-weight:normal;
  }
  .clearfix:after {
    content:"\200B";
    display:block;
    height:0;
    clear:both;
  }
  .clearfix {
    *zoom:1;
  }
  ul{
    margin: 0;
    padding: 0;
  }
</style>
