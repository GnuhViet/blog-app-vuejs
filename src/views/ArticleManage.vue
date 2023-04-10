<template>
    <div class="row add-bottom">
        <div class="column large-full">
            <h3>Your Post</h3>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Created Date</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in displayedItems" :key="index">
                            <td>{{ item.title }}</td>
                            <td>{{ item.formattedCreateDate }}</td>
                            <td>{{ item.shortDescription }}</td>
                            <td>
                                <a class="btn" href="#0">Edit</a>
                                <a class="btn btn--primary" href="#0">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="column large-full">
            <nav class="pgn">
                <ul>
                    <li v-if="currentPage > 1">
                        <a class="pgn__prev" href="#0" @click="prevPage">Prev</a>
                    </li>
                    <li v-for="pageNumber in pages" :key="pageNumber">
                        <a v-if="pageNumber === currentPage" class="pgn__num current"> {{ pageNumber }}</a>
                        <a v-else class="pgn__num" href="#0" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                    </li>
                    <li v-if="currentPage < totalPages">
                        <a class="pgn__next" href="#0" @click="nextPage">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
    
<script>
import axios from "axios";
import { useStore } from "vuex";
export default {
    name: "Manage",
    data() {
        return {
            table_data: [],
            currentPage: 1,
            itemsPerPage: 9,
            loading: true,
        };
    },
    created() {
        this.testApi();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.table_data.length / this.itemsPerPage);
        },
        pages() {
            const pagesArray = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pagesArray.push(i);
            }
            return pagesArray;
        },
        displayedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.table_data.slice(startIndex, endIndex);
        },
    },
    created() {
        this.testApi();
    },
    mounted() {
        const store = useStore();
        let jwt = sessionStorage.getItem("JWT");
        if (jwt != null) {
            store.dispatch("setAuth", true);
        } else {
            //nếu chưa đăng nhập thì trả về trang login
            store.dispatch("setAuth", false);
        }
    },
    methods: {
        testApi() {
            var token = sessionStorage.getItem("JWT");

            const headers = {
                'Authorization': "Bearer " + token,
            }

            axios
                .get("https://localhost:7185/api/Article/manage", {
                    headers: headers,
                })
                .then((res) => {
                    console.log(res.data);
                    let resc = res.data;
                    this.table_data = resc.data;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        nextPage() {
            this.currentPage++;
        },
        prevPage() {
            this.currentPage--;
        },

    }
}
</script>