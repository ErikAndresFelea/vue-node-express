<template>
  <div class="d-flex justify-content-center">
    <h2>{{ version.version }}</h2>
    <h2>{{ version.title }}</h2>
    <div class="d-flex justify-content-evenly">
      <ButtonComp
        @btn-click="$emit('show-version', version)"
        class="btn btn-sm btn-outline-primary"
        :text="'Ver'"
      />
      <ButtonComp
        @btn-click="$emit('reset-version', version)"
        class="btn btn-sm btn-outline-danger"
        :text="'Reset'"
      />
    </div>
  </div>
</template>

<script>
import ButtonComp from "./ButtonComp.vue";

export default {
  name: "VersionTableItemComp",

  props: {
    version: Object,
  },

  emits: ["reset-version", "show-version"],

  components: {
    ButtonComp,
  },
};
</script>

<style scoped>
button {
  width: 3.25rem;
}
</style>
