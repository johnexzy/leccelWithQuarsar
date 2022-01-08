<template>
  <div>
    <div


    >
      <q-img :src="images[0] | formatSrc" :alt="`Music Banner`" class="d-block w-100" />
    </div>
  </div>
</template>
<script>
export default {
  name: "CarouselImg",
  filters: {
    formatSrc(link) {
      return `https://app.leccel.net/${link}`;
    },
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
