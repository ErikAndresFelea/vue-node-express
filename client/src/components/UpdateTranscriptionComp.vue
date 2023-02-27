<template>
  <div>
    <div class="d-flex justify-content-center py-3">
      <h2>Modificar transcripcion</h2>
    </div>

    <div>
      <label class="xxol">Versiones</label>
      <div class="d-flex justify-content-center py-3">
        <VersionTableComp
          @reset-version="resetVersion"
          @show-version="showVersion"
          :versions="versions"
        />
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label for="block" class="form-label">Bloque</label>
          <input
            class="form-control"
            placeholder="Bloque"
            id="block"
            v-model="updTransc.block"
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
            v-model="updTransc.unit"
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
            v-model="updTransc.title"
            type="text"
            required
          />
        </div>
        <div class="mb-3">
          <label for="text" class="form-label">Transcripcion</label>
          <textarea
            class="form-control"
            placeholder="Introduce el contenido de la transcripcion"
            id="text"
            v-model="updTransc.text"
            type="text"
            required
          ></textarea>
        </div>
        <div class="d-flex justify-content-center">
          <ButtonComp
            type="submit"
            class="btn btn-sm btn-outline-success"
            :text="'Modificar'"
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
import VersionTableComp from "./VersionTableComp.vue";

export default {
  name: "UpdateTranscriptionComp",

  components: {
    ButtonComp,
    VersionTableComp,
  },

  props: {
    updTransc: Object,
    versions: Array,
  },

  methods: {
    onSubmit() {
      const newUpdTransc = {
        id: this.updTransc.id,
        version: this.updTransc.version,
        latest: true,
        block: this.updTransc.block,
        unit: this.updTransc.unit,
        title: this.updTransc.title,
        text: this.updTransc.text,
      };

      this.$emit("upd-transc", newUpdTransc);
      this.showGet();
    },

    showGet() {
      this.$emit("show-get-u");
      this.reset();
    },

    reset() {
      (this.block = ""), (this.unit = ""), (this.title = ""), (this.text = "");
    },

    async showVersion(showVersion) {
      (this.updTransc.block = showVersion.block),
        (this.updTransc.unit = showVersion.unit),
        (this.updTransc.title = showVersion.title),
        (this.updTransc.text = showVersion.text);
    },

    // Resets current version to the choosen version
    async resetVersion(resetVersion) {
      if (confirm("¿Seguro quieres RESTAURAR esta transcripcion?")) {
        const res = await fetch(
          `api/transcriptions/${resetVersion.id}/${resetVersion.version}`,
          {
            method: "DELETE",
          }
        );
        if (res.status !== 200) alert("ERROR al borrar las transcripciones");

        // Update the reseted version
        resetVersion.latest = true;
        const resOld = await fetch(
          `api/transcriptions/${resetVersion.id}/${resetVersion.version}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(resetVersion),
          }
        );

        // Update version table
        const start = resetVersion.version;
        const end = this.versions.length;
        for (var i = start; i < end; i++) {
          this.versions.shift();
        }

        this.updTransc.version = this.versions.length;

        resOld.status === 200
          ? alert("Transcripcione restaurada")
          : alert("ERROR al restaurar la transcripcion");
      }

      this.showVersion(resetVersion);
      this.$emit("reset");
    },
  },

  emits: ["show-get-u", "upd-transc", "reset-version", "show-version", "reset"],
};
</script>

<style scoped>
label {
  font-weight: bold;
}

form, .xxol {
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
