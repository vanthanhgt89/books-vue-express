<template>
  <header class='container-fluid'>
    <div class="container">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
            <li class="active">
              <a href="/">ALL IT ebooks </a>
            </li>
            <li>
              <a href="/">Categories</a>
            </li>
          </ul>
          <form class="navbar-form navbar-right">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search" name="name" v-model="isSearch">
              <div class="input-group-btn">
                <button class="btn btn-default" @click="findBook()" type="button">
                  <i class="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </nav>
    </div>

  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isSearch: ''
    }
  },
  methods: {
    findBook () {
      console.log('Button click', this.isSearch)
      // this.isSearch = isSearch
      // this.isSearched = isSearch
      this.$emit('finding', this.isSearch)
    }
  }
}

</script>