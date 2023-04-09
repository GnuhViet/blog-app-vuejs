<template>
  <div id="main_content" class="s-content content">
    <main class="row content__page">

      <article class="column large-full entry format-standard">
        <div class="media-wrap entry__media">
          <div class="entry__post-thumb">
            <img :src="article.thumbnail"
              sizes="(max-width: 2000px) 100vw, 2000px" alt="">
          </div>
        </div>

        <div class="content__page-header entry__header">
          <h1 class="display-1 entry__title">
            {{ article.title }}
          </h1>
          <ul class="entry__header-meta">
            <li class="author">By <a href="#0">Jonathan Doe</a></li>
            <li class="date">{{ article.createDate }}</li>
            <li class="cat-links">
              <a href="#0">Marketing</a><a href="#0">Management</a>
            </li>
          </ul>
        </div>
        <div class="entry__content" v-html="article.content"></div>
      </article>

      <div class="comments-wrap">

        <div id="comments" class="column large-12">

          <h3 class="h2">5 Comments</h3>

          <!-- START commentlist -->
          <ol class="commentlist">

            <li class="depth-1 comment">

              <div class="comment__avatar">
                <img class="avatar" src="images/avatars/user-01.jpg" alt="" width="50" height="50">
              </div>

              <div class="comment__content">

                <div class="comment__info">
                  <div class="comment__author">Itachi Uchiha</div>

                  <div class="comment__meta">
                    <div class="comment__time">April 30, 2019</div>

                  </div>
                </div>

                <div class="comment__text">
                  <p>Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum
                    vulputate,
                    facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua
                    praesent.</p>
                </div>

              </div>

            </li>
          </ol>
          <!-- END commentlist -->

        </div> <!-- end comments -->

        <div class="column large-12 comment-respond">

          <!-- START respond -->
          <div id="respond">

            <h3 class="h2">Add Comment <span>Your email address will not be published</span></h3>

            <form name="contactForm" id="contactForm" method="post" action="" autocomplete="off">
              <fieldset>

                <div class="message form-field">
                  <textarea name="cMessage" id="cMessage" class="full-width" placeholder="Your Message"></textarea>
                </div>

                <input name="submit" id="submit" class="btn btn--primary btn-wide btn--large full-width"
                  value="Add Comment" type="submit">

              </fieldset>
            </form> <!-- end form -->

          </div>
          <!-- END respond-->

        </div> <!-- end comment-respond -->

      </div> <!-- end comments-wrap -->
    </main>

  </div> <!-- end s-content -->
</template>

<script>
import axios from 'axios';
import { useStore } from "vuex";

export default {
  name: "ArticleDetails",
  data() {
    return {
      article: {},
    };
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

    const articleId = this.$route.params.id;
    axios.get(`https://localhost:7185/api/Article/${articleId}`)
      .then(response => {
        this.article = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<style>
#main_content {
  padding-left: 110px !important;
}
</style>