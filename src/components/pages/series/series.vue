<template>
  <div class="col-sm-12 grid-margin">
    <div class="card card-square">
      <div class="card-header">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="font-weight-600 mb-4 text-center">TV Series</h3>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-12">
            <div class="row show-music">
              <div
                v-for="(lseries, i) in latestSeries"
                :key="i"
                class="col-md-4 grid-margin stretch-card"
              >
                <div class="card card-rounded shadow music">
                  <router-link
                    :to="{name:'Series', params:{short_url: lseries.short_url}}"
                    class="text-decoration-none"
                  >
                    <div class="card-img-holder">
                      <img
                        :src="lseries.images[0]"
                        alt=""
                        class="card-img"
                      >
                    </div>
                  </router-link>

                  <div 
                    class="card-body p-2" 
                    style="background: #eee">
                    <router-link
                      :to="{name:'Series', params:{short_url: lseries.short_url}}"
                      class="h3 mb-0"
                      style="text-decoration: none; color: inherit"
                    >
                      <h3 
                        class="font-weight-200 mb-2" 
                        style="color: #561529">
                        (Download) - {{ lseries.series_name }}
                      </h3>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeriesIndex",
  props: {
    latestSeries: {
      type: Array,
      required: true,
    },
  },
};
</script>