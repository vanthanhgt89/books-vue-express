<template>
    <div id="app">
        <!-- <getHeader :url="url" @find="findBook"></getHeader> -->
        <get-header :url="path" @find="findBook"></get-header>
        <!-- <input type="text" placeholder="search local" v-model="search">
                        <h1>{{search}}</h1> -->
        <div class="container">
            <div class="row">
                <side-nav :category="category" :url="path" @isChanged="fetchDataCategory"></side-nav>
                <showBook :books="books"></showBook>
            </div>
        </div>
        <pagination :pages="pages" :currenPage="currentPage" :url="path" @changed="fetchDataPage"></pagination>
    </div>
</template>

<script>
import getHeader from '@/components/Get-Header'
import sideNav from '@/components/Side-Nav'
import showBook from '@/components/Show-Content'
import pagination from '@/components/pagination'
import axios from 'axios'
const URL = 'http://127.0.0.1:3000'
export default {
    name: 'Layout',
    props: ['id', 'page'],
    data() {
        return {
            category: [],
            books: [],
            pages: 0,
            currentPage: this.$route.query.page || 1,
            url: '/',
            path: '/',
            currentCategory: 0,
            isSearch: this.$route.query.name || '',
            test: ''
        }
    },
    beforeCreate() {
        axios.get(`${URL}/api/data`)
            .then(res => {
                this.category = res.data.category
            })
            .catch(err => {
                throw Error
            })
    },
    created() {
        console.log('fquery', this.page);
        console.log('issearch', this.isSearch);
        console.log('currenpage', this.currentPage);
        // if (this.isSearch !== '' || this.isSearch !== undefined) {
        //     this.url = '/?name=' + this.isSearch
        // }
        // if (this.currentPage !== 1) {
        //     this.url = '/?page=' + this.currentPage
        // }
        // if (this.id !== undefined) {
        //     this.url = '/' + this.id
        // }
        // // console.log('after', this.url);
        // switch (this.url) {
        //     case '/': {
        //         this.fetchData()
        //         break;
        //     }
            // case `/${this.id}`: {
            //     this.fetchDataCategory(this.id)
            //     break;
            // }
            // case `/?name=${this.isSearch}`: {
            //     this.findBook(this.isSearch)
            //     break;
            // }
            // case `/?page=${this.currentPage}`: {
            //     this.url = '/'
            //     this.fetchDataPage(this.currentPage)
            //     break;
            // }
        // }
        this.fetchData()

    },
    updated (){
        // this.fetchDataCategory(this.id)
        // this.fetchDataPage(this.page)
        // this.findBook(this.isSearch)
    },    
    methods: {
        fetchData() {
            console.log('im later');
            axios.get(`${URL}/api/data`)
                .then(res => {
                    console.log(res);
                    this.books = res.data.dataHome
                    let total = parseInt(res.data.count.count)
                    this.pages = Math.ceil(total / 10)
                })
                .catch(err => {
                    throw new Error('Error data')
                })
        },
        fetchDataPage: function(index) {
            // console.log('ok');
            // console.log(index);
            this.currentPage = index
            console.log(index);
            if (this.id !== undefined) {
                axios.get(`${URL}/api/category/${this.id}?page=${index}`)
                    .then(res => {
                        console.log(res);
                        this.books = res.data.dataCat
                        let total = parseInt(res.data.count.count)
                        this.pages = Math.ceil(total / 10)
                    })
                    .catch(err => {
                        throw new Error('Emit from pagination Error')
                    })
            } else {
                axios.get(`${URL}/api/data/?page=${index}`)
                    .then(res => {
                        console.log(res);
                        this.books = res.data.dataHome
                        let total = parseInt(res.data.count.count)
                        this.pages = Math.ceil(total / 10)
                    })
                    .catch(err => {
                        throw new Error('Emit from pagination Error')
                    })
            }

        },
        fetchDataCategory: function(id) {
            // console.log('id', id);
            // this.path = '/' + id
            
            axios.get(`${URL}/api/category/${this.id}`)
                .then(res => {
                    console.log('pagination', res);
                    this.books = res.data.dataCat
                    let total = parseInt(res.data.count.count)
                    this.pages = Math.ceil(total / 10)
                })
                .catch(err => {
                    throw new Error('Emit from side nav Error')
                })
        },
        findBook: function(name) {
            this.isSearch = name
            // console.log(this.isSearch);
            axios.get(`${URL}/api/search?name=${name}`)
                .then(res => {
                    console.log(res);
                    this.books = res.data.dataSearch
                    // console.log(this.books);
                    let total = parseInt(res.data.count.count)
                    this.pages = Math.ceil(total / 10)
                })
                .catch(err => {
                    throw new Error('Search err')
                })
        },



    },
    watch: {
        '$route.query.name'(to, from) {
            // this.path = ''
            console.log('onchange', this.$route);
            this.path = this.$route.path
            // console.log('name', this.path);
        },

        '$route.query.page'(to, from) {
            console.log('onchange', this.$route);
            
            if (this.id != undefined) {
                this.path = '/' + this.id ;
            }
            // console.log('page', this.path);
        },

        '$route.params.id'(to, from) {
            // this.fetchDataCategory(this.id)
        },
        // '$route.params.id': 'fetchDataCategory' ,
        // '$route': 'fetchDataCategory'

    },
    computed: {

    },

    components: {
        getHeader,
        sideNav,
        showBook,
        pagination
    }
}
</script>

<style>

</style>
