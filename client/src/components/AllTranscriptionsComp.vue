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
        <tr :key="item.id" v-for="item in transcs">
          <TranscriptionComp :transc="item" />
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

  components: {
    TranscriptionComp
  }
}
</script>