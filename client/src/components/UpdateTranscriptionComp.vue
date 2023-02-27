<template>
  <div style="display: flex; justify-content: center">
    <div class="d-flex flex-column justify-content-center" style="width: 50%">
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        "
      >
        <h2>Modificar transcripcion</h2>
      </div>

      <div
        style="
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 1rem;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        "
      >
        <ButtonComp
          class="btn btn-sm btn-outline-primary"
          :text="'Versiones'"
          @btn-click="toggleVersion"
        />
        <div style="width: 100%">
          <VersionTableComp
            @reset-version="resetVersion"
            @show-version="showVersion"
            :versions="versions"
            v-show="dislplayVersions"
          />
        </div>
      </div>

      <div style="width: 100%; display: flex">
        <form @submit.prevent="onSubmit" style="width: 100%">
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
          <div
            class="d-flex justify-content-center"
            style="
              flex-direction: row;
              gap: 16px;
              justify-content: center;
              margin-bottom: 1rem;
            "
          >
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
      this.dislplayVersions = false
    },

    toggleVersion() {
      this.dislplayVersions = !this.dislplayVersions;
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

  data() {
    return {
      dislplayVersions: false,
    };
  },
};
</script>

<style scoped>
button {
  min-width: 5rem;
}

label {
  font-weight: bold;
}

textarea {
  height: 40vh;
  resize: none;
  margin-bottom: 1rem;
}
</style>
