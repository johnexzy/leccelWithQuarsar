<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12 col-md-8 col-sm-10 col-lg-8">
          <div v-if="StickyPost.title">
            <div :class="`container ${$q.screen.lt.md ? 'q-mb-lg' : 'q-ma-md'} `">
              <q-card class="my-card">
                <q-card-section>
                  <div class="q-px-md">
                    <div class="row justify-center">
                      <div
                        class="col-12 col-md-8 pt-6 pb-6 align-self-center"
                        style="min-height: 200px"
                      >
                        <h1 class="nunito q-mb-md font-weight-bold">
                          {{ StickyPost.title }}
                        </h1>
                        <div class="secondfont line-height-sm q-mb-md ellipsis-3-lines" v-html="StickyPost.excerpt" />

                        <div class=" text-italic">
                          <span class=" text-weight-bold text-caption">
                          Featured in:
                        </span>
                          <q-chip
                            v-for="(n, i) in StickyPost.categories"
                            :key="i"
                            size="md"
                            class="text-primary shadow-4"
                            >{{ n.name }}</q-chip
                          >
                        </div>
                      </div>
                      <div class="col-12 col-md-4 col-sm-6 q-mt-md">
                        <div
                          class="flex justify-content-center align-items-center text-center"
                        >
                          <q-img
                            v-if="StickyPost.featured_image"
                            :src="StickyPost.featured_image"

                            class="img-rounded shadow-4"
                            :alt="StickyPost.title"
                          />
                        </div>
                      </div>
                      <!-- <q-separator /> -->
                    </div>
                    <div class="row justify-content-start">
                      <div class="col-12 q-mt-lg">
                        <!-- <q-separator /> -->
                        <q-btn
                          color="primary"
                          :to="{ name: 'Series', params: { short_url: StickyPost.slug } }"
                          >Read More</q-btn
                        >
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 col-sm-10 col-lg-4">
          <q-card :class="`container ${$q.screen.lt.md ? '' : 'q-ma-md'} `" >
            <q-card-section class="q-pt-xs">
             <div class="text-h5 q-mt-sm q-mb-xs">Recently added</div>
            </q-card-section>
            <q-card-section>
              <q-list class="" separator>
                <q-item clickable v-for="(n, i) in FeaturedPosts" :key="i">
                  <q-item-section>
                    <q-item-label
                      ><div class="text-subtitle1 text">{{ n.title }}</div>
                    </q-item-label>

                    <q-item-label caption>
                      <div class="text-caption text-italic" v-for="(c, s) in n.categories" :key="s">
                        in {{ c.name }} <q-space />
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <q-item-label caption>{{ timeAgo(n.date) }}</q-item-label>
                    <!-- <q-icon name="star" color="yellow" /> -->
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
      "Categories",
    ]),

    ...mapGetters("blog", ["FeaturedPosts", "StickyPost"]),
  },
};
</script>
