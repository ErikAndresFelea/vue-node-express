<template>
    <table>
      <tr>
        <td>
          <h3 style="margin: 1px">Placeholder for the title of a transcription</h3>
        </td>
        <td>
          <router-link to="/update">
            <ButtonComp class="update-button" :text="'Modificar'" />
          </router-link>
          <ButtonComp class="cancel-button" :text="'Borrar'" />
        </td>
      </tr>
    </table>
</template>

<script>
import ButtonComp from './ButtonComp.vue'

export default {
  name: 'TranscriptionComp',

  components: {
    ButtonComp
  }
}
</script>
