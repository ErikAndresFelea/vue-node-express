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
      :versions="versions"
      v-show="showUpdate"
    />
  </div>
  <div>
    <AllTranscriptionsComp 
      @show-update="updateTranscriptionView" 
      @show-add="toggleShow(true, false, false)" 
      @delete-transc="deleteAllTranscriptions" 
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
    async deleteTranscription(id, version, latest) {
      if(confirm('¿Seguro quieres borrar esta VERSION de la transcripcion?')) {
        if (latest && version !== 1) {
          const oldTranscription = await this.fetchTranscription(id, version - 1)
          oldTranscription.latest = true
          const resOld = await fetch(`api/transcriptions/${oldTranscription.id}/${oldTranscription.version}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(oldTranscription)
          })
          if (resOld.status !== 200) alert('ERROR al modificar la transcripcion')
        }

        const res = await fetch(`api/transcriptions/${id}/${version}`, {
          method: 'DELETE'
        })
        res.status === 200 ? alert('Transcripcion borrada') : alert('ERROR al borrar la transcripcion')
      }
      this.transcs = await this.fetchTranscriptions()
    },

    // Delete all transcriptions with same id
    async deleteAllTranscriptions(id) {
      if(confirm('¿Seguro quieres borrar ---TODAS--- las transcripciones?')) {
        const res = await fetch(`api/transcriptions/${id}`, {
          method: 'DELETE'
        })
        res.status === 200 ? alert('Transcripciones borradas') : alert('ERROR al borrar las transcripciones')
      }
      this.transcs = await this.fetchTranscriptions()
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
      res.status === 200 ? alert('Transcripcion añadida') : alert('ERROR al añadir la transcripcion')
      this.transcs = await this.fetchTranscriptions()
    },

    // Get the specified transcription to fill the update form
    async updateTranscriptionView(id, version) {
      this.toggleShow(false, true, false)
      const transcription = await this.fetchTranscription(id, version)
      this.updTransc = transcription
      this.versions = this.transcs.filter((transc) => transc.id === id)
      this.versions.reverse()
    },

    // Update the transcription
    async updateTranscription(newTranscription) {
      // Old transcription
      const oldTranscription = await this.fetchTranscription(newTranscription.id, newTranscription.version)
      oldTranscription.latest = false
      const resOld = await fetch(`api/transcriptions/${oldTranscription.id}/${oldTranscription.version}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(oldTranscription)
      })
      if (resOld.status !== 200) alert('ERROR al modificar la transcripcion')

      // New transcription
      const newVersion = newTranscription.version + 1
      const resNew = await fetch(`api/transcriptions/${newTranscription.id}/${newVersion}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newTranscription)
      })
      resNew.status === 200 ? alert('Transcripcion modificada') : alert('ERROR al modificar la transcripcion')
      this.transcs = await this.fetchTranscriptions()
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
    async fetchTranscription(id, version) {
      const res = await fetch(`api/transcriptions/${id}/${version}`)
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
      versions: [],
      showAdd: false,
      showUpdate: false,
      showGet: true,
      updTransc: {},
      oldTransc: {}
    }
  },

  async created () {
    this.transcs = await this.fetchTranscriptions()
  }
}
</script>
