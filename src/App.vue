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
  name: 'App'
}
</script>
