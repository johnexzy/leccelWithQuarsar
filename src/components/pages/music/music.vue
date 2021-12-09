<template>
  <div class="row">
    <div class="col-lg-4 grid-margin stretch-card">
      <div 
        class="card shadow-lg" 
        style="border-radius: 0">
        <div class="card-header font-weight-bold">
          <i class="mdi mdi-trending-up"/> Trending Music
        </div>
        <div class="card-body">
          <router-link
            v-for="(pmusic, i) in popularMusic"
            :key="i"
            :to="{ name: 'Music', params: { short_url: pmusic.short_url}}"
            class="h3 font-weight-200 mb-1"
            style="text-decoration: none; color: inherit"
          >
            <div
              class="d-flex justify-content-start border-bottom mt-2 mb-2 shadow"
              style="cursor: pointer"
            >
              <!-- <i class="mdi mdi-star-circle text-danger"/> -->
              <h4 class="d-inline font-weight-200 mb-0">
                <img
                  :src="pmusic.images[0]"
                  style="width: 60px; height: 60px"
                  alt=""
                  class="card-img d-inline"
                >
              </h4>
              <p class="d-inline ml-1 font-weight-bold text-primary">
                {{ pmusic.music_name }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div 
      class="col-lg-8 grid-margin" 
      data-aos="fade-down">
      <div class="card card-square">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <div class="card-title">Download Latest Music</div>
            <a
              class="mb-2 btn btn-outline-light btn-primary btn-info"
              style="font-size: 16px"
              href="pages/music.html"
            >
              Go to Music <b class="mdi">&RightArrow;</b>
            </a>
          </div>
        </div>
        <div class="card-body">
          <router-link
            v-for="(lmusic, i) in latestMusic"
            :key="i"
            :to="{ name: 'Music', params: { short_url: lmusic.short_url}}"
            class="h3 font-weight-200 mb-1"
            style="text-decoration: none; color: inherit"
          >
            <div
              class="d-flex justify-content-start border-bottom mt-2 mb-2 shadow"
              style="cursor: pointer"
            >
              <h4 class="d-inline font-weight-200 mb-0">
                <img
                  :src="lmusic.images[0]"
                  style="width: 60px; height: 60px"
                  alt=""
                  class="card-img d-inline"
                >
              </h4>
              <h4 class="d-inline ml-1 font-weight-bold text-primary">
                (MP3) - {{ lmusic.music_name }}
              </h4>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicIndex",
  props: {
    latestMusic: {
      required: true,
      type: Array,
    },
    popularMusic: {
      required: true,
      type: Array,
    },
  },
};
</script>