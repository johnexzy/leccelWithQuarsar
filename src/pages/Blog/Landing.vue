<template>
  <q-page>
    <!-- header -->
    <section class="hero-wrapper q-py-xl" style="background: #470116ea;">
      <div class="container">
        <h1 class="text-h2 text-white q-mb-md">Leccel's Blog</h1>
        <h2 class="text-subtitle1 text-white">
          Get the latest gist news and moments on leccel.net. Download latest and trending music for free.
        </h2>
      </div>
    </section>

    <!-- featured section -->
    <section class="q-py-xl">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6 col-lg-6">
            <img class="full-width" :src="StickyPost.featured_image" alt="" />
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <div class="text-caption text-para-default q-mb-sm">
              {{ Object.keys(StickyPost.categories)[0].toLocaleUpperCase() }}
            </div>
            <router-link
              :to="{ name: 'blogs.blog', params: { blog: StickyPost.slug } }"
              class="text-h3 text-black text-weight-bold"
            >
              {{ StickyPost.title }}
            </router-link>
            <div
              v-html="StickyPost.excerpt"
              class="text-subtitle q-my-sm"
            ></div>
            <div class="row">
              <div class="col-12 col-md-7 col-lg-7">
                <q-list>
                  <q-item class="q-pa-none">
                    <q-item-section avatar>
                      <q-avatar size="30px">
                        <q-img
                          style="width: 30px; height: 30px;"
                          :src="StickyPost.author.avatar_URL"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>{{
                      StickyPost.author.name
                    }}</q-item-section>
                    <q-item-section side>{{
                      timeAgo(StickyPost.modified)
                    }}</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- content  -->
    <section class="q-py-xl">
      <div class="container">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3 col-lg-3">
            <div class="text-caption text-para-default">EXPLORE</div>

            <!-- section sidebar -->
            <q-tabs
              v-model="tab"
              vertical
              class="text-left q-mb-xl secondfont"
              active-color="primary"
              style="height: unset!important"
            >
              <q-tab
                style="font-size: 1.2rem;"
                class="blog-category-tab"
                no-caps
                v-for="(cat, i) in Categories"

                :key="i"
                :name="cat.slug"
                :label="cat.name.toUpperCase()"
              />
            </q-tabs>

            <!-- section newsletter -->
            <!-- <div class="q-mb-xl" style="margin-top: 2rem;">
              <div class="row q-col-gutter-md items-center">
                <h3 class="col-7 text-h5 text-weight-medium text-default">
                  Subscribe to our weekly newsletter
                </h3>
                <div class="col-5">
                  <img
                    class="full-width"
                    src="../../assets/img/blog-email.png"
                    alt=""
                  />
                </div>
                <q-form class="q-gutter-md full-width">
                  <q-input
                    dense
                    v-model="email"
                    ref="email"
                    lazy-rules
                    :rules="[
                      val => (val && val.length) || 'Email Address is required',
                      val =>
                        /^\S+@\S+\.\S+$/.test(val) || 'Provide a valid email'
                    ]"
                    class="bg-grey-3 full-width q-px-md"
                    borderless
                    placeholder="Enter email address"
                  />
                  <q-btn
                    class="full-width"
                    label="Subscribe"
                    no-caps
                    @click="subscribe()"
                    color="primary"
                    unelevated
                  />
                </q-form>
              </div>
            </div> -->
          </div>
          <div class="col-12 col-md-9 col-lg-9">
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel
                v-for="(cat, i) in Categories"
                :key="i"
                :name="cat.slug"
              >
                <div
                  v-if="LoadingPostsByCategories"
                  class="row q-col-gutter-lg"
                >
                  <q-card
                    v-for="i in 4"
                    :key="i"
                    class="col-12 col-md-6 col-lg-6 q-mb-xl"
                    flat
                    style="max-width: 300px; background:transparent"
                  >
                    <q-item>
                      <q-item-section avatar>
                        <q-skeleton animation="wave" width="100%" type="text" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <!-- <q-item-section avatar>
                        <q-skeleton type="QAvatar" animation="fade" />
                      </q-item-section> -->

                      <q-item-section>
                        <q-item-label>
                          <q-skeleton animation="wave" type="text" />
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-skeleton animation="wave" height="100px" square />

                    <q-card-section>
                      <q-item>
                        <q-item-section avatar>
                          <q-skeleton animation="wave" type="QAvatar" />
                        </q-item-section>

                        <q-item-section>
                          <q-skeleton
                            type="text"
                            width="50%"
                            class="text-subtitle2"
                            animation="wave"
                          />
                        </q-item-section>
                        <q-item-section avatar>
                          <q-skeleton
                            type="text"
                            width="100%"
                            class="text-caption"
                            animation="wave"
                          />
                        </q-item-section>
                      </q-item>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="row q-col-gutter-lg">
                  <div
                    v-for="(post, i) in PostsByCategories.posts"
                    :key="i"
                    class="col-12 col-md-6 col-lg-6 q-mb-xl"
                  >
                    <!-- <div class="text-caption q-my-sm text-para-default">
                      NEWS
                    </div> -->
                    <!-- <h3 class="text-h5 text-weight-bold text-default"> -->
                    <router-link
                      tag="h3"
                      :to="{ name: 'blogs.blog', params: { blog: post.slug } }"
                      class="cursor-pointer text-weight-bold  text-h4 text-black"
                    >
                      {{ post.title }}
                    </router-link>
                    <!-- </h3> -->
                    <div
                      v-html="post.excerpt"
                      class="ellipsis-2-lines text-subtitle text-para-default q-my-sm"
                    ></div>
                    <div class="row">
                      <div class="col-12 col-md-10 col-lg-10">
                        <q-list>
                          <q-item class="q-pa-none">
                            <q-item-section avatar>
                              <q-avatar size="30px">
                                <q-img
                                  style="width: 30px; height: 30px;"
                                  :src="post.author.avatar_URL"
                                />
                              </q-avatar>
                            </q-item-section>
                            <q-item-section>{{
                              post.author.name
                            }}</q-item-section>
                            <q-item-section side>{{
                              timeAgo(post.modified)
                            }}</q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center">
                  <q-btn unelevated color="grey-5" label="View more" />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </section>

    <!-- <get-access-to-more-features /> -->
  </q-page>
</template>

<script>
// import GetAccessToMoreFeatures from '../../components/GetAccessToMoreFeatures.vue'
// import blog from '../../store/blog'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('blog')
export default {
  preFetch({ store }) {
    // store.registerModule('blog', blog)
    return store.dispatch('blog/fetchStickyPost')
  },
  components: {
    // GetAccessToMoreFeatures
  },
  data() {
    return {
      tab: 'album',
      email: '',
      // StickyPost: {}
    }
  },
  watch: {
    tab(val) {
      this.fetchPostsByCategories(val)
    }
  },
  mounted() {
    this.fetchCategories()
    this.fetchPostsByCategories()
    // this.StickyPost = this.FeaturedPostsMeta.posts[0]
  },
  computed: {
    ...mapGetters([
      // 'FeaturedPosts',
      'StickyPost',
      'Categories',
      'LoadingPostsByCategories',
      'PostsByCategories',
      'LoadingCategories',
      'LoadingStickyPost'
    ]),
  },
  methods: {
    ...mapActions(['fetchCategories', 'fetchPostsByCategories']),
    // subscribe() {
    //   this.$refs.email.validate()
    //   if (this.$refs.email.hasError) {
    //     return false
    //   }
    //   this.$store.dispatch('like/subscribe', this.email).then(() => {
    //     this.email = ''
    //   })
    // }
  },
  destroyed() {
    // this.$store.unregisterModule('blog')
  },
  meta() {
    const title = 'Leccel\'s Blog'
    const description =
      'Leccel.net is the best place to get entertained. Get latest songs gist, news and more'
    // const image = '../assets/img/world-map-vector.svg'
    const image = window.location.origin + '/opengraphs/home.png'

    return {
      // Title tag
      title: title,

      // meta tags
      meta: {
        description: {
          name: 'description',
          content: description
        },

        // Open Graph Tags
        ogTitle: {
          name: 'og:title',
          content: title
        },
        ogDescription: {
          name: 'og:description',
          content: description
        },
        ogURL: {
          property: 'og:url',
          content: window.location.href
        },
        ogImage: {
          property: 'og:image',
          content: image
        },
        twitterCard: { name: 'twitter:card', content: 'summary_large_image' },
        twitterTitle: {
          name: 'twitter:title',
          content: title
        },
        twitterDescription: {
          name: 'twitter:description',
          content: description
        },
        twitterImage: {
          name: 'twitter:image',
          content: image
        },
        // Google / Schema.org markup:
        schemaName: {
          itemprop: 'name',
          content: title
        },
        schemaDesc: {
          itemprop: 'description',
          content: description
        },
        schemaImage: {
          itemprop: 'image',
          content: image
        }
      }
    }
  }
}
</script>

<style>
.blog-category-tab {
  display: flex;
  justify-content: flex-start;
}
.blog-category-tab .q-tab__indicator {
  display: none;
}
.blog-category-tab .q-tab__content .q-tab__label {
  font-size: 1.5rem !important;
  font-weight: bold;
}
</style>
