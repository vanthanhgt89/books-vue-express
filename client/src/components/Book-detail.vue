<template>
    <div class='container-fluid'>
        <getHeader></getHeader>
        <div class="container">
            <div class="row">
                <side_nav :category="category" @activate='getCategory()'></side_nav>
                <detail :infoBook="infoBook" :list="list"></detail>
            </div>

        </div>

    </div>
</template>

<script>
import getHeader from '@/components/getHeader'
import side_nav from '@/components/Side-nav'
import detail from '@/components/Info-book'
const baseUrl = 'http://127.0.0.1:3000'

export default {
    name: 'Layout',
    data() {
        return {
            category: [],
            infoBook: {},
            list: [],
            err: '',

        }
    },
    created() {
        this.getData()

    },
    methods: {
        getData() {
            axios.get(`${baseUrl}/api/detail/${this.$route.params.id}`)
                .then(res => {
                    console.log(res);
                    this.category = res.data.category
                    this.infoBook = res.data.dataDetail
                    this.list = res.data.rate[0].list
                    console.log(this.list);
                })
                .catch(err => {
                    console.log('err', err);
                })
        }

    },

    components: {
        getHeader,
        side_nav,
        detail
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

