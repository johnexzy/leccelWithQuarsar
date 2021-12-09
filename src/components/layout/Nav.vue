<template>
  <div
    class="flash-news-banner"
    style="background: #ffffff; margin-top: -5px">
    <div class="d-flex justify-content-between mt-2">
      <router-link :to="{name:'home'}">
        <img
          src="~/assets/images/LECCEL3.png"
          alt="" >
      </router-link>
      <!-- <form @submit="changeRoute()"> -->
      <ValidationObserver v-slot="{ passes }">
        <form @submit.prevent="passes(changeRoute)">
          <div
            class="form-group"
            data-aos="fade-down">
            <ValidationProvider
              v-slot="{ errors }"
              name="search"
              rules="maxlength"
            >
              <div class="input-group">

                <input
                  v-model="query"
                  type="text"
                  class="form-control searchInput border-info shadow-inset"
                  style="border-radius: 20px; height: 40px"
                  placeholder="Search here"
                >

                <div class="input-group-append">
                  <button
                    class="btn btn-sm btn-info btn-icon-text searchButton text-center"
                    style="
                  border-radius: 0 20px 20px 0;
                  margin-left: -20px;
                  z-index: 1000;
                  max-width: 10%;
                "
                  >
                    <i class="mdi mdi-search-web" />
                  </button>
                </div>

              </div>
              <div
                v-for="(datum, i) in errors"
                :key="i"
                class="alert alert-danger mr-3 fs-12 p-0"
              >
                <i>{{ datum }}</i>
              </div>
            </ValidationProvider>
          </div>

        </form>
      </ValidationObserver>
    </div>
    <div
      :class="`d-block text-center border-top menu-bottom ${sticky ? 'sticky' : ''}`">
      <div class="d-flex justify-content-center">
        <ul
          class="d-flex flex-flow"
          style="margin-left: -30px">
          <li
            class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow"
            style="width: 62px; height: 62px"
          >
            <router-link
              :to="{name:'home'}"
              class="text-decoration-none">
              <i class="d-block mdi mdi-24px mdi-home" />
              <p class="font-weight-bold text-uppercase">Home</p>
            </router-link>
          </li>
          <li
            class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow"
            style="width: 62px; height: 62px"
          >
            <router-link
              :to="{name:'AllMusic'}"
              class="text-decoration-none">
              <i class="d-block mdi mdi-24px mdi-music-note" />
              <p class="font-weight-bold text-uppercase">Music</p>
            </router-link>
          </li>
          <li
            class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow"
            style="width: 62px; height: 62px"
          >
            <router-link
              :to="{name:'AllMovies'}"
              class="text-decoration-none">
              <i class="d-block mdi mdi-24px mdi-video" />
              <p class="font-weight-bold text-uppercase">Movies</p>
            </router-link>
          </li>
          <li
            class="d-inline pt-2 pl-2 pr-2 pb-0 ml-1 mb-1 mr-1 shadow"
            style="width: 62px; height: 62px"
          >
            <router-link
              :to="{name:'AllSeries'}"
              class="text-decoration-none">
              <i class="d-block mdi mdi-24px mdi-movie" />
              <p class="font-weight-bold text-uppercase">Series</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
extend("maxlength", {
  validate: v => v.length > 3,
  message: "search value too small"
})
export default {
  name: "NavBar",
  components:{
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      query: "",
      sticky: false
    };
  },
  mounted(){
    window.addEventListener('scroll', this.addSticky)
  },
  methods: {
    changeRoute() {
      this.$router.push(`/search/music/${encodeURI(this.query)}`)
    },
    addSticky(){
      this.sticky = window.pageYOffset > 130
    }
  },
};
</script>
