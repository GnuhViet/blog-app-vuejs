<template>
    <h3 class="h2">Post New Article</h3>

    <form name="contactForm" id="contactForm" method="post" action="" autocomplete="off">
        <fieldset>

            <div class="form-field">
                <input name="cName" id="cName" class="full-width" placeholder="Your Name" value="" type="text">
            </div>

            <div class="form-field">
                <input name="cEmail" id="cEmail" class="full-width" placeholder="Your Email" value="" type="text">
            </div>

            <div class="form-field">
                <input name="cWebsite" id="cWebsite" class="full-width" placeholder="Website" value="" type="text">
            </div>

            <editor api-key="dbg7svsu8ovrt7sgcc1su1vw1rdya8ygm0ll3im2av4185gi" :init="{
                height,
                menubar,
                plugins: [
                    'advlist',
                    'autolink',
                    'link',
                    'image',
                    'lists',
                    'charmap',
                    'preview',
                    'anchor',
                    'pagebreak',
                    'searchreplace',
                    'wordcount',
                    'visualblocks',
                    'visualchars',
                    'code',
                    'insertdatetime',
                    'media',
                    'table',
                    'emoticons',
                ],
                toolbar:
                    'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image preview emoticons',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }" />

            <input name="submit" id="submit" class="btn btn--primary btn-wide btn--large full-width" value="Send Message"
                type="submit">

        </fieldset>
    </form> <!-- end form -->
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex';
import Editor from '@tinymce/tinymce-vue'
export default {
    name: 'CreateArticle',
    components: {
        'editor': Editor
    }
}
</script>