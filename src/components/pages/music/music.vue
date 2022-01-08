<template>
  <div class="row">
    <div :class="`col-12 col-md-4 col-sm-12 col-lg-4 stretch-card grid-margin`">
      <q-card :class="`card ${$q.screen.lt.md ? '':'q-ma-md'}`" square>
        <div class="card-header text-weight-bold">
          <div class="card-title ">🚀 Trending Music</div>
        </div>
        <q-card-section class="card-body">

            <router-link
            v-for="(pmusic, i) in popularMusic"
            :key="i"
            tag="div"
            :to="{ name: 'Music', params: { short_url: pmusic.short_url } }"
              class="fit row inline justify-start items-stretch content-start shadow-4 cursor-pointer"

            >
              <!-- <i class="mdi mdi-star-circle text-danger"/> -->

                <q-img
                  :src="pmusic.images[0]"
                  style="width: 60px; height: 60px"
                  alt=""
                />
              <div class="col self-center wrap q-ml-sm text-weight-bold text-black">
                {{ pmusic.music_name }}
                <!-- wifu fweibivi woiv wvowieb vwibvwveowv woievbwv iobio -->
              </div>
            </router-link>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-md-8 col-lg-8 grid-margin" data-aos="fade-down">
      <q-card :class="`card ${$q.screen.lt.md ? '':'q-ma-md'}`"  square>
        <div class="card-header">
          <div class="row justify-between align-items-center">
            <div class="card-title">🕔 Latest Music</div>
            <q-btn
              color="primary"
              style="font-size: 16px"
              no-caps
              unelevated
              to="pages/music.html"
            >
              Go to Music <b class="mdi">&RightArrow;</b>
            </q-btn>
          </div>
        </div>
        <q-card-section class="card-body">
          <router-link
            v-for="(lmusic, i) in latestMusic"
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
              <div class="col self-center wrap q-ml-sm text-weight-bold text-black-50">
                   (MP3) - {{ lmusic.music_name }}
                <!-- wifu fweibivi woiv wvowieb vwibvwveowv woievbwv iobio -->
              </div>
            </router-link>
        </q-card-section>
      </q-card>
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
    meta() {
    const image = "../../../assets/images/LECCEL1.png";
    const title = "Discover latest and trending Music on Leccel.net";
    const description =
      "Search Music by title or artist. stream online or download for free";

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
