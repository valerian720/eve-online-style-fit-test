<template>
  <div class="m-1 m-1">
    <div
      class="card"
      @drop.prevent="onDrop"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="card-body">
        <h4 class="card-title">Редактор {{ name }}</h4>
        <div
          class="row g-3 align-items-center py-1"
          v-for="field in Object.keys(constructable).filter(
            (v) => !systemFields.includes(v)
          )"
          :key="field"
        >
          <div class="col-auto">
            <label class="col-form-label">{{ field }}</label>
          </div>
          <div class="col-auto">
            <input
              v-if="typeof constructable[field] == 'number'"
              class="form-control"
              v-model.number="constructable[field]"
              @change="changeField"
            />
            <input
              v-else
              class="form-control"
              v-model="constructable[field]"
              @change="changeField"
            />
          </div>
          <div class="col-auto p-0">
            <!-- <button class="btn btn-danger">
              <span class="badge bg-danger">X</span>
            </button> -->
          </div>
        </div>
        <!-- <button class="btn btn-primary">
          Добавить поле <span class="badge bg-primary">+</span>
        </button> -->
        <div class="col p-1 m-1">
          <button
            type="button"
            @click="exportData()"
            class="btn btn-outline-success p-1 m-1"
          >
            экспорт
          </button>
          <button
            type="button"
            @click="importData()"
            class="btn btn-outline-warning p-1 m-1"
          >
            импорт
          </button>
          <input
            type="file"
            ref="file"
            style="display: none"
            accept=".json,application/json"
            @change="fileUploaded()"
          />
        </div>
        <p>так же работает drag and drop экспортируемого файла</p>
      </div>
    </div>
  </div>
</template>
<script>
import download from "downloadjs";
/*
основная идея:
- на вход пустой/не пустой объект
- на выходе заполненный объект с доп полями, которые указал пользователь
*/
export default {
  name: "ObjectCreator",
  props: {
    constructable: Object,
    name: String,
  },
  emits: ["objChanged"],

  data() {
    return {
      systemFields: ["usedSlots", "slots"],
    };
  },

  methods: {
    changeField() {
      this.$emit("objChanged");
    },
    exportData() {
      download(
        JSON.stringify(this.constructable),
        `${this.constructable.name}-export.json`,
        "text/plain"
      );
    },
    importData() {
      this.$refs.file.click();
    },

    onDrop(e) {
      this.$refs.file.files = e.dataTransfer.files;
      this.fileUploaded();
    },

    fileUploaded() {
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target.result);
        let json = JSON.parse(e.target.result);
        console.log(json);
        this.applyChangesToConstructable(json);
      };
      if (this.$refs.file.files.length > 0) {
        reader.readAsText(this.$refs.file.files[0]);
      }
    },
    applyChangesToConstructable(newObj) {
      let fields = Object.keys(newObj);
      //   .filter(
      //   (v) => !this.systemFields.includes(v)
      // );

      for (const newFieldIndex in fields) {
        let newField = fields[newFieldIndex];
        this.constructable[newField] = newObj[newField];
        console.log(this.constructable[newField], newField);
      }
      this.changeField();
    },
  },
};
</script>
<style lang="less"></style>
