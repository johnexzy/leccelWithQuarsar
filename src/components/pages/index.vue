<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 col-lg-8">
          <div v-if="StickyNews.title">
            <div class="container bg-light">
              <div class="jumbotron jumbotron-fluid bg-light position-relative">
                <div class="pl-4 pr-3 tofront">
                  <div class="row justify-content-between">
                    <div
                      class="col-12 col-md-8 pt-6 pb-6 align-self-center"
                      style="min-height: 200px"
                    >
                      <h1 class="secondfont mb-3 font-weight-bold">
                        {{ StickyNews.title.rendered }}
                      </h1>
                      <div class="mb-3 ellipsis-2-lines" v-html="StickyNews.excerpt" />
                      <div class="q-pa-md">
                        <q-chip
                          v-for="(n, i) in StickyNews.categories"
                          :key="i"
                          size="md"
                          class="glossy"
                          >{{ n.name }}</q-chip
                        >
                      </div>

                      <!-- <q-separator /> -->
                      <router-link
                        :to="{ name: 'Series', params: { short_url: StickyNews.slug } }"
                        class="btn btn-dark"
                        >Read More</router-link
                      >
                    </div>
                    <div class="col-12 col-md-4 d-md-block mt-3">
                      <div
                        class="flex justify-content-center align-items-center text-center"
                      >
                        <img
                          v-if="StickyNews.featured_media"
                          :src="StickyNews.jetpack_featured_media_url"
                          height="300px"
                          width="180px"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 col-lg-4">
          <q-card class="bg-light" square>
            <q-card-section>
              <q-list class="q-pa-md" separator>
                <q-item clickable v-for="(n, i) in News" :key="i">
                  <q-item-section>{{ n.title.rendered }}</q-item-section>
                  <q-item-section v-for="(c, s) in News.categories" :key="s">
                    <q-chip size="md" class="glossy">{{ c.name }}</q-chip>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="container">
      <music-index :latest-music="LatestMusic" :popular-music="PopularMusic" />
      <div class="row" data-aos="fade-right">
        <movies-index :latest-movies="LatestMovies" />
      </div>
      <div class="row" data-aos="fade-up">
        <series-index :latest-series="LatestSeries" />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import { mapGetters } from "vuex";
// import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Index",
  // components: {
  //   Carousel,
  //   Slide,
  // },
  computed: {
    ...mapGetters("leccel", [
      "LatestMusic",
      "PopularMusic",
      "LatestMovies",
      "LatestSeries",
      "News",
      "StickyNews",
      "Categories",
    ]),
    // ...mapGetters(["news"])
  },
};
</script>
