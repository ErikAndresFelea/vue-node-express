<template>
<div>
  <form @submit.prevent="onSubmit" >
    <h2>Modificar transcripcion</h2>
    <div>
      <input placeholder="Bloque" id="block" v-model="updTransc.block" type="text" required>
    </div>
    <div>
      <input placeholder="Electiva" id="elective" v-model="updTransc.elective" type="text">
    </div>
    <div>
      <input placeholder="Capitulo" id="unit" v-model="updTransc.unit" type="text" required>
    </div>
    <div>
      <input placeholder="Introduce el titulo de la trancripcion" id="title" v-model="updTransc.title" type="text" required>
    </div>
    <div>
      <textarea style="height: 40vh; resize: none" placeholder="Introduce el contenido de la transcripcion" id="text" v-model="updTransc.text" type="text" required></textarea>
    </div>
    <div>
      <ButtonComp type="submit" class="confirm-button" :text="'Modificar'" />
      <ButtonComp type="reset" @btn-click="showGet" class="cancel-button" :text="'Cancelar'" />
      <!-- <ButtonComp @btn-click="showGet" class="cancel-button" :text="'Cancelar'" /> -->
    </div>
  </form>
</div>
</template>

<script>
import ButtonComp from './ButtonComp.vue'

export default {
  name: 'UpdateTranscriptionComp',

  components: {
    ButtonComp
  },

  props: {
    updTransc: Object 
  },

  methods: {
    onSubmit() {
      const newUpdTransc = {
        id: this.updTransc.id,
        block: this.updTransc.block,
        elective: this.updTransc.elective,
        unit: this.updTransc.unit,
        title: this.updTransc.title,
        text: this.updTransc.text
      }

      alert('Transcripcion modificada')
      this.$emit('upd-transc', newUpdTransc)
      this.showGet()
    },

    showGet() {
      this.$emit('show-get-u')
      this.reset()
    },

    reset() {
      this.block = '',
      this.elective = '',
      this.unit = '',
      this.title = '',
      this.text = ''
    },
  },

  emits: [
      'show-get-u', 'upd-transc'
    ]
}
</script>

<style scoped>
div {
  padding: 5px;
}
</style>
