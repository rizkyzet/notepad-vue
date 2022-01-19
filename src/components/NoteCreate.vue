<template>
  <div class="px-4 py-3">
    <div class="row justify-content-center">
      <div class="col-lg-12 col-md-7 col-sm-10 col-12" key="create">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            v-model="title"
            placeholder="Title"
          />
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            rows="18"
            v-model="body"
            placeholder="Note"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref } from "vue";

export default {
  emits: ["unlockButtonCreate", "isSavingCreate","newCreateData"],
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
          id:generateId(),
          title:title.value==''? 'No Title':title.value,
          body:body.value
        }
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

<style scoped></style>
