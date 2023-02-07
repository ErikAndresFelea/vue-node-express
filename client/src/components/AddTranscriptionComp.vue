<template>
<div>
  <form @submit="onSubmit" >
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
      <ButtonComp type="reset" @btn-click="showGet" class="cancel-button" :text="'Cancelar'" />
    </div>
  </form>
</div>
</template>

<script>
import ButtonComp from './ButtonComp.vue'

export default {
  name: 'AddTranscriptionComp',
  
  components: {
    ButtonComp
  },

  methods: {
    onSubmit() {
      const newTransc = {
        block: this.block,
        elective: this.elective,
        unit: this.unit,
        title: this.title,
        text: this.text
      }

      alert('Transcripcion añadida')
      this.$emit('add-transc', newTransc)
      this.showGet()
    },

    showGet() {
      this.$emit('show-get-a')
      this.reset()
    },

    reset() {
      this.block = '',
      this.elective = '',
      this.unit = '',
      this.title = '',
      this.text = ''
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
  },

  emits: [
    'add-transc', 'show-get-a'
  ]
}
</script>

<style scoped>
div {
  padding: 5px;
}
</style>
