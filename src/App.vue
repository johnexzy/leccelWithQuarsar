<template>
  <div id="q-app">
    <q-ajax-bar
      position="top"
      color="primary"
      size="5px"
    />
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
    meta: {
    // sets document title
    title: 'Leccel net',
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: title => `${title} — Leccel `,

    // meta tags
    meta: {
      description: {
        name: 'description',
        content:
          "Leccel is the leading music discovery platform. Discover the top Music, Albums, News, Upcoming, Trends and many more "
      },

      ogSiteName: {
        name: 'og:site_name',
        content: 'Leccel net'
      },

      ogType: { property: 'og:type', content: 'website' },

      twitterSite: {
        name: 'twitter:site',
        content: '@leccelj'
      }

      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      // ogTitle: {
      //   name: 'og:title',
      //   // optional; similar to titleTemplate, but allows templating with other meta properties
      //   template(ogTitle) {
      //     return `${ogTitle} | leccel Africa`
      //   }
      // }
    }
  }
}
</script>
