<template>
  <div class="content-wrapper">

    <div class="container">
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
        <!-- {{ musicObj.music_name }} -->
        <div class="card-header">
          <p
            class="font-weight-bold"
            style="text-align: center">
            {{ musicObj.music_name }}
          </p>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">
              <div class="row">
                <div class="col-lg-12 mb-5 mb-sm-2">
                  <carousel-img :images="musicObj.images"/>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <b>Download {{ musicObj.music_name }} MP3</b>
              <hr >
              <p style="line-height: 2.5">{{ musicObj.music_details }}</p>
              <a
                v-for="(f, i) in musicObj.audio"
                :key="i"
                :href="f.song_url | formatSrc"
                class="btn btn-primary btn-lg btn-block"
                download
              >
                Download MP3 ({{
                  (Number(f.song_bytes) / (1024 * 1024)).toFixed(
                    2
                  )
                }}mb)
              </a>
            </div>
          </div>
          <hr>
          <div class="row mt-3 ">
            <div class="col-sm-12">
              <div class="d-flex justify-content-center align-items-center">
                <aplayer

                  :music="{
                    title: musicObj.music_name,
                    artist: musicObj.artist,
                    src: meta.audio,
                    pic: meta.image
                  }"
                  autoplay
                />
              </div>

            </div>
          </div>
          <!-- <div class="row">
          <p class="m-4 d-block">PLAY ONLINE?</p>
          <div class="embed-responsive">
            <audio
              class="d-block"
              :src="musicObj.audio[0].song_url | formatSrc"
              style="
                margin: 5px;
                display: inline;
                border: 1px solid;
                background: #f1f3f4;
                height: 33px;
              "
              controls
            />
          </div>
        </div> -->
          <div class="row">
            <div class="col-sm-12">
              <hr >
              <share
                :phead="musicObj.music_name"
                :pbody="musicObj.music_details"
              />

              <hr >
            </div>
          </div>
          <div
            v-if="rmusicCount > 0"
            class="d-block mb-4 mt-4 text-center">
            <h3>You may also like:</h3>
          </div>
          <div class="row show-music">
            <router-link
              v-for="(rmusic, i) in relatedmusicArr"
              :key="i"
              :to="{ name: 'Music', params: { short_url: rmusic.short_url}}"
              class="col-md-3 grid-margin stretch-card"
              tag="div"
            >
              <div class="card card-rounded shadow music">
                <div class="card-img-holder">
                  <img
                    :src="rmusic.images[0]"
                    alt=""
                    class="card-img" >
                </div>

                <div
                  class="card-body p-2"
                  style="background: #eee">
                  <h3
                    class="font-weight-200 mb-2"
                    style="color: #561529">
                    (Download) - {{ rmusic.music_name }}
                  </h3>
                </div>
              </div>
            </router-link>
          </div>

          <div class="mt-3"/>

          <comment
            :comment-key="musicObj.music_key"
            :comments="musicObj.comments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import timeago from "timeago-simple";
import aplayer from "vue-aplayer"
export default {
  name: "ViewMusic",
  filters: {
    formatSrc(link) {
      return `https://app.leccel.net/${link}`;
    },
  },
  components:{
    aplayer
  },
  data() {
    return {
      musicObj: {},
      relatedmusicArr: [],
      rmusicCount: 0,
      state: false,
      currentURL: null,
      meta: {
        title: undefined,
        description: undefined,
        image: "https://app.leccel.net/uploads/images/20201115134501455222978.jpg",
        audio: null
      }
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
      this.currentURL = window.location.href;

      this.$api
        .get(`/api/v1/music/url/${this.$route.params.short_url}`)
        .then((res) => {
          this.musicObj = res.data;
          this.meta.image = `https://app.leccel.net/${this.musicObj.images[0]}`
          this.meta.audio = `https://app.leccel.net/${this.musicObj.audio[0].song_url}`
          this.meta.title = this.musicObj.music_name;
          this.meta.description = this.musicObj.music_details;
          this.musicObj.comments = this.musicObj.comments.map((x) => ({
            name: x.name,
            comment: x.comment,
            updated_at: timeago.simple(x.updated_at),
          }));

          //related music Obj fires when {this.musicObj} is updated
          this.$api
            .get(`/api/v1/search/${this.musicObj.artist}`)
            .then((resp) => {
              //removes the current music from relatedmusicArray
              this.relatedmusicArr = resp.data.data[0].data.map(m=>({
                ...m,
                images: m.images.map(x => `https://app.leccel.net/${x}`),
              })).filter((val, i) => val.id !== this.musicObj.id && i < 8);
              this.rmusicCount = this.relatedmusicArr.length
            });
            this.state = true
        });
    },
  },
  metaInfo() {
    // title: `Leccel::${window.location.href.substr(
    //   window.location.href.lastIndexOf("/") + 1
    // )}`,
    return {
      title: this.meta.title,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.meta.description,
        },
        {
          property: "og:title",
          content: this.meta.title,
        },
        { property: "og:site_name", content: "Leccel" },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: window.location.href,
        },
        {
          property: "og:image",
          content: this.meta.image,
        },
        {
          property: "og:description",
          content: this.meta.description,
        },

        // Twitter card
        { name: "twitter:card", content: "summary" },
        {
          name: "twitter:site",
          content: "@leccelj",
        },
        {
          name: "twitter:title",
          content: this.meta.title,
        },
        {
          name: "twitter:description",
          content: this.meta.description,
        },
        { name: "twitter:creator", content: "@leccelj" },
        {
          name: "twitter:image",
          content: this.meta.image,
        },

        // Google / Schema.org markup:
        {
          itemprop: "name",
          content: this.meta.title,
        },
        { itemprop: "description", content: this.meta.description },
        {
          itemprop: "image",
          content: this.meta.image,
        },
      ],
      link: [{ rel: "canonical", href: this.currentURL }],
    }
  },
};
</script>
