<template>
  <div>
    <div v-if="loading">Loading articles...</div>
    <div v-else class="masonry-wrap">
      <div class="masonry">
        <div class="grid-sizer"></div>
        <article class="masonry__brick entry format-standard" v-for="(item, index) in displayedItems" :key="index">
          <div class="entry__thumb">
            <a href="single-standard.html" class="entry__thumb-link">
              <img :src="item.thumbnail" alt="">
            </a>
          </div>
          <div class="entry__text">
            <div class="entry__header">
              <h2 class="entry__title">
                <router-link :to="'/details/' + item.id">{{ item.title }}</router-link>
              </h2>
              <div class="entry__meta">
                <span class="entry__meta-cat">
                  <a v-for="category in item.categories" :key="category.id" :href="'category.html?id=' + category.id">{{
                    category.name }}</a>
                </span>
                <span class="entry__meta-date">
                  <p>{{ item.formattedCreateDate }}</p>
                </span>
              </div>
            </div>
            <div class="entry__excerpt">
              <p>{{ item.shortDescription }}</p>
            </div>
          </div>
        </article>
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
import { mapGetters, useStore } from "vuex";
import router from "@/router";
import { onUpdated } from 'vue';
export default {
  name: "Master",
  components: {},
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
    ...mapGetters({
      tableData: 'getTableData',
    })
  },

  watch: {
    tableData(newValue) {
      this.table_data = newValue;
      console.log(this.table_data);
    }
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
      axios
        .get("https://localhost:7185/api/Article")
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
  },
};
onUpdated(() => {
  console.log(tableData);
})
</script>

<style></style>