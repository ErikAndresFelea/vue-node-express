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
          <TranscriptionComp @show-update="$emit('show-update', transc.id)" @delete-transc="$emit('delete-transc', transc.id)" :transc="transc" />
        </tr>
      </tbody>
  </table>
  <div>
    <ButtonComp @btn-click="$emit('show-add')" class="confirm-button" :text="'Añadir transcripcion'" />
  </div>
  </div>


</template>

<script>
import TranscriptionComp from './TranscriptionComp.vue'
import ButtonComp from './ButtonComp.vue'

export default {
  name: 'AllTranscriptionsComp',
  
  props: {
    transcs: Array
  },

  emits: [
    'delete-transc', 'show-add', 'show-update'
  ],

  components: {
    TranscriptionComp,
    ButtonComp
  }
}
</script>