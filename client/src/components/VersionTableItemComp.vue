<template>
  <td>{{ version.version }}</td>
  <td>{{ version.title }}</td>
  <td>
    <div style="display: flex !important; justify-content: flex-end;">
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
  </td>
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
  margin-left: 0.3rem !important;
  margin-right: 0.3rem !important;
}
</style>
