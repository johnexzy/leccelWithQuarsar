<template>
  <div id="q-app">
    <q-ajax-bar position="top" color="primary" size="5px" />
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",

  meta: {
    // sets document title
    title: "Welcome",
    // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    titleTemplate: (title) => `${title} - Leccel.net`,

    // meta tags
    meta: {
      description: {
        name:
          "Leccel is the leading music discovery platform. Discover the top Music, Albums, News, Upcoming, Trends and many more ",
        content: "Page 1",
      },
      keywords: {
        name: "Leccel, Music, Download, MP3, poverty, sin, Africa Music,",
        content: "Leccel.net",
      },
      equiv: { "http-equiv": "Content-Type", content: "text/html; charset=UTF-8" },
      // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
      ogTitle: {
        name: "og:title",
        // optional; similar to titleTemplate, but allows templating with other meta properties
        template(ogTitle) {
          return `${ogTitle} - Leccel.net`;
        },
      },
    },

    // // CSS tags
    // link: {
    //   material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    // },

    // JS tags
    script: {
      ldJson: {
        type: "application/ld+json",
        innerHTML: `{ "@context": "http://schema.org" }`,
      },
    },

    // <html> attributes
    htmlAttr: {
      "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
      empty: undefined, // generates <html empty>
    },

    // <body> attributes
    bodyAttr: {
      "action-scope": "xyz", // generates <body action-scope="xyz">
      empty: undefined, // generates <body empty>
    },

    // <noscript> tags
    noscript: {
      default: "Please Enable Javascript",
    },
  },
};
</script>
