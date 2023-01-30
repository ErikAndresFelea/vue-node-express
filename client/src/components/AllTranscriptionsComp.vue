<template>
  <div>
    <h2>Transcripciones</h2>
    <table>
      <tbody >
        <tr>
          <th>
            Bloque
          </th>
          <th>
            Unidad
          </th>
          <th>
            Titulo
          </th>
        </tr>
        <tr :key="transc.id" v-for="transc in transcs">
          <TranscriptionComp @btn-delete="$emit('btn-delete', transc.id)" :transc="transc" />
        </tr>
      </tbody>
  </table>
  </div>


</template>

<script>
import TranscriptionComp from './TranscriptionComp.vue'

export default {
  name: 'AllTranscriptionsComp',
  
  props: {
    transcs: Array
  },

  emits: [
    'delete-transc'
  ],

  components: {
    TranscriptionComp
  },

  emits: [
    'btn-delete'
  ]
}
</script>