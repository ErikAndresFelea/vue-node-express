<template>
  <h2>Modificar transcripcion</h2>
  <div>
    <AddUpdateComp />
        <div>
        <ButtonComp class="confirm-button" :text="'Modificar'" />
        <router-link to="/home">
          <ButtonComp class="cancel-button" :text="'Cancelar'" />
        </router-link>
      </div>
  </div>
</template>

<script>
import AddUpdateComp from '../components/AddUpdateComp.vue'
import ButtonComp from '../components/ButtonComp.vue'

export default {
  name: 'UpdateTranscription',

  components: {
    AddUpdateComp,
    ButtonComp
  },

  data () {
    return {
      title: '',
      text: ''
    }
  }
}
</script>

<style scoped>
div {
  padding: 5px;
}
</style>
