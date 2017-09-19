<template>
    <div id="app">
        <getHeader @find="findBook"></getHeader>
        <!-- <get-header :url="url" @find="findBook"></get-header> -->
        <!-- <input type="text" placeholder="search local" v-model="search">
                <h1>{{search}}</h1> -->
        <div class="container">
            <div class="row">
                <side-nav :category="category" :url="url" @isChanged="fetchDataCategory"></side-nav>
                <bookDetail :infoBook="infoBook"></bookDetail>
            </div>
        </div>
    </div>
</template>

<script>
import getHeader from '@/components/Get-Header'
import sideNav from '@/components/Side-Nav'
import bookDetail from '@/components/Book-Detail'
import axios from 'axios'
const URL = 'http://127.0.0.1:3000'
export default {
    name: 'Layout',
    props: ['id'],
    data() {
        return {
            category: [],
            infoBook: {},
            list: [],
            url: '/'
        }
    },
    created() {
        this.fetchData()
    },

    methods: {
        fetchData() {
            axios.get(`${URL}/api/detail/${this.$route.params.id}`)
                .then(res => {
                    console.log(res);
                    this.category = res.data.category
                    this.infoBook = res.data.dataDetail
                    this.list = res.data.rate[0].list
                    // console.log(this.list);
                })
                .catch(err => {
                    console.log('err', err);
                })
        },
        fetchDataCategory: function(id) {
            // console.log('id', id);
            this.currentCategory = id
            axios.get(`${URL}/api/category/${id}`)
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
            console.log(this.isSearch);
        },
        finding() {
            axios.get(`${URL}/api/search?name=${name}`)
                .then(res => {
                    this.books = res.data.dataSearch
                    // console.log(this.books);
                    let total = parseInt(res.data.count.count)
                    this.pages = Math.ceil(total / 10)
                })
                .catch(err => {
                    throw new Error('Search err')
                })
        }
    },
    watch: {
        isSearch: function() {
            this.finding()
        },
        
    },
    components: {
        getHeader,
        sideNav,
        bookDetail,
    }
}
</script>

<style>

</style>
