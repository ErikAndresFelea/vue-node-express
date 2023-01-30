<template>
  <form @submit="onSubmit">
    <h2>Añadir transcripcion</h2>
    <div>
      <input placeholder="Bloque" id="block" v-model="block" type="text" required>
    </div>
    <div>
      <input placeholder="Electiva" id="elective" v-model="elective" type="text">
    </div>
    <div>
      <input placeholder="Capitulo" id="unit" v-model="unit" type="text" required>
    </div>
    <div>
      <input placeholder="Introduce el titulo de la trancripcion" id="title" v-model="title" type="text" required>
    </div>
    <div>
      <textarea style="height: 40vh; resize: none" placeholder="Introduce el contenido de la transcripcion" id="text" v-model="text" type="text" required></textarea>
    </div>
    <div>
      <ButtonComp type="submit" class="confirm-button" :text="'Añadir'" />
      <router-link to="/home">
        <ButtonComp class="cancel-button" :text="'Cancelar'" />
      </router-link>
    </div>
  </form>
</template>

<script>
import ButtonComp from './ButtonComp.vue'

export default {
  name: 'AddTranscription',
  
  components: {
    ButtonComp
  },

  methods: {
    onSubmit(e) {
      e.preventDefault()

      const newTransc = {
        id: Math.floor(Math.random() * 100000),
        block: this.block,
        elective: this.elective,
        unit: this.unit,
        title: this.title,
        text: this.text
      }

      // alert('Tarea añadida')
      // this.$router.push('/home')
      this.$emit('add-transc', newTransc)
    }
  },

  data () {
    return {
      block: '',
      elective: '',
      unit: '',
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
