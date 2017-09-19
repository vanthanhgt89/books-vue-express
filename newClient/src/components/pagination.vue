<template>
    <div class="container">
        <ul class="pagination">

            <template v-for="index in pages">
                <li :key="index" v-if=" index == currentPage" class="active" @click="changePage(index)">
                    <router-link :to=" url + category + '?page=' + index ">{{index}}</router-link>
                </li>
                <li :key="index"  @click="changePage(index)" v-else >
                    <router-link :to=" url + category + '?page=' + index">{{index}}</router-link>
                </li>
            </template>

        </ul>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: ['pages', 'currentPage', 'url', 'id'],
    methods: {
        changePage(index) {
            console.log('emit');
            // console.log(index);
         this.$emit('changed', index)
        }
    },
    data () {
        return  {
            category: this.id || ''
        }
    }

}
</script>

<style scoped >
.pagination {
    float: right;
}
</style>
