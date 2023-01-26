<template>
  <div class="app-content">
    <h2>Iniciar sesion</h2>
    <form @submit="login">
      <div class="form-group">
        <input placeholder="Introduce tu usuario" id="username" v-model="username" type="text" required>
      </div>
      <div class="form-group">
        <input placeholder="Introduce tu contraseña" id="password" v-model="password" type="password" required>
      </div>
      <div class="form-group">
        <router-link to="/home">
          <!-- <ButtonComp @click="login" :text="'Iniciar sesion'" :color="'green'" /> -->
          <ButtonComp class="confirm-button" :text="'Iniciar sesion'" />
        </router-link>
      </div>
      <div class="form-group" style="padding: 0px;">
        <router-link to="/register">
          <h6 style="margin: 0px">o registrate</h6>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import ButtonComp from '../components/ButtonComp.vue'

export default {
  name: 'Login',
  
  components: {
    ButtonComp
  },

  data () {
    return {
      username: '',
      password: ''
    }
  },

  // Not working yet
  methods: {
    async login () {
      await AuthenticationService.register({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
