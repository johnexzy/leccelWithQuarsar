<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header> -->

    <NavBar />
    <q-page-container>
      <div class="container-scroller">
        <div class="main-panel">
          <router-view />
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center pad2x">
        <p class="mt-2">
          <router-link :to="{ name: 'about' }">About Us </router-link> |
          <router-link :to="{ name: 'contact' }">Contact Us</router-link> |
          <router-link :to="{ name: 'privacy' }">Privacy Policy</router-link>
        </p>
      </div>
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("leccel/getLatestMusic");
    this.$store.dispatch("leccel/getLatestMovie");
    this.$store.dispatch("leccel/getLatestSeries");
    this.$store.dispatch("leccel/getPopularMusic");
    this.$store.dispatch("leccel/getPopularVideo");
    this.$store.dispatch("leccel/getPopularSeries");
    this.$store.dispatch("blog/fetchCategories");
    this.$store.dispatch("blog/fetchFeaturedPosts")
    this.$store.dispatch("blog/fetchStickyPost")
  },
};
</script>
