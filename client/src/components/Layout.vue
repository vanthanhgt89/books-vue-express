<template>
  <div class='container-fluid'>
    <getHeader></getHeader>
    <div class="container">
      <div class="row">
        <side_nav :category="category"></side_nav>
        <books :books="books"></books>
      </div>
      <div class="row">
        <ul class="pagination page-item">
          <li >
            <buttons
            v-for="(item, index) in buttons"
            :key="index"
            :is-active = 'isActive'
            :index = 'index'
            @actived='toggleActive(item)'
            />
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import getHeader from '@/components/getHeader'
import side_nav from '@/components/Side-nav'
import Books from '@/components/Books'
import buttons from '@/components/button'
const baseUrl = 'http://192.168.1.48:3000'

export default {
  name: 'Layout',
  data() {
    return {
      category: [],
      books: [],
      allBooks: null,
      pages: 1,
      bookInPages: 10,
      err: '',
      isActive: false,
      btns: [
        {name: this.pages, status: false}
      ]
      
    }
  },
  created() {
    axios.get(`${baseUrl}/api/data`)
      .then(res => {
        console.log(res);
        this.category = res.data.category
        this.books = res.data.dataHome
        this.allBooks = parseInt(res.data.count.count)
        this.pages = Math.ceil(this.allBooks/this.bookInPages)
        // console.log(this.pages);
      })
      .catch(err => {
        this.err = 'Location not found'
        this.category = []
      })
  },
  methods: {
    getPages: function() {
      axios.post(`${baseUrl}/api/pages/:number`)
        .then(res => {

        })
        .catch(err => [{

        }])
    },
    toggleActive (activatedButton) {
      for(let btn of this.btns){
        console.log(button);
        // buttons.push({
        //   name: page,
        //   status: page === activatedButton
        // })
        btn.status = page === activatedButton
      }
    }
  },
  components: {
    getHeader,
    side_nav,
    Books,
    buttons
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

