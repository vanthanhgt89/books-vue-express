<template>
    <div class="col-md-9">
        <!-- book item -->
        <div class="row post-item" v-for="item in books" :key="item.id">
            <div class="col-md-3 post-image">
                <img :src="item.images" alt="" class="img-responsive">
            </div>
            <div class="col-md-9 post-content">
                <h2 class="title text-left" 
                    <router-link :to="'/detail/'+ item.id" v-rainbow>{{item.name}}</router-link>
                </h2>
                <h5 class="author text-left">
                    <router-link :to="'/detail/'+ item.id">By: {{item.author}}</router-link>
                </h5>
                <p class="text-left">
                    Take a deep dive into one of the most significant SQL Server features–support for In-Memory Online Transaction Processing. The latest developments are covered, including support of off-row storage, columnstore indexes and operational analytics, changes in programmability and native compilation, and more. This book describes the architecture and internals…
                </p>
            </div>
        </div>
        <!-- end books item -->

    </div>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://127.0.0.1:3000'
export default {
    name: 'Books',
    props: ['books','url'],
    //Local Directives
    // directives: {
    //     'rainbow': {
    //         bind(el, binding, vnode) {
    //             el.style.color = '#' + Math.random().toString().slice(2, 8)
    //             el.style.fontSize = '2em'
    //             // el.style.color = 'red'
    //         }
    //     }
    // }
}
</script>

<style scroped>
.item {
    background: white;
}

.post-item {
    padding: 0 0 25px 0;
    margin-bottom: 25px;
    border-bottom: 1px solid #e5e5e5;
}

.post-image>img {
    margin: auto;
}
</style>
