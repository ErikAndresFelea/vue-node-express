<template>
  <div>
    <form @submit.prevent="onSubmit">
      <h2>Añadir transcripcion</h2>
      <div>
        <input
          placeholder="Bloque"
          id="block"
          v-model="auto.block"
          type="text"
          required
        />
      </div>
      <div>
        <input
          placeholder="Capitulo"
          id="unit"
          v-model="auto.unit"
          type="text"
          required
        />
      </div>
      <div>
        <input
          placeholder="Introduce el titulo de la trancripcion"
          id="title"
          v-model="auto.title"
          type="text"
          required
        />
      </div>
      <div>
        <textarea
          style="height: 40vh; resize: none"
          placeholder="Introduce el contenido de la transcripcion"
          id="text"
          v-model="auto.text"
          type="text"
          required
        ></textarea>
      </div>
      <div>
        <ButtonComp type="submit" class="confirm-button" :text="'Añadir'" />
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
div {
  padding: 5px;
}
</style>
