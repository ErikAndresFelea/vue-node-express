<template>
  <div>
    <div>
      <input placeholder="Introduce el titulo de la trancripcion" id="title" v-model="title" type="text" required>
    </div>
    <div>
      <textarea style="height: 40vh; resize: none" placeholder="Introduce el contenido de la transcripcion" id="text" v-model="text" type="text" required></textarea>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AddUpdateComp',
  props: {
    titleText: String
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
