<template>
  <div id="app">
    <div>
      <NavbarComp />
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue'

export default {
  name: 'App',

  components: {
    NavbarComp
  }
}
</script>

<style src="@/assets/style.css"></style>