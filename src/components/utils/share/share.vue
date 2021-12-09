<template>
  <div class="d-flex justify-content-center align-items-center">
    <button
      type="button"
      class="btn btn-info btn-icon-text"
      @click="sharePost()"
    >
      <h4 class="mdi mdi-share btn-icon-prepend">&nbsp; Share</h4>
    </button>
  </div>
</template>

<script>
export default {
  name: "Share",
  props: {
    phead: {
        default: "Title",
        type: String
    },
    pbody: {
        default: "Title",
        type: String
    }
  },
  methods: {
    sharePost() {
      if (!navigator.share) {
        return alert("WebShare not supported on this device");
      }
      navigator
        .share({
          title: this.phead,
          text: this.pbody,
          url: window.location.href,
        })
        .then(() => {
          alert("Thanks for Sharing");
        })
        .catch((err) => alert(`Unexpected Error Occured ${err}`));
    },
  },
};
</script>