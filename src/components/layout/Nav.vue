<template>
  <div class="flash-news-banner" style="background: #ffffff">
    <div class="fit row justify-between items-end content-start">
      <div>
        <router-link :to="{ name: 'home' }">
          <img src="~/assets/images/LECCEL3.png" alt="" />
        </router-link>
      </div>
      <div class="q-my-sm">
        <q-input
          color="primary"
          class="nav-search"
          rounded
          dense
          outlined
          v-model="query"
          @keydown.enter="changeRoute()"
          label="Search music"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- <div>
        <router-link :to="{ name: 'home' }">
          <img src="~/assets/images/LECCEL3.png" alt="" />
        </router-link>
      </div> -->
      <!-- <form @submit="changeRoute()"> -->
      <!-- <ValidationObserver v-slot="{ passes }">
        <form @submit.prevent="passes(changeRoute)">
          <div class="form-group">
            <ValidationProvider v-slot="{ errors }" name="search" rules="maxlength">
              <div class="input-group">
                <input
                  v-model="query"
                  type="text"
                  class="form-control searchInput border-info shadow-inset"
                  style="border-radius: 20px; height: 40px"
                  placeholder="Search here"
                />

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
      </ValidationObserver> -->
    </div>
    <div :class="`row text-center  menu-bottom ${sticky ? 'sticky' : ''}`">
      <div class="fit row justify-center items-end content-start">
        <ul class="row q-ma-none" style="margin-left: -25px">
          <li class="q-pt-sm q-mr-sm shadow-10">
            <router-link :to="{ name: 'home' }">
              <q-icon name="home" size="md" />
              <!-- <p class="font-weight-bold text-uppercase">Home</p> -->
            </router-link>
          </li>
          <li class="q-pt-sm q-mx-sm shadow-10" >
            <router-link :to="{ name: 'AllMusic' }">
              <q-icon name="audiotrack" size="md" />
              <!-- <p class="text-uppercase">Music</p> -->
            </router-link>
          </li>
          <li class="q-pt-sm q-mx-sm shadow-10">
            <router-link :to="{ name: 'blog' }">
              <q-icon name="rss_feed" size="md" />
              <!-- <p class="font-weight-bold text-uppercase">News</p> -->
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
// extend("maxlength", {
//   validate: (v) => v.length > 3,
//   message: "search value too small",
// });
export default {
  name: "NavBar",
  components: {
    // ValidationProvider,
    // ValidationObserver,
  },
  data() {
    return {
      query: "",
      sticky: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.addSticky);
  },
  methods: {
    changeRoute() {
      if(this.query.length > 2)
        this.$router.push(`/search/music/${encodeURI(this.query)}`);
    },
    addSticky() {
      this.sticky = window.pageYOffset > 130;
    },
  },
};
</script>
<style scoped>
li {
  width: 50px;
  height: 50px;
  border-radius: 5px
}
</style>
