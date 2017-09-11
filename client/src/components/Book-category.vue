<template>
    <div class='container-fluid'>
        <getHeader @finding="findBook()"></getHeader>
        <div class="container">
            <div class="row">
                <side_nav :category="category" @activate='getCategory()'></side_nav>
                <div v-if="books.length > 0">
                    <books :books="books">
                    </books>
                </div>
                <div v-else>
                    <h1>Category is empty</h1>
                </div>
            </div>
        </div>
        <pagination @change="getPage()" :pages="pages" :url="url1" :currentPage="currentPage">
        </pagination>

    </div>
</template>

<script>
import getHeader from '@/components/getHeader'
import side_nav from '@/components/Side-nav'
import pagination from '@/components/pagination'
import Books from '@/components/Books'
const baseUrl = 'http://127.0.0.1:3000'

export default {
    name: 'Layout',
    data() {
        return {
            category: [],
            books: [],
            allBooks: null,
            pages: 1,
            currentPage: 1,
            bookInPages: 10,
            url: '/category/',
            // id_cat: 0,
            err: '',
            url1: '',
            isSearch: ''

        }
    },
    created() {
        axios.get(`${baseUrl}/api/category/${this.$route.params.id}`)
            .then(res => {
                this.category = res.data.category
                this.books = res.data.dataCat
                this.allBooks = parseInt(res.data.count.count)
                this.pages = Math.ceil(this.allBooks / this.bookInPages)
                this.currentPage = this.$route.query.page
            })
            .catch(err => {
                console.log('err', err);
            })


        axios.get(`${baseUrl}/api/category/${this.$route.params.id}?page=${this.$route.query.page}`)
            .then(res => {
                this.category = res.data.category
                this.books = res.data.dataCat
                this.allBooks = parseInt(res.data.count.count)
                this.pages = Math.ceil(this.allBooks / this.bookInPages)
                this.currentPage = this.$route.query.page
                this.url1 = this.url + this.$route.params.id
            })
            .catch(err => {
                console.log('err', err);
            })
    },

    methods: {
        getCategory() {
            // console.log(this.$children)
            this.id_cat = this.$children[1].id_cat
            axios.get(`${baseUrl}/api/category/${this.id_cat}`)
                .then(res => {
                    this.category = res.data.category
                    this.books = res.data.dataCat
                })
                .catch(err => {
                    console.log('err', err);
                })
        },
        getPage() {
            axios.get(`${baseUrl}/api/category/${this.$route.params.id}?page=${this.$route.query.page}`)
                .then(res => {
                    // this.category = res.data.category
                    this.books = res.data.dataCat
                    this.allBooks = parseInt(res.data.count.count)
                    this.pages = Math.ceil(this.allBooks / this.bookInPages)
                    this.currentPage = this.$route.query.page
                    this.url1 = this.url + this.$route.params.id

                })
                .catch(err => {
                    console.log('err', err);
                })
        },
        findBook() {
            console.log('search', this.isSearch)
            console.log(this.$children);
            this.isSearch = this.$children[0].isSearch
        },

        getData() {
            axios.get(`${baseUrl}/api/search?name=${this.isSearch}`)
                .then(res => {
                    console.log(res);
                    this.currentPage = this.$route.query.page
                    this.category = res.data.category
                    this.books = res.data.dataSearch
                    this.allBooks = parseInt(res.data.count.count)
                    this.pages = Math.ceil(this.allBooks / this.bookInPages)
                })
                .catch(err => {
                    console.log('err', err);
                })
        },
    },
    watch: {
        isSearch: function(search) {
            this.getData()
        },
        '$route' (to, from) {
            console.log('change route',this.$route.params.id);
            console.log('THIS query', this.$route.query);
            this.getCategory()
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

