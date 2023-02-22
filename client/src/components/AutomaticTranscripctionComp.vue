<template>
  <div>
    <form @submit.prevent="onSubmit">
      <h2>Añadir transcripcion</h2>
      <div>
        <input
          placeholder="URL Publica"
          id="url"
          v-model="url"
          type="text"
          required
        />
      </div>
      <div>
        <input
          placeholder="Path al audio - /bloque/unidad/audio.x "
          id="path"
          v-model="path"
          type="text"
          required
        />
      </div>
      <div>
        <ButtonComp type="submit" class="confirm-button" :text="'Continuar'" />
        <ButtonComp
          type="reset"
          @btn-click="showGet"
          class="cancel-button"
          :text="'Cancelar'"
        />
      </div>
    </form>
  </div>
</template>

<script>
import ButtonComp from "./ButtonComp.vue";

export default {
  name: "AutomaticTranscripctionComp",

  components: {
    ButtonComp,
  },

  methods: {
    onSubmit() {
      const public_url = this.url;
      const audio_path = this.path;
      this.$emit("auto-transc", public_url, audio_path);
    },

    showGet() {
      this.$emit("show-get-home");
      this.reset();
    },

    reset() {
      (this.url = ""), (this.path = "");
    },
  },

  data() {
    return {
      url: "",
      path: "",
    };
  },

  emits: ["auto-transc", "show-get-home"],
};
</script>

<style scoped>
div {
  padding: 5px;
}
</style>
