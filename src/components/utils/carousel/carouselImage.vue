<template>
  <div
    id="carouselExampleFade"
    class="carousel slide carousel-fade"
    data-ride="carousel"
  >
    <ol class="carousel-indicators">
      <li
        v-for="(i) in images"
        :key="i"
        :data-slide-to="i"
        :class="i == 0 ? 'active' : ''"
        data-target="#carouselExampleIndicators"
      />
    </ol>
    <div class="carousel-inner">
      <div
        v-for="(image, i) in images"
        :key="i"
        :class="i == 0 ? 'carousel-item active' : 'carousel-item'"
      >
        <img
          :src="image | formatSrc"
          :alt="`slide ${i}`"
          class="d-block w-100"
        >
      </div>
    </div>

    <a
      class="carousel-control-prev"
      href="#carouselExampleFade"
      role="button"
      data-slide="prev"
    >
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"/>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleFade"
      role="button"
      data-slide="next"
    >
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"/>
      <span class="sr-only">Next</span>
    </a>
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
      default: () => []
    }
  },
};
</script>
