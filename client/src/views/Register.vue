<template>
  <div class="app-content">
    <h2>Formulario de registro</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <input placeholder="Elige tu nombre de usuario" id="username" v-model="username" type="text" required>
      </div>
      <div class="form-group">
        <input placeholder="Escoge una contraseña" id="password" v-model="password" type="password" required>
      </div>
      <div class="form-group">
        <input placeholder="Repite la contraseña" id="confPassword" v-model="confPassword" type="password" required>
      </div>
      <div class="form-group">
        <ButtonComp class="confirm-button" @click="register" :text="'Registrarse'" />
        <router-link to="/">
          <ButtonComp class="cancel-button" :text="'Cancelar'" />
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ButtonComp from '../components/ButtonComp.vue'

export default {
  components: {
    ButtonComp
  },

  data () {
    return {
      username: '',
      password: '',
      confPassword: ''
    }
  },
}
</script>
