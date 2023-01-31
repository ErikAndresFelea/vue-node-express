<template>
<div>
  <form @submit.prevent="onSubmit" >
    <h2>Modificar transcripcion</h2>
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
    showGet() {
      this.$emit('show-get-u')
    }
  },

  data () {
    return {
      block: this.updTransc.block,
      elective: this.updTransc.elective,
      unit: this.updTransc.unit,
      title: this.updTransc.title,
      text: this.updTransc.text
    }
  }
}
</script>

<style scoped>
div {
  padding: 5px;
}
</style>
