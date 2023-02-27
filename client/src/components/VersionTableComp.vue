<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" :key="version.version" v-for="version in versions">
      <VersionTableItemComp
        @reset-version="$emit('reset-version', version)"
        @show-version="$emit('show-version', version)"
        :version="version"
      />
    </li>
  </ul>
</template>

<script>
import VersionTableItemComp from "./VersionTableItemComp.vue";

export default {
  name: "VersionTableComp",

  props: {
    versions: Array,
  },

  emits: ["reset-version", "show-version"],

  components: {
    VersionTableItemComp,
  },
};
</script>

<style scoped>
ul {
  max-width: 45rem;
  min-width: 50%;
}
</style>