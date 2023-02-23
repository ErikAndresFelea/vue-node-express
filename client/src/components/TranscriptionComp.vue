<template>
  <td>{{ transc.block }}</td>
  <td>{{ transc.unit }}</td>
  <td>{{ transc.title }}</td>
  <td>
    <div class="d-flex justify-content-evenly ">
      <ButtonComp
        @btn-click="$emit('show-update', transc.id, transc.version)"
        type="button"
        class="btn btn-sm btn-outline-primary"
        :text="'Ver'"
      />
      <ButtonComp
        @btn-click="$emit('delete-transc', transc.id)"
        type="button"
        class="btn btn-sm btn-outline-danger"
        :text="'Borrar'"
      />
    </div>
  </td>
</template>

<script>
import ButtonComp from "./ButtonComp.vue";

export default {
  name: "TranscriptionComp",

  props: {
    transc: Object,
  },

  emits: ["delete-transc", "show-update"],

  components: {
    ButtonComp,
  },
};
</script>

<style scoped>
button {
  width: 3.5rem;
}
</style>