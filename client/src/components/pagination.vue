<template>
    <div class="container">
        <ul class="pagination">
        
            
            <template v-for="index in pages">
                <li :key="index" v-if="index == currentPage" class="active" @click="changePage(index)">
                    <router-link :to="url + '?page=' + index" >{{index}}</router-link>
                </li>
                <li :key="index" v-else @click="changePage()">
                    <router-link :to="url + '?page=' + index">{{index}}</router-link>
                </li>
            </template>
            
        </ul>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: ['pages', 'currentPage', 'url'],
    data() {
        return {
            isActived: 'active'
        }
    },
    methods: {
        changePage(index) {
            this.$emit('change', index)
        }
    }

}
</script>

<style scoped >
.pagination {
    float: right;
}
</style>
