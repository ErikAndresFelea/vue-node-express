<template>
  <div>
    <AddTranscriptionComp 
      @show-get-a="toggleShow(false, false, true)" 
      @add-transc="addTranscription" 
      v-show="showAdd"
    />
  </div>
  <div>
    <UpdateTranscriptionComp 
      @show-get-u="toggleShow(false, false, true)" 
      @upd-transc="updateTranscription"
      :updTransc="updTransc"
      v-show="showUpdate"
    />
  </div>
  <div>
    <AllTranscriptionsComp 
      @show-update="updateTranscriptionView" 
      @show-add="toggleShow(true, false, false)" 
      @delete-transc="deleteTranscription" 
      :transcs="transcs"  
      v-show="showGet"
    />
  </div>
</template>

<script>
import ButtonComp from '../components/ButtonComp.vue'
import AllTranscriptionsComp from '../components/AllTranscriptionsComp.vue'
import AddTranscriptionComp from '../components/AddTranscriptionComp.vue'
import UpdateTranscriptionComp from '../components/UpdateTranscriptionComp.vue'

export default {
  name: 'Home',
  
  components: {
    ButtonComp,
    AllTranscriptionsComp,
    AddTranscriptionComp,
    UpdateTranscriptionComp
  },

  methods: {
    // Delete a transcription
    async deleteTranscription(id) {
      if(confirm('¿Seguro quieres borrar esta transcripicon?')) {
        const res = await fetch(`api/transcriptions/${id}`, {
        method: 'DELETE'
      })

      // Update the UI
      res.status === 200 ? (this.transcs = this.transcs.filter((transc) => transc.id !== id)) : alert('Error al borrar la transcripcion')
      }
    },

    // Add a trancription
    async addTranscription(transcription) {
      const res = await fetch(`api/transcriptions`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(transcription)
      })

      // Update the UI - Not working yet
      const data = await res.json()
      this.transcs = [...this.transcs, data]
    },

    // Get the specified transcription to fill the update form
    async updateTranscriptionView(id) {
      this.toggleShow(false, true, false)
      const transcription = await this.fetchTranscription(id)
      this.updTransc = {
        id: transcription.id,
        block: transcription.block,
        elective: transcription.elective,
        unit: transcription.unit,
        title: transcription.title,
        text: transcription.text
      }
    },

    // Update the transcription
    async updateTranscription(transcription) {
      const res = await fetch(`api/transcriptions/${transcription.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(transcription)
      })

      // Update the UI
      const objIndex = this.transcs.findIndex((obj) => obj.id == transcription.id)
      const trs = this.transcs[objIndex]
      trs.block = transcription.block
      trs.elective = transcription.elective
      trs.unit = transcription.unit
      trs.title = transcription.title
      trs.text = transcription.text
      this.transcs[objIndex] = trs
    },

    // Display the different components of the UI
    toggleShow(add, update, get) {
      this.showAdd = add,
      this.showUpdate = update,
      this.showGet = get
    },

    // Get all transcriptions to display on home
    async fetchTranscriptions() {
      const res = await fetch(`api/transcriptions`)
      const data = await res.json()
      return data
    },

    // Get a specific transcription
    async fetchTranscription(id) {
      const res = await fetch(`api/transcriptions/${id}`)
      const data = await res.json()
      return data
    }
  },
  
  emits: [
    'delete-transc', 'show-get-a', 'show-get-u', 'show-add', 'show-update', 'upd-transc'
  ],

  data () {
    return {
      transcs: [],
      showAdd: false,
      showUpdate: false,
      showGet: true,
      updTransc: {}
    }
  },

  async created () {
    this.transcs = await this.fetchTranscriptions()
  }
}
</script>
