<template>
  <button @click="$emit('btn-click')">{{ text }}</button>
</template>

<script>
export default {
  name: 'ButtonComp',
  props: {
    text: String
  }
}
</script>
