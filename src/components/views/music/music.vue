<template>
  <div class="content-wrapper">
    <div class="container-m">
      <div v-show="!state">
        <div class="row justify-center justify-content-center">
          <img src="~/assets/images/loader.gif" alt="" />
        </div>
      </div>
      <q-card v-show="state" square class="card">
        <!-- {{ musicObj.music_name }} -->
        <div class="card-header">
          <p class="text-h2" style="text-align: center">
            {{ musicObj.music_name }}
          </p>
        </div>
        <q-card-section class="">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 col-sm-12">
              <div class="row">
                <div class="col-12 col-lg-12 q-mb-auto mb-sm-2">
                  <carousel-img class="q-pa-md" :images="musicObj.images" />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-12">
              <b class="q-py-md h1">Download {{ musicObj.music_name }} MP3</b>
              <q-separator />
              <p class="q-py-md text-subtitle1">{{ musicObj.music_details }}</p>
              <q-btn
                type="a"
                v-for="(f, i) in musicObj.audio"
                :key="i"
                :href="f.song_url | formatSrc"
                target="_blank"
                no-caps
                size="lg"
                color="primary"
                :label="
                  `Download MP3 (` +
                  ((Number(f.song_bytes) / (1024 * 1024)).toFixed(2) + `) mb`)
                "
              >
                <template>
                  <q-icon size="md" class="q-ml-xs" name="download" />
                </template>
              </q-btn>
            </div>
          </div>
          <hr />
          <div class="row justify-center justify-content-center q-my-lg">
            <div class="col-12 col-md-12 col-sm-10">

                <aplayer
                  :music="{
                    title: musicObj.music_name,
                    artist: musicObj.artist,
                    src: meta.audio,
                    pic: meta.image,
                  }"
                  repeat="music"
                  theme="pic"
                  autoplay
                />
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
          <div class="row justify-content-center justify-center align-items-center">
            <share :phead="musicObj.music_name" :pbody="musicObj.music_details" />
          </div>
          <div v-if="rmusicCount > 0" class="row d-block q-my-lg mb-4 mt-4 text-center">
            <h3>You may also like:</h3>
          </div>
          <div class="row show-music">
            <router-link
              v-for="(rmusic, i) in relatedmusicArr"
              :key="i"
              :to="{ name: 'Music', params: { short_url: rmusic.short_url } }"
              tag="div"
              style="cursor: pointer"
              class="col-12 col-sm-6 col-xs-12 col-lg-3 col-md-4 grid-margin q-pa-sm stretch-card"
            >
              <q-card class="music shadow-8" style="width: 100%; border-radius: 10px">
                <div class="card-img-holder">
                  <q-img
                    :src="rmusic.images[0]"
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

          <div class="q-mt-md" />

          <comment
            @addComments="addComments"
            :comment-key="musicObj.music_key"
            :comments="musicObj.comments"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import timeago from "timeago-simple";
import aplayer from "vue-aplayer";
export default {
  name: "ViewMusic",
  filters: {
    formatSrc(link) {
      return `https://app.leccel.net/${link}`;
    },
  },
  components: {
    aplayer,
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
        audio: null,
      },
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

      this.$api.get(`/api/v1/music/url/${this.$route.params.short_url}`).then((res) => {
        this.musicObj = res.data;
        this.meta.image = `https://app.leccel.net/${this.musicObj.images[0]}`;
        this.meta.audio = `https://app.leccel.net/${this.musicObj.audio[0].song_url}`;
        this.meta.title = this.musicObj.music_name;
        this.meta.description = this.musicObj.music_details;
        this.musicObj.comments = this.musicObj.comments.map((x) => ({
          name: x.name,
          comment: x.comment,
          updated_at: timeago.simple(x.updated_at),
        }));

        //related music Obj fires when {this.musicObj} is updated
        this.$api.get(`/api/v1/search/${this.musicObj.artist}`).then((resp) => {
          //removes the current music from relatedmusicArray
          this.relatedmusicArr = resp.data.data[0].data
            .map((m) => ({
              ...m,
              images: m.images.map((x) => `https://app.leccel.net/${x}`),
            }))
            .filter((val, i) => val.id !== this.musicObj.id && i < 8);
          this.rmusicCount = this.relatedmusicArr.length;
        });
        this.state = true;
      });
    },
    addComments(val) {
      this.musicObj.comments = val;
    },
  },
  meta() {
    const image = this.meta.image;
    const title = this.meta.title;
    const description = this.meta.description;

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
