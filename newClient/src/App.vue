<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #F2F2F2;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul,
li {
  list-style: none;
}

.page-item {
  float: right;
}
</style>
