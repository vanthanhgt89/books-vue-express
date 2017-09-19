# BOOK SALE 
> A Vue.js project

### Server Express (http://localhost:3000/)
[link server] (https://github.com/lephuongtu271094/BookStoreRestApi)
[Data base] (https://github.com/thanhdat21293/bookstore.git)
* API lấy dữ liệu
  * /api/data
  * /api/data/?page='value'
  * /api/category
  * /api/category/:id
  * /api/category/:id?page="value"
  * /api/subcategory/:id
  * /api/subcategory/:id?page="value"
  * /api/search?name=value&?page="value"

* Cấu trúc project khi render gồm 4 trang cơ bản:
- HOME PAGE
- CATEGORY 
- DETAIL
- SEARCH
### Các bước thực hiện 
* Bước 1: Mockup giao diện giống trang [http://www.allitebooks.com/](http://www.allitebooks.com/)
* Bước 2 : Tạo các components ứng với các page 
    * Layout --> Homepage
    * Category --> Category
    * Book-Detail --> Detail
    * Search --> Search
    * Get-Header, Side-Nav dùng chung cho các trang
    * paginatin để phân trang
* Bước 3: Thiết kế router.js 
```js
export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Layout',
      component: Layout,
      props: (route) => ({ page: route.query.page || 1})
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: Layout,
      props: true,
      // props: (route) => ({ pageCategory: route.query.page })
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      props: true,
    },
    {
      path: '/search/:id',
      name: 'Detail',
      component: Detail,
      props: true,
    },
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return {
      y: 0
    }
  }
})
```
* PROPS: Chuyền dữ liệu từ components từ parent ---> child, Dùng v-bind để binding
* Props: có thể là String/ Object/ function như trên routes. Như trên ta sử dụng props passing to route components
  * Props: true --> chuyền giá trị this.$route.parmas đến child sử dụng nó
  * Props: (route) => ({ page: route.query.page || 1}) --> trả về object đến child sử dụng 
  * [Hiểu rõ hơn tại đây ] (https://router.vuejs.org/en/essentials/passing-props.html)

* scrollBehavior:Xác định vị trí cho thanh cuộn khi chuyển trang, như trên y = 0 thanh cuộn chuyển lên đầu khi thay đổi route

* Bước 4: Lấy dữ liệu từ server và render VD: home page các trang sau tương tự. Các phương thức hay sử dụng
  * props: lấy dữ liệu page mặc định là 1, id
```js
    props: ['id', 'page'],
```
  * data: tạo các biến lưu dữ liệu từ server trả về

```js
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
```
  * create() Khởi tạo dữ liệu trong Vue

  ```js
        if (this.isSearch !== '' || this.isSearch !== undefined) {
            this.url = '/?name=' + this.isSearch
        }
        if (this.currentPage !== 1) {
            this.url = '/?page=' + this.currentPage
        }
        if (this.id !== undefined) {
            this.url = '/' + this.id
        }
        // console.log('after', this.url);
        switch (this.url) {
            case '/': {
                this.fetchData()
                break;
            }
            case `/${this.id}`: {
                this.fetchDataCategory(this.id)
                break;
            }
            case `/?name=${this.isSearch}`: {
                this.findBook(this.isSearch)
                break;
            }
            case `/?page=${this.currentPage}`: {
                this.url = '/'
                this.fetchDataPage(this.currentPage)
                break;
            }
        }

  ```
  * watch: theo dõi khi thay đổi route
```js
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
    },
```
  * methods: viết các function lấy dữ liệu 
```js
  const URL = 'http://localhost:3000/'
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
            this.currentPage = index
            console.log(index);
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

```

  
  * update(): update lại DOM khi refesh
  ```js
    updated(){
       this.fetchData()
        }
  ```
  * this.$route.params --> lấy giá trị params
  * this.$route.query --> lấy giá trị query 
  * this.$emit   --> tạo event emit từ child to parent và ngược lại
    * Ở Layout tạo thực hiện sự kiện **changed** khi người dùng chuyển trang dùng v-bind để binding dữ liệu
     * <pagination :pages="pages" :currenPage="currentPage" :url="path" @changed="fetchDataPage"></pagination>
     * methods: this.fetchDataPage()


    * Ở components paganiation phát ra (emit) sự kiện click khi người dùng chuyển trang
    ```js
     <template v-for="index in pages">
        <li :key="index" v-if=" index == currentPage" class="active" @click="changePage(index)">
           <router-link :to=" url + category + '?page=' + index ">{{index}}</router-link>
         </li>
        <li :key="index"  @click="changePage(index)" v-else >
            <router-link :to=" url + category + '?page=' + index">{{index}}</router-link>
        </li>
        </template>
      methods: {
        changePage(index) {
            console.log('emit');
            // console.log(index);
         this.$emit('changed', index)
        }
    },
    ```


    




## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
