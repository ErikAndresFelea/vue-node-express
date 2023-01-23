<template>
  <div>
    <h2>Añadir transcripcion</h2>
    <div>
      <AddUpdateComp :titleText="'Añadir transcripcion'" />
          <div>
          <ButtonComp class="confirm-button" :text="'Añadir'" />
          <router-link to="/home">
            <ButtonComp class="cancel-button" :text="'Cancelar'" />
          </router-link>
    </div>
      </div>
  </div>
</template>

<script>
import AddUpdateComp from '../components/AddUpdateComp.vue'
import ButtonComp from '../components/ButtonComp.vue'

export default {
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
