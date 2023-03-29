<template>
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

            <div class="message form-field">
                <textarea name="cMessage" id="cMessage" class="full-width" placeholder="Your Message"></textarea>
            </div>

            <input name="submit" id="submit" class="btn btn--primary btn-wide btn--large full-width" value="Send Message"
                type="submit">

        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'Login'
}
</script>


<style></style>