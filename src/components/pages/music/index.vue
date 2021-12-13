<template>
  <div class="content-wrapper">
    <div class="container-m">
      <div class="col-sm-12">
        <q-card class="card card-square grid-margin">
          <div class="card-header">
            <h3 class="font-weight-600 mb-4 text-center">
              Search Music by name or artist
            </h3>
          </div>
          <q-card-section class="">
            <ValidationObserver v-slot="{ passes }">
              <form @submit.prevent="passes(changeRoute)">
                <div class="form-group" data-aos="fade-down">
                  <ValidationProvider v-slot="{ errors }" name="search" rules="maxlength">
                    <q-input
                      square
                      outlined
                      v-model="query"
                      class="searchInput shadow-2 fs-16"
                      label="Search Music"
                    />
                    <div
                      v-for="(datum, i) in errors"
                      :key="i"
                      class="alert alert-danger mr-3 fs-12 p-0"
                    >
                      <i>{{ datum }}</i>
                    </div>
                  </ValidationProvider>
                  <div class="mt-3" />
                </div>
                <div class="border-bottom shadow" />
                <div class="row justify-center align-content-center q-mt-md">
                  <q-btn icon="search" color="primary" type="submit"> Search </q-btn>
                </div>
              </form>
            </ValidationObserver>
          </q-card-section>
        </q-card>
        <div class="row" data-aos="fade-up">
          <div class="col-sm-12 grid-margin">
            <q-card class="card card-square">
              <div class="card-header">
                <div class="row">
                  <div class="col-sm-12">
                    <h3 class="font-weight-600 mb-4 text-center">Trending Music 💹💹</h3>
                  </div>
                </div>
              </div>
              <q-card-section class="card-body">
                <router-link
                  v-for="(lmusic, i) in PopularMusic"
                  :key="i"
                  tag="div"
                  :to="{ name: 'Music', params: { short_url: lmusic.short_url } }"
                  class="fit row inline justify-start items-stretch content-start shadow-4 cursor-pointer"
                >
                  <!-- <i class="mdi mdi-star-circle text-danger"/> -->

                  <q-img
                    :src="lmusic.images[0]"
                    style="width: 60px; height: 60px"
                    alt=""
                  />
                  <div
                    class="col self-center wrap q-ml-sm text-weight-bold text-black-50"
                  >
                    (MP3) - Download {{ lmusic.music_name }}
                    <!-- wifu fweibivi woiv wvowieb vwibvwveowv woievbwv iobio -->
                  </div>
                </router-link>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row" data-aos="fade-up">
          <div class="col-sm-12 grid-margin">
            <q-card class="card card-square">
              <div class="card-header">
                <div class="row">
                  <div class="col-sm-12">
                    <h3 class="font-weight-600 mb-4 text-center">All Music</h3>
                  </div>
                </div>
              </div>
              <q-card-section>
                <div class="row show-music">
                  <!-- <div class="col-xl-12"> -->
                  <!-- <div class="row show-music"> -->
                  <div v-show="loading" class="album-loader">
                    <div class="row justify-content-center justify-center">
                      <img src="~/assets/images/loader.gif" alt="" />
                    </div>
                  </div>
                  <router-link
                    v-for="(music, i) in AllMusic"
                    :key="i"
                    :to="{ name: 'Music', params: { short_url: music.short_url } }"
                    tag="div"
                    style="cursor: pointer"
                    class="col-md-3 grid-margin q-pa-sm stretch-card"
                  >
                    <q-card class="music">
                      <div class="card-img-holder">
                        <q-img class="col-3" :src="music.images[0]" alt="" />
                      </div>

                      <q-card-section class="">
                        <h4 class="q-mb-sm wrap" style="color: #561529">
                          (Download MP3) - {{ music.music_name }}
                        </h4>
                        <div class="row justify-between">
                          <p class="d-inline L5 mb-0">
                            <i class="mdi mdi-artist" />
                            <router-link
                              :to="`/search/music/${music.artist}`"
                              style="text-decoration: none"
                              class="fs-15 text-muted text-decoration-none"
                            >
                              {{ music.artist }}
                            </router-link>
                          </p>
                          <p class="d-inline mb-0">
                            <i class="mdi mdi-comment" />({{ music.comments.length }})
                          </p>
                        </div>
                      </q-card-section>
                    </q-card>
                  </router-link>
                  <!-- </div> -->
                  <!-- </div> -->
                </div>
              </q-card-section>
              <!-- <nav
                class="nav d-flex align-items-center justify-content-center"
                aria-label="Album-pager"
              >
                <ul class="pagination">
                  <li class="page-item prev" @click="makeReq('- 1')">
                    <input id="pagelink" value="" type="hidden" />
                    <a class="page-link">
                      <i class="mdi mdi-arrow-left-bold" />
                    </a>
                  </li>

                  <li class="page-item next" @click="makeReq('+ 1')">
                    <input id="pagelink" value="" type="hidden" />
                    <a class="page-link">
                      <i class="mdi mdi-arrow-right-bold" />
                    </a>
                  </li>
                </ul>
              </nav> -->
              <!-- <div class="d-flex align-items-center justify-content-center pad2x">
                <p class="pager">Page {{ current_page }} of {{ total_pages }}</p>
              </div>
              <q-pagination v-model="current_page" :max="AllMusicMeta.total_pages">
              </q-pagination> -->
              <div class="q-pa-lg flex flex-center">
                <q-pagination v-model="current_page" :max="AllMusicMeta.total_pages" input />
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
extend("maxlength", {
  validate: (v) => v.length > 3,
  message: "search value too small",
});
export default {
  name: "Allmusic",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loading: true,
      musicArr: [],
      current_page: 1,
      total_pages: 100,
      isLastPage: false,
      query: "",
    };
  },
  computed: {
    ...mapGetters("leccel", ["PopularMusic", "AllMusic", "AllMusicMeta"]),
  },
  // beforeMount() {
  //   this.makeReq("+ 1");
  // },
  beforeMount() {
    this.loading = true;
    this.getMusicByPage(this.current_page).then(() => {
      this.current_page = this.AllMusicMeta.current_page;
      this.loading = false;
    });
  },
  watch: {
    current_page: {
      handler(val) {
        this.loading === true;
        this.getMusicByPage(val).then(() => {
          this.current_page = this.AllMusicMeta.current_page;

          this.loading = false;
        });
      },
    },
  },
  methods: {
    ...mapActions("leccel", ["getMusicByPage"]),
    // makeReq(param) {
    //   if (this.isLastPage && param == "+ 1") return;
    //   this.loading === true;
    //   this.$api
    //     .get(`/api/v1/music/pages/${eval(`${this.current_page}${param}`)}`)
    //     .then((res) => {
    //       this.musicArr = res.data.data.map((m) => ({
    //         ...m,
    //         images: m.images.map((x) => `https://app.leccel.net/${x}`),
    //       }));
    //       this.total_pages = res.data.meta.total_pages;
    //       this.current_page = res.data.meta.current_page;
    //       this.isLastPage = this.current_page === this.total_pages ? true : false;
    //       this.loading = false;
    //     });
    // },
    changeRoute() {
      this.$router.push(`/search/music/${encodeURI(this.query)}`);
    },
    formatDate(c) {
      let ss = new Date(Date.parse(c));
      return ss.toLocaleDateString();
    },
  },
    meta() {
    const image = "../../../assets/images/LECCEL1.png";
    const title = "Discover latest and trending Musicon Leccel.net";
    const description = "Search Music by title or artist. stream online or download for free";

    return {
      // Title tag
      title: title,

      // meta tags
      meta: {
        description: {
          name: "description",
          content: description,
        },

        // Open Graph Tags
        ogTitle: {
          name: "og:title",
          content: title,
        },
        ogDescription: {
          name: "og:description",
          content: description,
        },
        ogURL: {
          property: "og:url",
          content: window.location.href,
        },
        ogImage: {
          property: "og:image",
          content: image,
        },
        twitterCard: { name: "twitter:card", content: "summary" },
        twitterTitle: {
          name: "twitter:title",
          content: title,
        },
        twitterImage: {
          name: "twitter:image",
          content: image,
        },

        // Google / Schema.org markup:
        schemaName: {
          itemprop: "name",
          content: title,
        },
        schemaDesc: {
          itemprop: "description",
          content: description,
        },
        schemaImage: {
          itemprop: "image",
          content: image,
        },
      },
    };
  },
};
</script>
