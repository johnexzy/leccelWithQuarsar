<template>
  <div class="content-wrapper">
    <div class="container-m">
      <div class="row justify-center">
        <div :class="`col-12 col-md-8 col-lg-8  stretch-card grid-margin`">
          <div v-if="StickyPost.title">
            <div :class="`container-m `">
              <q-card :class="`${$q.screen.lt.md ? '':'q-mr-md'}`">
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
                        <div
                          class="secondfont line-height-sm q-mb-md ellipsis-3-lines"
                          v-html="StickyPost.excerpt"
                        />

                        <div class=" ">
                          <span class="text-italic text-weight-bold text-caption">
                            Featured in:
                          </span>
                          <q-chip
                            v-for="(n, i) in StickyPost.categories"
                            :key="i"
                            size="md"
                            class="text-primary shadow-1 cursor-pointer"
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
                    <div class="row justify-center q-mt-md">
                      <!-- <div class="col-12 q-mt-lg"> -->
                      <!-- <q-separator /> -->
                      <q-btn
                        color="primary"
                        rounded
                        no-caps
                        :to="{ name: 'blogs.blog', params: { blog: StickyPost.slug } }"
                        >Read More</q-btn
                      >
                      <!-- </div> -->
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div :class="`col-grow grid-margin`">
          <q-card :class="`container-m ${$q.screen.lt.md ? '' : ''} `">
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
                      <div
                        class="text-caption text-italic"
                        v-for="(c, s) in n.categories"
                        :key="s"
                      >
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
            <q-separator></q-separator>
            <q-card-actions vertical>
              <q-btn color="primary" icon="read_more" label="Load More" to="/blog" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <div class="container-m">
      <div class="categories">
        <div class="text-center h1 text-white text-weight-bolder ">
          Explore Categories
        </div>
        <div class="row justify-center">
          <q-card :class="`shadow-5 text-white q-ma-md cursor-pointer bg-teal-${n+3}`" v-for="c, n in Categories" :key="n">
            <q-card-section> {{c.name | capitalize}} </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="container-m q-mt-md">
      <music-index :latest-music="LatestMusic" :popular-music="PopularMusic" />

      <!-- <div class="row" data-aos="fade-right">
        <movies-index :latest-movies="LatestMovies" />
      </div>
      <div class="row" data-aos="fade-up">
        <series-index :latest-series="LatestSeries" />
      </div> -->
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
      // "Categories",
    ]),

    ...mapGetters("blog", ["FeaturedPosts", "StickyPost", "Categories" ]),
  },
};
</script>
