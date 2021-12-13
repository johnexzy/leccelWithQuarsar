
<template>
  <div class="content-wrapper">

    <div class="container-m">
      <div
        v-show="!state">
        <div class="d-flex justify-content-center">
          <img
            src="~/assets/images/loader.gif"
            alt="" >
        </div>
      </div>
      <div
        v-show="state"
        class="card card-square">
        <!-- {{ episodeObj.video_name }} -->
        <div class="card-header">
          <p
            class="font-weight-bold"
            style="text-align: center">
            {{ episodeObj.series_name }}: Episode {{ episodeObj.ep_name.charAt(3) }}
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-lg-12 mb-5 mb-sm-2">
                  <carousel-img :images="episodeObj.images"/>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <b>Download Episode {{ episodeObj.ep_name.charAt(3) }}</b>
              <hr >
              <p style="line-height: 2.5">{{ episodeObj.ep_details }}</p>
              <hr >
              <a
                :href="episodeObj.videos[0].video_url | formatSrc"
                class="btn btn-primary btn-lg btn-block"
                download
              >
                Download MP4 ({{
                  (
                    Number(episodeObj.videos[0].video_bytes) /
                    (1024 * 1024)
                  ).toFixed(2)
                }}mb)
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <hr >
              <share
                :phead="episodeObj.ep_name"
                :pbody="episodeObj.ep_details"/>
              <hr >
            </div>
          </div>
          <div class="mt-3"/>

          <comment
            :comment-key="episodeObj.video_key"
            :comments="episodeObj.comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */


// eslint-disable-next-line no-unused-vars

import timeago from "timeago-simple";
export default {
  name: "ViewEpisodes",
  filters: {
    formatSrc(link) {
      return `https://app.leccel.net/${link}`;
    },
  },

  data() {
    return {
      episodeObj: {},
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
      this.state = false
      this.$api
        .get(
          `/api/v1/episode/${this.$route.params.series_name}/${this.$route.params.episode_short_url}`
        )
        .then((res) => {
          this.episodeObj = res.data;
          this.episodeObj.comments = this.episodeObj.comments.map((x) => ({
            ...x,
            updated_at: timeago.simple(x.updated_at),
          }));
          this.state = true
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
