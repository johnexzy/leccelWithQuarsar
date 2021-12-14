<template>
  <q-page>
    <section
      class="author-hero-wrapper"
      :style="`background-image: url(${Post.featured_image});`"
    >
      <div class="container"></div>
    </section>

    <!-- header -->
    <section class="q-pt-xl q-pb-xs">
      <div class="container">
        <h3 class="text-subtitle1 text-para-default" style="font-size:14px">
          {{ Object.keys(Post.categories)[0].toLocaleUpperCase() }}
        </h3>
        <h1 class="text-h2 text-weight-bold text-default">
          {{ Post.title }}
        </h1>

        <div class="row items-center q-my-md">
          <div class="text-subtitle1 text-para-default">
            {{ Post.author.name }}
          </div>
          <div class="text-subtitle1 text-para-default q-mx-md">•</div>
          <div class="text-subtitle2 text-para-default">
            {{ timeAgo(Post.modified) }}
          </div>
        </div>
      </div>
    </section>

    <!-- Dash seperator -->
    <div class="container"><div class="dashed-separator"></div></div>

    <section class="q-py-xl">
      <div class="container">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-3 col-lg-3 column items-start">
            <div class="text-subtitle1 text-para-default q-mb-md">
              SHARE THIS ARTICLE
            </div>
            <a
              class="share-btn q-mb-sm"
              :href="
                `https://www.facebook.com/dialog/share?app_id=937345527055140&display=popup&title=${shareInfo.head}&description=${shareInfo.text}&quote=${shareInfo.text}&href=${shareInfo.link}`
              "
              target="_blank"
              ><q-icon
                size="25px"
                name="ion-logo-facebook"
                class="q-mr-md"
              />Facebook</a
            >
            <a
              class="share-btn q-mb-sm"
              :href="
                `http://twitter.com/intent/tweet/?text=${shareInfo.text} \n${shareInfo.link}`
              "
              target="_blank"
              ><q-icon
                size="25px"
                name="ion-logo-twitter"
                class="q-mr-md"
              />Twitter</a
            >
            <a
              class="share-btn q-mb-sm"
              :href="
                `https://www.linkedin.com/sharing/share-offsite/?url=${shareInfo.link}`
              "
              target="_blank"
              ><q-icon
                size="25px"
                name="ion-logo-linkedin"
                class="q-mr-md"
              />Linkedin</a
            >
            <a
              class="share-btn q-mb-sm"
              target="_blank"
              :href="
                `mailto:?subject=${shareInfo.head}&body=${shareInfo.text} ${shareInfo.link}`
              "
              ><q-icon size="25px" name="ion-mail" class="q-mr-md" />Mail</a
            >
            <a
              class="share-btn"
              :href="`whatsapp://send?text=${shareInfo.text} ${shareInfo.link}`"
              ><q-icon
                size="25px"
                name="ion-logo-whatsapp"
                class="q-mr-md"
              />Whatsapp</a
            >
            <!-- <q-btn icon="ion-logo-facebook" label="Facebook" no-caps unelevated flat text-color="grey-10" />
                        <q-btn icon="ion-logo-twitter" label="Twitter" no-caps unelevated flat text-color="grey-10" />
                        <q-btn icon="ion-logo-linkedin" label="Linkedin" no-caps unelevated flat text-color="grey-10" />
                        <q-btn icon="ion-mail" label="Mail" no-caps unelevated flat text-color="grey-10" />
                        <q-btn icon="ion-logo-whatsapp" label="Whatsapp" no-caps unelevated flat text-color="grey-10" /> -->
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <div v-html="Post.content" class="blog-html html">
              <!-- <p>
                The 4 Ps of marketing is a model businesses use to control and
                optimize the essential factors of marketing a product or a
                service. The four components of the model are product (what you
                sell), price (how much you sell it for), place (where you sell
                it), and promotion (how you get customers).
              </p>
              <p>
                The 4 Ps of marketing is a <a href="#">model businesses</a> use
                to control and optimize the essential factors of marketing a
                product or a service. The four components of the model are
                product (what you sell), price (how much you sell it for), place
                (where you sell it), and promotion (how you get customers).
              </p>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <h4>Heading 4</h4>
              <h5>Heading 5</h5>
              <h6>Heading 6</h6>
              <p>
                The 4 Ps of marketing is a model businesses use to control and
                optimize the essential factors of marketing a product or a
                service. The four components of the model are product (what you
                sell), price (how much you sell it for), place (where you sell
                it), and promotion (how you get customers).
              </p>
              <img
                style="width: 50%;"
                src="https://www.educationalappstore.com/images/best-graph-chart-making-apps.jpg"
                alt=""
              />
              <p>
                The 4 Ps of marketing is a model businesses use to control and
                optimize the essential factors of marketing a product or a
                service. The four components of the model are product (what you
                sell), price (how much you sell it for), place (where you sell
                it), and promotion (how you get customers).
              </p>
              <ul>
                <li>Idea one</li>
                <li>Idea two</li>
                <li>Idea three</li>
                <li>
                  The four components of the model are product (what you sell),
                  price (how much you sell it for), place (where you sell it),
                  and promotion (how you get customers).
                </li>
              </ul>
              <p>
                The 4 Ps of marketing is a model businesses use to control and
                optimize the essential factors of marketing a product or a
                service. The four components of the model are product (what you
                sell), price (how much you sell it for), place (where you sell
                it), and promotion (how you get customers).
              </p>

              <img
                style="width: 70%;"
                src="https://stsci-opo.org/STScI-01F62J6CZVCG5WTEANGE579F4P.png"
                alt=""
              />
              <blockquote class="blockqoute">
                The 4 Ps of marketing is a model businesses use to control and
                optimize the essential factors of marketing a product or a
                service. The four components of the model are product (what you
                sell), price (how much you sell it for), place (where you sell
                it), and promotion (how you get customers).
              </blockquote> -->
            </div>

            <div class="q-my-xl">
              last updated on: {{ timeAgo(Post.modified) }}
            </div>

            <!-- <Newsletter></Newsletter> -->
          </div>

          <div class="col-12 col-md-3 col-lg-3"></div>
        </div>
      </div>
    </section>

    <!-- <section class="q-py-xl">
      <div class="container">
        <div class="text-subtitle1 text-default q-mb-xl">INTERESTING READS</div>
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-3 col-lg-3">
            <div class="text-caption text-weight-bold text-default">
              STORIES
            </div>
            <div class="text-subtitle1 text-default text-weight-bold">
              SoftBank Makes First Africa Bet on OPay at $2 Billion Valuation
            </div>
            <div class="dashed-separator q-mt-md"></div>
          </div>
          <div class="col-12 col-md-3 col-lg-3">
            <div class="text-caption text-weight-bold text-default">
              STORIES
            </div>
            <div class="text-subtitle1 text-default text-weight-bold">
              SoftBank Makes First Africa Bet on OPay at $2 Billion Valuation
            </div>
            <div class="dashed-separator q-mt-md"></div>
          </div>
          <div class="col-12 col-md-3 col-lg-3">
            <div class="text-caption text-weight-bold text-default">
              STORIES
            </div>
            <div class="text-subtitle1 text-default text-weight-bold">
              SoftBank Makes First Africa Bet on OPay at $2 Billion Valuation
            </div>
            <div class="dashed-separator q-mt-md"></div>
          </div>
          <div class="col-12 col-md-3 col-lg-3">
            <div class="text-caption text-weight-bold text-default">
              STORIES
            </div>
            <div class="text-subtitle1 text-default text-weight-bold">
              SoftBank Makes First Africa Bet on OPay at $2 Billion Valuation
            </div>
            <div class="dashed-separator q-mt-md"></div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- <get-access-to-more-features /> -->
  </q-page>
</template>

<script>
// import Newsletter from '../../components/Newsletter'
import { createNamespacedHelpers } from 'vuex'
// import GetAccessToMoreFeatures from '../../components/GetAccessToMoreFeatures.vue'
const { mapGetters } = createNamespacedHelpers('blog')
export default {
  preFetch({ store, currentRoute }) {
    // alert("John")
    return store.dispatch('blog/fetchPost', currentRoute.params.blog)
  },
  data() {
    return {
      tab: 'news',
      newsletter1: true,
      newsletter2: false,
      newsletter3: false
    }
  },
  components: {
    // GetAccessToMoreFeatures,
    // Newsletter
  },
  computed: {
    ...mapGetters(['Post']),
    /**
     * Share Meta Data
     * @return Object
     */
    shareInfo() {
      return {
        head: `${this.Post.title} - leccel Africa`,
        text: this.Post.title.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, ''),
        link: `https://leccel.net${this.$route.fullPath}`
      }
    }
  },
  meta() {
    const title = this.Post.title
    const description = this.Post.excerpt.replace(/<[^>]*>?/gm, '')
    // const image = '../assets/img/world-map-vector.svg'
    const image = this.Post.featured_image

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

<style lang="scss">
$font-primary: 'Museo Sans', Arial, sans-serif;

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
.author-hero-wrapper {
  /* background-image: url(http://www.milimetrik.com/wp-content/uploads/2018/04/software.jpg); */

  padding: 200px 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}
.dashed-separator {
  border: 1px dashed #bbb;
}
.share-btn {
  color: unset;
  font-weight: bold;
}

.blog-html {
  max-width: 650px;

  font-size: 16px !important;
  line-height: 24px !important;
  /* margin-bottom: 2rem; */
  font-weight: 400;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 5px;
  }

  img {
    width: 100% !important;
    margin: 10px 0;
    /* padding: 10px; */
    /* background: #eee; */
  }

  a {
    color: #0045e6;

    &:hover {
      text-decoration: underline;
    }
  }

  h1 {
    font-size: 3rem;
    line-height: 3rem !important;
    font-family: $font-primary;
  }

  h2 {
    margin-top: 40px;
    font-size: 1.7rem;
    line-height: 2rem;
    font-family: $font-primary;
  }

  h3 {
    margin-top: 40px;
    font-size: 1.725rem;
    font-weight: normal;
    line-height: 2.75rem;
    font-family: $font-primary;
  }

  h4 {
    font-size: 1.45rem;
    line-height: 2rem;
    font-family: $font-primary;
  }

  h5 {
    font-size: 1.125rem;
    line-height: 1.95rem;
    font-family: $font-primary;
  }

  h6 {
    font-size: 0.95rem;
    font-family: $font-primary;
  }

  p {
    margin-bottom: 1rem;
  }

  .wp-block-quote {
    border-left: 3px solid #0045e6;
    margin-left: 0;
    padding-left: 40px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
}
</style>
