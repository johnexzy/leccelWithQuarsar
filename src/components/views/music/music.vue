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
          <p class="font-weight-bold" style="text-align: center">
            {{ musicObj.music_name }}
          </p>
        </div>
        <q-card-section class="card-body">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-6 col-sm-6">
              <div class="row">
                <div class="col-12 col-lg-12 q-mb-auto mb-sm-2">
                  <carousel-img :images="musicObj.images" />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-sm-6">
              <b>Download {{ musicObj.music_name }} MP3</b>
              <q-separator />

              <q-btn
                type="a"
                v-for="(f, i) in musicObj.audio"
                :key="i"
                :href="f.song_url | formatSrc"
                target="_blank"
                no-caps
                flat
                :label="
                  `Download MP3 (` +
                  ((Number(f.song_bytes) / (1024 * 1024)).toFixed(2) + `) mb`)
                "
              >
                <template>
                  <q-icon size="14px" class="q-ml-xs" name="open_in_new" />
                </template>
              </q-btn>
            </div>
          </div>
          <hr />
          <div class="row q-mt-md">
            <div class="col-sm-12">
              <div class="row justify-content-center justify-center align-items-center">
                <aplayer
                  :music="{
                    title: musicObj.music_name,
                    artist: musicObj.artist,
                    src: meta.audio,
                    pic: meta.image,
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
              <hr />
              <share :phead="musicObj.music_name" :pbody="musicObj.music_details" />

              <hr />
            </div>
          </div>
          <div v-if="rmusicCount > 0" class="row d-block q-my-lg mb-4 mt-4 text-center">
            <h3>You may also like:</h3>
          </div>
          <div class="row show-music">
            <router-link
              v-for="(rmusic, i) in relatedmusicArr"
              :key="i"
              :to="{ name: 'Music', params: { short_url: rmusic.short_url } }"
              class="col-12 col-lg-3 col-md-3 grid-margin stretch-card"
              tag="div"
            >
              <q-card class="card card-rounded shadow music">
                <div class="card-img-holder">
                  <img :src="rmusic.images[0]" alt="" class="card-img" />
                </div>

                <q-card-section class="card-body p-2" style="background: #eee">
                  <h3 class="font-weight-200 mb-2" style="color: #561529">
                    (Download) - {{ rmusic.music_name }}
                  </h3>
                </q-card-section>
              </q-card>
            </router-link>
          </div>

          <div class="q-mt-md" />

          <comment :comment-key="musicObj.music_key" :comments="musicObj.comments" />
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
