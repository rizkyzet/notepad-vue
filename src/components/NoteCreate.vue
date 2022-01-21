<template>
  <div class="px-0 py-0 h-100">
    <div class="row justify-content-center h-100">
      <div
        class="col-12 d-flex flex-column h-100"
        key="create"
      >
        <input
          type="text"
          class="input-zet fs-5"
          v-model="title"
          placeholder="Title"
          autofocus
        />

        <div class="flex-fill">
          <textarea
            class="input-zet h-100"
            rows="0"
            v-model="body"
            placeholder="Your note..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";

export default {
  emits: ["unlockButtonCreate", "isSavingCreate", "newCreateData"],
  setup(props, context) {
    const title = ref("");
    const body = ref("");
    const generateId = () => {
      return btoa(Math.random().toString()).substr(10, 5);
    };

    watch([title, body], (newVal, prevVal) => {
      if (newVal[0] == "" && newVal[1] == "") {
        context.emit("unlockButtonCreate", true);
        context.emit("isSavingCreate", false);
      } else {
        const newObj = {
          id: generateId(),
          title: title.value == "" ? "No Title" : title.value,
          body: body.value,
        };
        context.emit("unlockButtonCreate", false);
        context.emit("isSavingCreate", true);
        context.emit("newCreateData", newObj);
      }
    });

    return {
      title,
      body,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-zet {
  width: 100%;
  outline: 0;
  border: 0;
  position: relative;
  box-sizing: border-box;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;

  &:focus {
    border: 0;
    outline: 0;
   
  }
}
</style>
