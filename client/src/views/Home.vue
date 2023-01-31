<template>
  <div>
    <AddTranscriptionComp @show-get-a="toggleShow(false, false, true)" @add-transc="addTranscription" v-show="showAdd"/>
  </div>
  <div>
    <UpdateTranscriptionComp @show-get-u="toggleShow(false, false, true)" v-show="showUpdate"/>
  </div>
  <div>
    <AllTranscriptionsComp @show-update="toggleShow(false, true, false)" @show-add="toggleShow(true, false, false)" @delete-transc="deleteTranscription" :transcs="transcs"  v-show="showGet"/>
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
    deleteTranscription(id) {
      if(confirm('¿Seguro quieres borrar esta transcripicon?')) {
        this.transcs = this.transcs.filter((transc) => transc.id !== id)
      }
    },

    addTranscription(transcripcion) {
      this.transcs = [...this.transcs, transcripcion]
    },

    toggleShow(add, update, get) {
      this.showAdd = add,
      this.showUpdate = update,
      this.showGet = get
    }
  },
  
  emits: [
    'delete-transc', 'show-get-a', 'show-get-u', 'show-add', 'show-update'
  ],

  data () {
    return {
      transcs: [],
      showAdd: false,
      showUpdate: false,
      showGet: true
    }
  },

  created () {
    this.transcs = [
      {
        id: 0,
        block: 'Bloque 1 | Introduccion a las criptomonedas',
        elective: '',
        unit: 'U1 | Criptomonedas, el inicio de la revolucion',
        title: '¿Que son las criptomonedas? | Leif Ferreira'
      },
      {
        id: 1,
        block: 'Bloque 1 | Introduccion a las criptomonedas',
        elective: '',
        unit: 'U1 | Criptomonedas, el inicio de la revolucion',
        title: 'U1 | 2.1 | La crisis financiera de 2008'
      },
      {
        id: 2,
        block: 'Bloque 1 | Introduccion a las criptomonedas',
        elective: '',
        unit: 'U3 | Mineria de criptomonedas',
        title: 'Lucas Guasch | Mineria de criptomonedas'
      },
      {
        id: 3,
        block: 'Bloque 1 | Introduccion a las criptomonedas',
        elective: '',
        unit: 'Xperts | Etherum Foundation',
        title: 'Xperts | Etherum Foundation'
      },
      {
        id: 4,
        block: 'Bloque 4 | Ecosistema DeFi',
        elective: 'Electiva 1',
        unit: 'U1',
        title: 'Ecosistma Defi | Eduardo Goig'
      },
      {
        id: 5,
        block: 'Bloque 4 | Ecosistema DeFi',
        elective: '',
        unit: 'Evaluacion bloque 4',
        title: 'Autoevaluacion Bloque 4'
      }
    ]
  }
}
</script>
