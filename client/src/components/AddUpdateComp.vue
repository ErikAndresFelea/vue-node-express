<template>
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
</template>

<script>

export default {
name: 'AddUpdateComp',

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
