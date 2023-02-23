<template>
  <div>
    <div class="d-flex justify-content-center py-3">
      <h2>Añadir transcripcion</h2>
    </div>
    <div  class="d-flex justify-content-center">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="url" class="form-label">URL Publica</label>
          <input
            v-model="url"
            type="text"
            class="form-control"
            id="url"
            placeholder="http://ab8a-104-196-67-88.ngrok.io"
            required
          />
        </div>
        <div class="mb-3">
          <label for="path" class="form-label">Path al audio</label>
          <input
            v-model="path"
            type="text"
            class="form-control"
            id="path"
            placeholder="/bloque/unidad/audio.x"
            required
          />
        </div>
        <div class="d-flex justify-content-center">
          <ButtonComp
            type="submit"
            class="btn btn-sm btn-outline-success"
            :text="'Continuar'"
          />
          <ButtonComp
            type="reset"
            @btn-click="showGet"
            class="btn btn-sm btn-outline-danger"
            :text="'Cancelar'"
          />
        </div>
      </form>
    </div>
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
input {
  font-style: italic;
}

label {
  font-weight: bold;
}

form {
  max-width: 45rem;
  min-width: 50%;
}
</style>
