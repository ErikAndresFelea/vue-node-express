<template>
  <td>
    <h3>{{ transc.block }}</h3>
  </td>
  <td>
    <h3>{{ transc.unit }}</h3>
  </td>
  <td>
    <h3>{{ transc.title }}</h3>
  </td>
  <td>
    <router-link to="/update">
      <ButtonComp class="update-button" :text="'Modificar'" />
    </router-link>
    <ButtonComp @btn-click="$emit('delete-transc', transc.id)" class="cancel-button" :text="'Borrar'" />
  </td>
</template>

<script>
import ButtonComp from './ButtonComp.vue'

export default {
  name: 'TranscriptionComp',

  props: {
    transc: Object
  },

  emits: [
    'delete-transc'
  ],

  components: {
    ButtonComp
  },

  emits: [
    'btn-delete'
  ]
}
</script>

<style scoped>
h3 {
  margin: 0px;
}
</style>