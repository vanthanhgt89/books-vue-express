<template>
    <div class="col-md-9">
        <h3 class="text-left" v-rainbow >{{infoBook.name}}</h3>
        <h5 class="text-left sub-title">Simple project management for software development</h5>
        <div class="row information">
            <div class="col-md-4">
                <img :src="infoBook.images" alt="image" class="img-responsive">
            </div>
            <div class="col-md-8 ">
                <dl class="text-left">
                    <dt>Author: </dt>
                    <dd>{{infoBook.author}}</dd>
                    <dt>ISBN-10: </dt>
                    <dd>{{infoBook.isnb}}</dd>
                    <dt>Year: </dt>
                    <dd>{{infoBook.year}}</dd>
                    <dt>Pages: </dt>
                    <dd>{{infoBook.pages}}</dd>
                    <dt>Language: </dt>
                    <dd>{{infoBook.language}}</dd>
                    <dt>File size: </dt>
                    <dd>{{infoBook.file_size}}</dd>
                    <dt>File format: </dt>
                    <dd>{{infoBook.file_format}}</dd>
                    <dt>Category: </dt>
                    <dd></dd>

                </dl>
            </div>
        </div>
        <div class="row text-left content" v-html="infoBook.description"></div>
        <div class="row meta">
            <button class="btn btn-danger btn-text">
                <a :href="infoBook.link_dowload">Dowload PDF {{infoBook.file_size}}</a>
            </button>
            <button class="btn btn-danger btn-text">
                <a :href="infoBook.read_online">Read Online</a>
            </button>
        </div>
        <div class="row">
            <div class="col-md-3" v-for="(item, index) in list" :key="index">
                <img :src="item.image" alt="" class="img-responsive img">
                <a><h5>{{item.name}}</h5></a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'infoBook',
    props: ['infoBook', 'list'],
   

}
</script>

<style scoped>
.sub-title {
    /* border-bottom: 1px solid #38485a; */
    margin-bottom: 15px;
}

.information {
    padding: 15px 0;
    border-top: 1px solid rgba(51, 51, 51, 0.43);
    border-bottom: 1px solid rgba(51, 51, 51, 0.43);
}

.content {
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(51, 51, 51, 0.43);
}

dt {
    display: inline-block;
    width: 20%;
    padding: 10px 0px 13px 0px;
}

dd {
    display: inline-block;
    width: 75%;
    padding: 10px 0px 13px 0px;
}

.meta {
    padding: 15px 0;
    border-bottom: 1px solid rgba(51, 51, 51, 0.43);
}

.btn-text>a {
    color: white;
}
.img{
    height: 240px;
}
</style>
