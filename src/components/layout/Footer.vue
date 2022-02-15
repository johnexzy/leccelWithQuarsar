<template>
  <footer>
    <div class="footer-bottom">
      <div class="container-m">
        <div class="row q-pa-md">
          <div class="col-sm-12">
            <img src="~/assets/images/LECCEL1.png" alt="Leccel" />
            <div class="col-12">
              <div class="row justify-content-center justify-center">
                <p class="text-weight-bold">Contact Us</p>
              </div>
              <div class="row justify-content-center justify-center">
                <q-btn
                  color="green"
                  class="q-ma-sm"
                  icon="mdi-whatsapp"
                  round
                  target="_blank"
                  href="https://api.whatsapp.com/send?phone=+2348167811473"
                />
                <q-btn
                  color="blue"
                  class="q-ma-sm"
                  icon="mdi-twitter"
                  round
                  target="_blank"
                  href="https://twitter.com/leccelj"
                />
                <q-btn
                  color="grey"
                  class="q-ma-sm"
                  icon="mdi-email-send"
                  round
                  target="_blank"
                  href="mailto:leccelj@gmail.com"
                />
              </div>
            </div>
            <div class="row justify-between">
              <div class="fs-14 font-weight-600">
                © 2020 @
                <a
                  href="https://www.leccel.net"
                  target="_blank"
                  class="text-white"
                >Leccel.net</a>. All
                rights reserved.
              </div>

              <div class="fs-14 font-weight-600">
                Developed by
                <a
                  href="https://twitter.com/@johnoba17"
                  target="_blank"
                  class="text-white"
                >Johnexzy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer"
}
</script>
