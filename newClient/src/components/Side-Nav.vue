<template>
        <div class="col-md-3">
            <ul class="side-nav">
                <li v-for="item in category" :key="item.id" @click="changeCategory(item.id)">
                    <router-link :to="url + item.id">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
</template>

<script>
import {bus} from '../main'
export default {
    name: 'side-nav',
    props: ['category', 'url'],
    methods: {
       changeCategory(id) {
           this.id = id
           this.$emit('isChanged', id)
       }
    //    busCategory () {
    //     bus.$emit('busChanged', )
    //    }
    }

}
</script>

<style scoped>
.side-nav {
    color: red;
    font-size: 1.2em;
    font-weight: bold;
    text-align: left;
    padding: 0px 10px;
}

.side-nav>li {
    padding: 10px 0;
}
</style>
