<template>
  <div>
    <div class="d-flex justify-content-center py-3">
      <h2>Añadir transcripcion</h2>
    </div>
    <div class="d-flex justify-content-center">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="block" class="form-label">Bloque</label>
          <input
            class="form-control"
            placeholder="Bloque"
            id="block"
            v-model="auto.block"
            type="text"
            required
          />
        </div>
        <div class="mb-3">
          <label for="unit" class="form-label">Unidad</label>
          <input
            class="form-control"
            placeholder="Unidad"
            id="unit"
            v-model="auto.unit"
            type="text"
            required
          />
        </div>
        <div class="mb-3">
          <label for="title" class="form-label">Titulo</label>
          <input
            class="form-control"
            placeholder="Introduce el titulo de la trancripcion"
            id="title"
            v-model="auto.title"
            type="text"
            required
          />
        </div>
        <div>
          <label for="text" class="form-label">Transcripcion</label>
          <textarea
            class="form-control"
            placeholder="Introduce el contenido de la transcripcion"
            id="text"
            v-model="auto.text"
            type="text"
            required
          ></textarea>
        </div>
        <div class="d-flex justify-content-center">
          <ButtonComp
            type="submit"
            class="btn btn-sm btn-outline-success"
            :text="'Añadir'"
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
  name: "AddTranscriptionComp",

  components: {
    ButtonComp,
  },

  props: {
    auto: Object,
  },

  methods: {
    onSubmit() {
      const newTransc = {
        version: 1,
        latest: true,
        block: this.auto.block,
        unit: this.auto.unit,
        title: this.auto.title,
        text: this.auto.text,
      };

      this.$emit("add-transc", newTransc);
      this.showGet();
    },

    showGet() {
      this.$emit("show-get-a");
      this.reset();
    },

    reset() {
      (this.block = ""), (this.unit = ""), (this.title = ""), (this.text = "");
    },
  },

  data() {
    return {
      block: "",
      unit: "",
      title: "",
      text: "",
    };
  },

  emits: ["add-transc", "show-get-a"],
};
</script>

<style scoped>
label {
  font-weight: bold;
}

form {
  max-width: 45rem;
  min-width: 50%;
}

button {
  width: 5rem;
  margin-left: 1rem !important;
  margin-right: 1rem !important;
  margin-bottom: 1rem !important;
}

textarea {
  height: 40vh;
  resize: none;
  margin-bottom: 1rem;
}
</style>
