<template>
  <td>
    <h3>{{ version.version }}</h3>
  </td>
  <td>
    <h3>{{ version.title }}</h3>
  </td>
  <td>
    <ButtonComp
      @btn-click="$emit('show-version', version)"
      class="update-button"
      :text="'Ver'"
    />
    <ButtonComp
      @btn-click="$emit('reset-version', version)"
      class="cancel-button"
      :text="'Restaurar'"
    />
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
