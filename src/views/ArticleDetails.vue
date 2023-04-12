<template>
  <div id="main_content" class="s-content content">
    <main class="row content__page">
      <article class="column large-full entry format-standard">
        <div class="media-wrap entry__media">
          <div class="entry__post-thumb">
            <img :src="article.thumbnail" sizes="(max-width: 2000px) 100vw, 2000px" alt="" />
          </div>
        </div>

        <div class="content__page-header entry__header">
          <h1 class="display-1 entry__title">
            {{ article.title }}
          </h1>
          <ul class="entry__header-meta">
            <li class="author">
              By <a href="#0">{{ article.authorName }}</a>
            </li>
            <li class="date">{{ article.formattedCreateDate }}</li>
            <li class="cat-links">
              <a
                v-for="category in article.categories"
                :key="category.id"
                :href="'category.html?id=' + category.id"
                >{{ category.name }}</a
              >
            </li>
          </ul>
        </div>
        <div class="entry__content" v-html="article.content"></div>
      </article>

      <div class="column large-full entry format-standard comments-wrap">
        <div id="comments" class="column large-12">
          <h3 class="h2">5 Comments</h3>
          <!-- START commentlist -->
          <ol class="commentlist">
            <li v-for="comment in comments" :key="comment.id" class="depth-1 comment">
              <div class="comment__avatar">
                <img
                  class="avatar"
                  :src="
                    comment.authorAvatar
                      ? 'https://localhost:7185' + comment.authorAvatar
                      : imagePreview
                      ? imagePreview
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  "
                  alt=""
                  width="50"
                  height="50"
                />
              </div>
              <div class="comment__content">
                <div class="comment__info">
                  <div class="comment__author">{{ comment.authorFullName }}</div>
                  <div class="comment__meta">
                    <div class="comment__time">{{ comment.formattedCreateDate }}</div>
                  </div>
                </div>
                <div class="comment__text">
                  <p>{{ comment.content }}</p>
                </div>
              </div>
            </li>
          </ol>
          <!-- END commentlist -->
        </div>
        <!-- end comments -->

        <div class="column large-12 comment-respond">
          <!-- START respond -->
          <div id="respond">
            <form
              name="contactForm"
              id="contactForm"
              @submit.prevent="addComment"
              autocomplete="off"
            >
              <fieldset>
                <div class="message form-field">
                  <textarea
                    name="cMessage"
                    id="cMessage"
                    class="full-width"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <input
                  name="submit"
                  id="submit"
                  class="btn btn--primary btn-wide btn--large full-width"
                  value="Add Comment"
                  type="submit"
                />
              </fieldset>
            </form>
            <!-- end form -->
          </div>
          <!-- END respond-->
        </div>
        <!-- end comment-respond -->
      </div>
      <!-- end comments-wrap -->
    </main>
  </div>
  <!-- end s-content -->
</template>

<script lang="js">
import axios from 'axios';
import { useStore } from 'vuex';
import instance from '@/api/api';

export default {
  name: 'ArticleDetails',
  data() {
    return {
      article: {},
      comments: [],
    };
  },
  async mounted() {
    const store = useStore();
    let jwt = sessionStorage.getItem('JWT');
    if (jwt != null) {
      store.dispatch('setAuth', true);
    } else {
      //nếu chưa đăng nhập thì trả về trang login
      store.dispatch('setAuth', false);
    }

    try {
      const articleId = this.$route.params.id;

      const { data } = await instance(`/api/Article/${articleId}`);
      this.article = data;
    } catch (e) {
      throw e;
    }

    this.loadComments();
  },
  methods: {
    async loadComments() {
      try {
        const articleId = this.$route.params.id;

        const { data } = await instance(`api/Comment/${articleId}`);
        this.comments = data;
      } catch (e) {
        throw e;
      }
    },
    async addComment(event: any) {
      event.preventDefault();
      const articleId = this.$route.params.id;

      try {
        await instance({
          url: `https://localhost:7185/api/Comment/${articleId}`,
          method: 'POST',
        });

        this.loadComments();
      } catch (e) {
        throw e;
      }
    },
  },
};
</script>

<style>
#main_content {
  padding-left: 110px !important;
}
</style>
