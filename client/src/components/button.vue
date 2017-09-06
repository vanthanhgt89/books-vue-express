<template>
 <button
    :class="{'btn-danger': isActive}"
    @click="changeStatus"
 >
{{index + 1}}
 </button>
</template>

<script>

export default {

  name: 'Layout',
  props: ['isActive', 'index'],
  methods: {
      changeStatus () {
          this.$emit('actived')
      }
  }
}

</script>

<style>
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

