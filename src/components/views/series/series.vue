<template>
  <div class="content-wrapper">
    <div class="container-m">
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
        <!-- {{ seriesObj.series_name }} -->
        <div class="card-header">
          <p
            class="font-weight-bold"
            style="text-align: center">
            {{ seriesObj.series_name }}
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-lg-12 mb-5 mb-sm-2">
                  <carousel-img :images="seriesObj.images" />
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <b>Download {{ seriesObj.series_name }}</b>
              <hr >
              <p style="line-height: 2.5">{{ seriesObj.series_details }}</p>
              <hr >
              <router-link
                v-for="(season, i) in seriesObj.series"
                :key="i"
                :to="{
                  name: 'Season',
                  params: {
                    series_name: seriesObj.series_name,
                    season_short_url: season.short_url,
                  },
                }"
                tag="div"
              >
                <div
                  class="d-flex justify-content-start border-bottom py-3 shadow"
                  style="cursor: pointer"
                >
                  <h4 class="d-inline ml-1 font-weight-bold text-primary">
                    {{ season.season_name }}
                  </h4>
                </div>
              </router-link>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <hr >
              <share
                :phead="seriesObj.series_name"
                :pbody="seriesObj.series_details"
              />

              <hr >
            </div>
          </div>
          <div
            v-if="PopularSeries.length > 0"
            class="d-block mb-4 mt-4 text-center"
          >
            <h3>You may also like:</h3>
          </div>
          <div class="row show-series">
            <router-link
              v-for="(rseries, i) in relatedseriesArr"
              :key="i"
              :to="{name: 'Series', params: {short_url: rseries.short_url}}"
              class="col-md-3 grid-margin stretch-card"
              tag="div"
            >
              <div class="card card-rounded shadow series">
                <div class="card-img-holder">
                  <img
                    :src="rseries.images[0]"
                    alt=""
                    class="card-img" >
                </div>

                <div
                  class="card-body p-2"
                  style="background: #eee">
                  <h3
                    class="font-weight-200 mb-2"
                    style="color: #561529">
                    (Download) - {{ rseries.series_name }}
                  </h3>
                </div>
              </div>
            </router-link>
          </div>
          <div class="mt-3" />

          <comment
            :comment-key="seriesObj.series_key"
            :comments="seriesObj.comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import timeago from "timeago-simple";
import { mapGetters } from "vuex";
export default {
  name: "ViewSeries",
  filters: {
    formatSrc(link) {
      return `https://app.leccel.net/${link}`;
    },
  },
  data() {
    return {
      seriesObj: {},
      relatedseriesArr: [],
      rseriesCount: 0,
      state: false,
    };
  },
  computed: {
    ...mapGetters('leccel', ["PopularSeries"]),
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
        .get(`/api/v1/series/url/${this.$route.params.short_url}`)
        .then((res) => {
          this.seriesObj = res.data;
          this.seriesObj.comments = this.seriesObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));

          //related series Obj fires when {this.seriesObj} is updated
          this.relatedseriesArr = this.PopularSeries.filter(
            (val) => val.id !== this.seriesObj.id
          );
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
