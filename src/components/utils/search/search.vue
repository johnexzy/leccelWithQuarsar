<template>
  <div class="content-wrapper">
    <div class="container-m">
      <div class="col-sm-12">
        <div class="q-mb-md text-light" style="font-size: 18px">
          <a
            href="/"
            class="q-mb-sm font-weight-bold pad2x text-decoration-none text-white"
            >Home</a
          >
          &RightArrow;
          <a
            href="#"
            class="q-mb-sm font-weight-bold pad2x text-decoration-none text-white"
            >results for ({{ query }})
          </a>
        </div>
      </div>
      <div v-show="!state">
        <div class="d-flex justify-content-center">
          <img src="~/assets/images/loader.gif" alt="" />
        </div>
      </div>

      <q-card class="q-pa-md">
        <div class="row show-music">
          <router-link
            v-for="(rmusic, i) in musicSearch"
            :key="i"
            :to="{ name: 'Music', params: { short_url: rmusic.short_url } }"
            tag="div"
            style="cursor: pointer"
            class="col-12 col-sm-6 col-xs-12 col-lg-3 col-md-4 grid-margin q-pa-sm stretch-card"
          >
            <q-card class="music shadow-5" style="width: 100%; border-radius: 10px">
              <div class="card-img-holder">
                <q-img
                  :src="rmusic.images[0] | formatSrc"
                  style="border-radius: 10px 10px 0 0"
                  alt=""
                />
              </div>

              <q-card-section class="">
                <h4 class="q-mb-sm wrap" style="color: #561529">
                  (Download MP3) - {{ rmusic.music_name }}
                </h4>
                <div class="row justify-between">
                  <p class="d-inline L5 mb-0">
                    <i class="mdi mdi-artist" />
                    <router-link
                      :to="`/search/music/${rmusic.artist}`"
                      style="text-decoration: none"
                      class="fs-15 text-muted text-decoration-none"
                    >
                      {{ rmusic.artist }}
                    </router-link>
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </router-link>
        </div>
      </q-card>
      <!-- <div class="card card-square">
            <div class="card-body dashboard-tabs p-0">
              <ul
                class="nav nav-tabs"
                role="tablist">
                <li class="nav-item">
                  <a
                    id="overview-tab"
                    :class="`nav-link ${checkGroup('music') ? 'active' : ''}`"
                    :aria-selected="checkGroup('music')"
                    data-toggle="tab"
                    href="#music"
                    role="tab"
                    aria-controls="music"
                  >🎧
                    <sup
                      style="color: #cc0303; font-weight: bolder"
                    >({{ musicSearch.length }})</sup
                  ></a
                  >
                </li>
                <li class="nav-item">
                  <a
                    id="sales-tab"
                    :class="`nav-link ${checkGroup('movies') ? 'active' : ''}`"
                    :aria-selected="checkGroup('movies')"
                    data-toggle="tab"
                    href="#movies"
                    role="tab"
                    aria-controls="movies"
                  >🎬
                    <sup
                      style="color: #cc0303; font-weight: bolder"
                    >({{ videoSearch.length }})</sup
                  ></a
                  >
                </li>
                <li class="nav-item">
                  <a
                    id="purchases-tab"
                    :class="`nav-link ${checkGroup('series') ? 'active' : ''}`"
                    :aria-selected="checkGroup('series')"
                    data-toggle="tab"
                    href="#series"
                    role="tab"
                    aria-controls="series"
                  >📺
                    <sup
                      style="color: #cc0303; font-weight: bolder"
                    >({{ seriesSearch.length }})</sup
                  ></a
                  >
                </li>
              </ul>
              <div class="tab-content py-3 px-5">
                <div
                  id="music"
                  :class="`tab-pane fade show ${
                    checkGroup('music') ? 'active' : ''
                  }`"
                  role="tabpanel"
                  aria-labelledby="music-tab"
                >
                  <router-link
                    v-for="(m, i) in musicSearch"
                    :key="i"
                    :to="{ name: 'Music', params: { short_url: m.short_url}}"
                    class="h3 font-weight-200 mb-1"
                    style="text-decoration: none; color: inherit"
                  >
                    <div
                      class="d-flex justify-content-start border-bottom q-mt-md mb-2 shadow"
                      style="cursor: pointer"
                    >
                      <h4 class="d-inline font-weight-200 mb-0">
                        <img
                          :src="m.images[0] | formatSrc"
                          style="width: 60px; height: 60px"
                          alt=""
                          class="card-img d-inline"
                        >
                      </h4>
                      <h4 class="d-inline ml-3 font-weight-bold text-primary">
                        {{ m.music_name }}
                        <p style="color: rgb(175 175 175 / 88%); font-size: 15px">
                          uploaded on {{ formatDate(m.created_at) }}
                        </p>
                      </h4>
                    </div>
                  </router-link>
                </div>
                <div
                  id="movies"
                  :class="`tab-pane fade show ${
                    checkGroup('movies') ? 'active' : ''
                  }`"
                  role="tabpanel"
                  aria-labelledby="movies-tab"
                >
                  <router-link
                    v-for="(v, i) in videoSearch"
                    :key="i"
                    :to="{name:'Movie', params:{short_url: v.short_url}}"
                    class="h3 font-weight-200 mb-1"
                    tag="div"
                  >
                    <div
                      class="d-flex justify-content-start border-bottom q-mt-md mb-2 shadow"
                      style="cursor: pointer"
                    >
                      <h4 class="d-inline font-weight-200 mb-0">
                        <img
                          :src="v.images[0] | formatSrc"
                          style="width: 60px; height: 60px"
                          alt=""
                          class="card-img d-inline"
                        >
                      </h4>
                      <h4 class="d-inline ml-3 font-weight-bold text-primary">
                        {{ v.video_name }}
                        <p style="color: rgb(175 175 175 / 88%); font-size: 15px">
                          uploaded on {{ formatDate(v.created_at) }}
                        </p>
                      </h4>
                    </div>
                  </router-link>
                </div>
                <div
                  id="series"
                  :class="`tab-pane fade show ${
                    checkGroup('series') ? 'active' : ''
                  }`"
                  role="tabpanel"
                  aria-labelledby="series-tab"
                >
                  <router-link
                    v-for="(s, i) in seriesSearch"
                    :key="i"
                    :to="{name:'Series', params: {short_url: s.short_url}}"
                    class="h3 font-weight-200 mb-1"
                    style="text-decoration: none; color: inherit"
                  >
                    <div
                      class="d-flex justify-content-start border-bottom q-mt-md mb-2 shadow"
                      style="cursor: pointer"
                    >
                      <h4 class="d-inline font-weight-200 mb-0">
                        <img
                          :src="s.images[0] | formatSrc"
                          style="width: 60px; height: 60px"
                          alt=""
                          class="card-img d-inline"
                        >
                      </h4>
                      <h4 class="d-inline ml-2 font-weight-bold text-primary">
                        {{ s.series_name }}
                        <p style="color: rgb(175 175 175 / 88%); font-size: 15px">
                          uploaded on {{ formatDate(s.created_at) }}
                        </p>
                      </h4>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div> -->
    </div>
  </div>
</template>

<script>
// import timeago from "timeago-simple";

export default {
  name: "Search",
  filters: {
    formatSrc(link) {
      return `https://app.leccel.net/${link}`;
    },
  },
  data() {
    return {
      group: this.$route.params.group,
      query: this.$route.params.query,
      search: [],
      state: false,
    };
  },
  computed: {
    seriesSearch() {
      return this.search.filter((s) => s.group === "series").map((x) => x.data)[0];
    },
    musicSearch() {
      return this.search.filter((s) => s.group === "music").map((x) => x.data)[0];
    },
    videoSearch() {
      return this.search.filter((s) => s.group === "movies").map((x) => x.data)[0];
    },
  },
  watch: {
    $route() {
      this.init();
      this.query = this.$route.params.query;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.state = false;
      this.$api.get(`/api/v1/search/${this.$route.params.query}`).then((res) => {
        // this.search = res.data.data.filter((s) => s.group === this.group);
        this.search = res.data.data;
        this.state = true;
      });
    },
    /**
     * @param {string} group
     */
    checkGroup(group) {
      return this.group == group;
    },
    formatDate(c) {
      let ss = new Date(Date.parse(c));
      return ss.toLocaleDateString();
    },
  },
  meta(){

  }
};
</script>
