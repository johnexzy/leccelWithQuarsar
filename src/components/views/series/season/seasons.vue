<template>
  <div class="content-wrapper">
    <div class="container">
      <div v-show="!state">
        <div class="d-flex justify-content-center">
          <img
            src="~/assets/images/loader.gif"
            alt="" >
        </div>
      </div>
      <div
        v-show="state"
        class="card card-square">
        <!-- {{ seasonObj.series_name }} -->
        <div class="card-header">
          <p
            class="font-weight-bold"
            style="text-align: center">
            {{ seasonObj.series_name }} - {{ seasonObj.season_name }}
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <b
              >Download {{ seasonObj.series_name }}:
                {{ seasonObj.season_name }}</b
                >

              <hr >
              <router-link
                v-for="(ep, i) in seasonObj.episodes"
                :key="i"
                :to="{
                  name: 'Episode',
                  params: {
                    series_name: seasonObj.series_name,
                    episode_short_url: ep.short_url,
                  },
                }"
                tag="div"
              >
                <div
                  class="d-flex justify-content-start border-bottom py-3 shadow"
                  style="cursor: pointer"
                >
                  <h4 class="d-inline ml-1 font-weight-bold text-primary">
                    {{ ep.ep_name }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <hr >
              <share
                :phead="seasonObj.series_name"
                :pbody="seasonObj.season_name"
              />
              <hr >
            </div>
          </div>
          <div class="mt-3" />

          <comment
            :comment-key="seasonObj.season_key"
            :comments="seasonObj.comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import timeago from "timeago-simple";
export default {
  name: "ViewSeasons",
  filters: {
    formatSrc(link) {
      return `https://app.leccel.net/${link}`;
    },
  },
  data() {
    return {
      seasonObj: {},
      state: false,
    };
  },
  watch: {
    $route() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.state = false;
      this.$api
        .get(
          `/api/v1/season/${this.$route.params.series_name}/${this.$route.params.season_short_url}`
        )
        .then((res) => {
          this.seasonObj = res.data;
          this.seasonObj.episodes = this.seasonObj.episodes.map((x) => ({
            ep_name: `Episode ${x.ep_name.charAt(3)}`,
            ep_key: x.ep_key,
            ep_details: x.ep_details,
            season_key: x.season_key,
            short_url: x.short_url,
          }));
          this.seasonObj.comments = this.seasonObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));
          this.state = true;
        });
    },
  },
  metaInfo: {
    title: `Leccel::${window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    )}`,
  },
};
</script>
