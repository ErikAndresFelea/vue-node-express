<template>
  <table class="table table-hover align-middle">
    <thead class="table-secondary">
      <tr>
        <th>Version</th>
        <th>Titulo</th>
        <th style="text-align: end; padding-right: 2.3rem">Opciones</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="version.version" v-for="version in versions">
        <VersionTableItemComp
          @reset-version="$emit('reset-version', version)"
          @show-version="$emit('show-version', version)"
          :version="version"
        />
      </tr>
    </tbody>
  </table>
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
