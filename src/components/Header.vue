<template>
    <!-- site header
    ================================================== -->
    <header class="s-header">

        <!-- icon -->
        <div class="header__top">
            <div class="header__logo">
                <router-link to="/" class="site-logo"><img src="images/logo.svg" alt="Homepage"></router-link>
            </div>

            <div class="header__search">

                <form role="search" method="get" class="header__search-form" action="#">
                    <label>
                        <span class="hide-content">Search for:</span>
                        <input type="search" class="header__search-field" placeholder="Type Keywords" value="" name="s"
                            title="Search for:" autocomplete="off">
                    </label>
                    <input type="submit" class="header__search-submit" value="Search">
                </form>

                <a href="#0" title="Close Search" class="header__search-close">Close</a>

            </div> <!-- end header__search -->

            <!-- toggles -->
            <a href="#0" class="header__search-trigger"></a>
            <a href="#0" class="header__menu-toggle"><span>Menu</span></a>

        </div> <!-- end header__top -->

        <nav class="header__nav-wrap">

            <ul class="header__nav">
                <li class="current">
                    <router-link to="/">Home</router-link>
                </li>

                <li class="has-children">
                    <a href="#0" title="">Categories</a>
                    <ul class="sub-menu">
                        <li v-for="category in categories" :key="category.code">
                            <router-link :to="'/category/' + category.code">{{ category.name }}</router-link>
                        </li>
                    </ul>
                </li>

                <li class="has-children">
                    <a href="#0" title="">Blog Posts</a>
                    <ul class="sub-menu">
                        <li><a href="single-video.html">Video Post</a></li>
                        <li><a href="single-audio.html">Audio Post</a></li>
                        <li><a href="single-gallery.html">Gallery Post</a></li>
                        <li><a href="single-standard.html">Standard Post</a></li>
                    </ul>
                </li>
                <li><a href="styles.html" title="">Styles</a></li>
                <li><a href="page-about.html" title="">About</a></li>
                <li><a href="page-contact.html" title="">Contact</a></li>
                <li v-if="!auth"><router-link to="/login">Login</router-link></li>
                <li v-if="!auth"><router-link to="/register">Register</router-link></li>

                <li v-if="auth" class="has-children">
                    <a href="#0" title="">Manage</a>
                    <ul class="sub-menu">
                        <li><router-link to="/create">Create Post</router-link></li>
                        <li><router-link to="/login">Manage</router-link></li>
                    </ul>
                </li>

                <li v-if="auth"><router-link to="/profile">Profile</router-link></li>
                <li v-if="auth"><router-link to="/" @click="logout">Logout</router-link></li>
            </ul> <!-- end header__nav -->

            <ul class="header__social">
                <li class="ss-facebook">
                    <a href="https://facebook.com/">
                        <span class="screen-reader-text">Facebook</span>
                    </a>
                </li>
                <li class="ss-twitter">
                    <a href="#0">
                        <span class="screen-reader-text">Twitter</span>
                    </a>
                </li>
                <li class="ss-dribbble">
                    <a href="#0">
                        <span class="screen-reader-text">Dribbble</span>
                    </a>
                </li>
                <li class="ss-pinterest">
                    <a href="#0">
                        <span class="screen-reader-text">Behance</span>
                    </a>
                </li>
            </ul>

        </nav> <!-- end header__nav-wrap -->

    </header> <!-- end s-header -->
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'Header',
    data() {
        return {
            categories: []
        }
    },
    created() {
        axios.get('https://localhost:7185/api/Category')
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', './js/main.js')
        document.head.appendChild(recaptchaScript)
    },
    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated)
        const logout = async () => {
            sessionStorage.removeItem("JWT");
            store.dispatch('setAuth', false);
        }
        return {
            auth,
            logout
        }
    }
}
</script>


<style></style>