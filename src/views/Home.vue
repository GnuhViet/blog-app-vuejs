<template>
    <!-- preloader
    ================================================== -->
    <!-- <div id="preloader">
        <div id="loader" class="dots-fade">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div> -->

    <div class="masonry-wrap">

        <div class="masonry">

            <div class="grid-sizer"></div>

            <article class="masonry__brick entry format-standard " v-for="(item, index) in table_data" :key="index">

                <div class="entry__thumb">
                    <a href="single-standard.html" class="entry__thumb-link">
                        <img src="public/images/thumbs/masonry/woodcraft-600.jpg"
                            srcset="images/thumbs/masonry/woodcraft-600.jpg 1x, images/thumbs/masonry/woodcraft-1200.jpg 2x"
                            alt="">
                    </a>
                </div>

                <div class="entry__text">
                    <div class="entry__header">

                        <h2 class="entry__title"><a href="single-standard.html">Just a Standard Format Post.</a></h2>
                        <div class="entry__meta">
                            <span class="entry__meta-cat">
                                <a href="category.html">Design</a>
                                <a href="category.html">Photography</a>
                            </span>
                            <span class="entry__meta-date">
                                <a href="single-standard.html">Apr 29, 2019</a>
                            </span>
                        </div>

                    </div>
                    <div class="entry__excerpt">
                        <p>
                            {{ item.text }}
                        </p>
                    </div>
                </div>

            </article> <!-- end article -->
        </div> <!-- end masonry -->

    </div> <!-- end masonry-wrap -->

    <div class="row">
        <div class="column large-full">
            <nav class="pgn">
                <ul>
                    <li><a class="pgn__prev" href="#0">Prev</a></li>
                    <li><a class="pgn__num" href="#0">1</a></li>
                    <li><span class="pgn__num current">2</span></li>
                    <li><a class="pgn__num" href="#0">3</a></li>
                    <li><a class="pgn__num" href="#0">4</a></li>
                    <li><a class="pgn__num" href="#0">5</a></li>
                    <li><span class="pgn__num dots">…</span></li>
                    <li><a class="pgn__num" href="#0">8</a></li>
                    <li><a class="pgn__next" href="#0">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import router from '@/router';
export default {
    name: 'Master',
    components: {
    },
    data() {
        return {
            filterData: {
            },
            table_data: [],
        }
    },

    created() {
        this.testApi();
    },

    mounted() {
        const store = useStore();
        let jwt = sessionStorage.getItem("JWT");
        console.log(jwt);
        if(jwt != null){
            store.dispatch('setAuth', true);
        }
        else{
            //nếu chưa đăng nhập thì trả về trang login
            store.dispatch('setAuth', false);
            router.push('/login');
        }
    },

    methods: {
        testApi() {
            axios.get('https://localhost:7185/WeatherForecast')
                .then((res) => {
                    console.log(res.data);
                    // let resc = res.data;
                    // this.table_data = resc.result;
                });
        }
    },
};
</script>

<style></style>