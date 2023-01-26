<template>
  <div>
    <h2>Transcripciones</h2>
    <div>
      <AllTranscriptionsComp :transcs="transc"/>
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
import AllTranscriptionsComp from '../components/AllTranscriptionsComp.vue'

export default {
  name: 'Home',
  
  components: {
    ButtonComp,
    AllTranscriptionsComp
  },

  data () {
    return {
      transc: []
    }
  },

  created () {
    this.transc = [
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
