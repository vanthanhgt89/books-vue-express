<template>
  <header class='container-fluid'>
    <div class="container">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
            <li class="active">
              <a href="#">ALL IT ebooks </a>
            </li>
            <li>
              <a href="#">Categories</a>
            </li>
          </ul>
          <form class="navbar-form navbar-right">
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search">
              <div class="input-group-btn">
                <button class="btn btn-default" type="submit">
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

</script>