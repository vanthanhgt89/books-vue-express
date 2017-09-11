<template>
  <div class='container-fluid'>
    <getHeader></getHeader>
    <div class="container">
      <div class="row">
        <side_nav :category="category"></side_nav>
        <books :books="books"></books>
      </div>
      <pagination 
      :change="getPage()" 
      :pages="pages" 
      :statusPage="statusPage " 
      :currentPage="currentPage" 
      :url="url"></pagination>

    </div>
  </div>
</template>

<script>
import getHeader from '@/components/getHeader'
import side_nav from '@/components/Side-nav'
import pagination from '@/components/pagination'
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
      statusPage: 1,
      currentPage: 1,
      bookInPages: 10,
      err: '',
      url: '/'
      // isActive: false,
    }
  },
  created() {
    axios.get(`${baseUrl}/api/data`)
      .then(res => {
        // console.log(this.$route.query);
        this.currentPage = this.$route.query.page || 1
        this.category = res.data.category
        this.books = res.data.dataHome
        this.allBooks = parseInt(res.data.count.count)
        this.pages = Math.ceil(this.allBooks / this.bookInPages)

        // console.log(this.currentPage);
      })
      .catch(err => {
        this.err = 'Location not found'
        this.category = []
      })

    console.log('abc', this.$route.query.page);
    axios.get(`${baseUrl}/api/data/?page = ${this.$route.query.page}`)
      .then(res => {
        // console.log(res);
        this.currentPage = this.$route.query.page
        this.category = res.data.category
        this.books = res.data.dataHome
        this.allBooks = parseInt(res.data.count.count)
        this.pages = Math.ceil(this.allBooks / this.bookInPages)
      })
  },
  methods: {
    getPage() {
      axios.get(`${baseUrl}/api/data/?page=${this.$route.query.page}`)
        .then(res => {
          this.currentPage = this.$route.query.page
          this.category = res.data.category
          this.books = res.data.dataHome
          this.allBooks = parseInt(res.data.count.count)
          this.pages = Math.ceil(this.allBooks / this.bookInPages)
        })
        .catch(err => {
          console.log('err', err);
        })
    }
  },
  components: {
    getHeader,
    side_nav,
    Books,
    pagination
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

