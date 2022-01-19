<template>
  <div class="px-4 py-3">
    <div class="row justify-content-center">
      <div class="col-lg-12 col-md-7 col-sm-10 col-12" :key="note.id">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            v-model="title"
            :disabled="isDisabled"
            ref="domTitle"
          />
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            rows="18"
            v-model="body"
            :disabled="isDisabled"
            ref="domBody"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, reactive, watch, onUpdated } from "vue";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["back", "isSaving", "newUpdatedData"],
  setup(props, context) {
    const store = useStore();
    const note = store.state.note.notes.find((note) => note.id === props.id);
    const title = ref(note.title);
    const body = ref(note.body);
    const domTitle = ref(null);
    const domBody = ref(null);

    // onUpdated(() => {
    //   // props.isDisabled == false ? domBody.value.focus() : false;
    // });

    // watch([props.isDisabled], (newVal, preVal) => {
    //   console.log('berubah')
    //   props.isDisabled[0] == false ? domBody.value.focus() : false;
    // });

    watch([title, body], (newValues, prevValues) => {
      if (note.title != newValues[0] || note.body != newValues[1]) {
        const newData = {
          id: props.id,
          title: title.value,
          body: body.value,
        };
        context.emit("isSaving", true);
        context.emit("newUpdatedData", newData);
      } else {
        context.emit("isSaving", false);
      }
    });

    const disabled = ref(true);
    return {
      note,
      title,
      body,
      domTitle,
      disabled,
      domBody,
    };
  },
};
</script>

<style scoped>
input,
textarea {
  background: white;
  border: 0;
}
</style>
