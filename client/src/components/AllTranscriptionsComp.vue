<template>
  <div>
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
          <TranscriptionComp @delete-transc="$emit('delete-transc', transc.id)" :transc="transc" />
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
  }
}
</script>