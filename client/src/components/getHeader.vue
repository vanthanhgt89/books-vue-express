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
            <li>
              <a type="button" data-toggle="modal" data-target="#login">Login </a>
            </li>
            <li>
              <a type="button" data-toggle="modal" data-target="#register">Register</a>
            </li>
          </ul>
          <!-- modal login -->
          <!-- Modal -->
          <div class="modal fade" id="login" role="dialog">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Login</h4>
                </div>
                <div class="modal-body">
                  <form action="" class="form-group" method="post">

                    <input type="email" placeholder="Email" name="username" class="form-control" v-model="username">
                    <input type="password" placeholder="Password" name="password" class="form-control" v-model="password">
                    <button type="button" class="btn btn-info" @click="login()">Submit</button>
                    <button type="button" class="btn btn-info">Facebook</button>
                    <button type="button" class="btn btn-info">Gmail</button>
                  </form>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <!-- end modal -->

          <!-- modal register-->
          <!-- Modal -->
          <div class="modal fade" id="register" role="dialog">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Login</h4>
                </div>
                <div class="modal-body">
                  <form  class="form-group" >

                    <input type="email" placeholder="Email" name="username" class="form-control" v-model="user.username">
                    <input type="password" placeholder="Password" name="password" class="form-control" v-model="user.password">
                    <input type="text" v-model="user.name" class="form-control" placeholder="name">
                    <input type="text" v-model="user.phone" class="form-control" placeholder="phone">
                    <input type="text" v-model="user.adress" class="form-control" placeholder="adress">
                    <button type="button" class="btn btn-info" @click="register()">Register</button>
                    <button type="button" class="btn btn-info">Facebook</button>
                    <button type="button" class="btn btn-info">Gmail</button>
                  </form>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <!-- end modal -->

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


const baseUrl = 'http://127.0.0.1:3000'

export default {
  name: 'Header',
  data() {
    return {
      isSearch: '',
      user: {
        username: '',
        password: '',
        phone: 0,
        name: '',
        adress: ''
      },
      username: '',
      password: ''

    }
  },
  methods: {
    findBook() {
      console.log('Button click', this.isSearch)
      this.$emit('finding', this.isSearch)
    },
    login() {
      // console.log('abc');
      // console.log($(this.el).serialize());
      console.log(this.username);
      console.log(this.password);
      axios.post(`${baseUrl}/api/user/login`, {
        username: this.username,
        password: this.password
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    },
    register() {
      axios.post(`${baseUrl}/api/user/register`, {
        user: this.user
      })
      .then(res => {
        console.log(res.data.email);
      })
      .catch(err => {
        console.log(err);
      })

    },


  },
  
}

</script>