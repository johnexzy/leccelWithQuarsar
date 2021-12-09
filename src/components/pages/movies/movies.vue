<template>
  <div class="col-sm-12 grid-margin">
    <div class="card card-square">
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <p style="font-size: 17px; font-weight: bold">Movies</p>

          <router-link
            :to="{name:'AllMovies'}"
            class="mb-2 btn btn-outline-light btn-primary btn-info"
            style="font-size: 16px"
          >
            Go to Movies <b class="mdi">&RightArrow;</b>
          </router-link>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <!-- <?=$firstmovie?> -->
              <div
                v-for="(lmovie, i) in firstMoviesLayout"
                :key="i"
                class="col-sm-6 grid-margin"
              >
                <div class="position-relative">
                  <router-link
                    :to="{name:'Movie', params:{short_url:lmovie.short_url}}"
                    style="text-decoration: none; color: inherit"
                  >
                    <div class="rotate-img">
                      <img
                        :src="lmovie.images[0]"
                        alt="thumb"
                        style="border-radius: 10px"
                        class="img-fluid"
                      >
                    </div>
                  </router-link>
                  <div class="badge-positioned w-90">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span class="badge badge-danger font-weight-bold">{{
                        lmovie.category
                      }}</span>
                      <div class="video-icon">
                        <router-link
                          :to="{name:'Movie', params:{short_url:lmovie.short_url}}"
                          style="text-decoration: none; color: inherit"
                        ><i class="mdi mdi-play"/></router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end-firstMovie -->
            </div>
            <div class="row">
              <!-- <?=$secondMovie?> -->
              <div
                v-for="(lmovie, i) in secondMoviesLayout"
                :key="i"
                class="col-sm-6 grid-margin"
              >
                <div class="position-relative">
                  <router-link
                    :to="{name:'Movie', params:{short_url:lmovie.short_url}}"
                    style="text-decoration: none; color: inherit"
                  >
                    <div class="rotate-img">
                      <img
                        :src="lmovie.images[0]"
                        alt="thumb"
                        style="border-radius: 10px"
                        class="img-fluid"
                      >
                    </div>
                  </router-link>
                  <div class="badge-positioned w-90">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span class="badge badge-danger font-weight-bold">{{
                        lmovie.category
                      }}</span>
                      <div class="video-icon">
                        <router-link
                          :to="{name:'Movie', params:{short_url:lmovie.short_url}}"
                          style="text-decoration: none; color: inherit"
                        ><i class="mdi mdi-play"/></router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="d-flex justify-content-between align-items-center">
              <div class="card-title">More Videos</div>
              <router-link
                :to="{name:'AllMovies'}"
                class="mb-2 btn btn-outline-light btn-primary btn-info"
              >
                See All Movies
              </router-link>
            </div>
            <!-- All Movie -->
            <router-link
              v-for="(lmovie, i) in otherMovies"
              :key="i"
              :to="{name:'Movie', params:{short_url: lmovie.short_url}}"
              class="h3 font-weight-200 mb-1"
              style="text-decoration: none; color: inherit"
            >
              <div
                class="d-flex justify-content-start border-bottom mt-2 mb-2 shadow"
                style="cursor: pointer"
              >
                <h4 class="d-inline font-weight-200 mb-0">
                  <img
                    :src="lmovie.images[0]"
                    style="width: 60px; height: 60px"
                    alt=""
                    class="card-img d-inline"
                  >
                </h4>
                <h4 class="d-inline ml-1 font-weight-bold text-primary">
                  {{ lmovie.video_name }}
                </h4>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoviesIndex",
  props: {
    latestMovies: {
      type: Array,
      required: true,
    },
  },
  computed: {
    firstMoviesLayout() {
      return this.latestMovies.slice(0, 2) || this.latestMovies;
    },

    secondMoviesLayout() {
      return this.latestMovies.slice(2, 4) || [];
    },

    otherMovies() {
      return this.latestMovies.slice(4) || [];
    },
  },
};
</script>