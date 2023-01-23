<template>
  <button @click="onClick()">{{ text }}</button>
</template>

<script>
export default {
  name: 'ButtonComp',
  props: {
    text: String
  },

  methods: {
    onClick () {
      this.$emit('btn-click')
    }
  }
}
</script>
