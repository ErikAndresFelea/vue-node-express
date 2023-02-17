<template>
  <table>
    <tr :key="version.version" v-for="version in versions">
      <VersionTableItemComp @reset-version="$emit('reset-version', version)" @show-version="$emit('show-version', version)" :version="version" />
    </tr>
  </table>
</template>

<script>
import VersionTableItemComp from './VersionTableItemComp.vue'

export default {
  name: 'VersionTableComp',

  props: {
    versions: Array
  },

  emits: [
    'reset-version', 'show-version'
  ],

  components: {
    VersionTableItemComp
  }
}
</script>

<style scoped>
h3 {
  margin: 0px;
}
</style>