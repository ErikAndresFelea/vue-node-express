<template>
  <div style="padding-left: 3.5rem; padding-right: 3.5rem">
    <div class="d-flex justify-content-center py-3">
      <h2>Transcripciones</h2>
    </div>
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-secondary">
          <tr>
            <th>Bloque</th>
            <th>Unidad</th>
            <th>Titulo</th>
            <th style="text-align: center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="transc.id" v-for="transc in transcs">
            <template v-if="transc.latest">
              <TranscriptionComp
                @show-update="$emit('show-update', transc.id, transc.version)"
                @delete-transc="$emit('delete-transc', transc.id)"
                :transc="transc"
              />
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center pb-3" style="gap: 1rem;">
      <ButtonComp
        @btn-click="$emit('show-add')"
        class="btn btn-sm btn-outline-success"
        :text="'Añadir transcripcion'"
      />
    </div>
  </div>
</template>

<script>
import TranscriptionComp from "./TranscriptionComp.vue";
import ButtonComp from "./ButtonComp.vue";

export default {
  name: "AllTranscriptionsComp",

  props: {
    transcs: Array,
  },

  emits: ["delete-transc", "show-add", "show-update"],

  components: {
    TranscriptionComp,
    ButtonComp,
  },
};
</script>

<style scoped>
th {
  font-size: 1.35rem;
}
</style>
