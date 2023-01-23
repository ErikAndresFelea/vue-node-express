<template>
  <div>
    <h2>Transcripciones</h2>
    <div>
      <table>
        <tr v-for="item in transc" :key="item.id">
          <td>
            <TranscriptionComp :item="item" />
          </td>
        </tr>
      </table>
    </div>
    <div style="margin-top: 5px">
      <router-link to="/add">
        <ButtonComp class="confirm-button" :text="'Añadir transcripcion'" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ButtonComp from '../components/ButtonComp.vue'
import TranscriptionComp from '../components/TranscriptionComp.vue'

export default {
  components: {
    ButtonComp,
    TranscriptionComp
  },

  data () {
    return {
      transc: [
        { id: 1, TranscriptionComp },
        { id: 2, TranscriptionComp },
        { id: 3, TranscriptionComp },
        { id: 4, TranscriptionComp },
        { id: 5, TranscriptionComp },
        { id: 6, TranscriptionComp }
      ]
    }
  }
}
</script>
