<script setup>
import { ref, reactive, shallowRef, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import NoteList from "./components/NoteList.vue";
import NoteDetail from "./components/NoteDetail.vue";
import NoteCreate from "./components/NoteCreate.vue";
import NavBottom from "./components/NavBottom.vue";
import NavTop from "./components/NavTop.vue";

const currentComponent = shallowRef(NoteList);
const id = ref("");
const isDisabled = ref(true);
const isDisabledCreate = ref(true);
const isSaving = ref(false);
const isSavingCreate = ref(false);
const dataUpdate = ref(null);
const dataCreate = ref(null);
const animation = ref("");
const store = useStore();

onBeforeMount(() => {
  const dataNotes = store.state.note.notes;
  const objData = {
    id: btoa(Math.random().toString()).substr(10, 5),
    title: "Ini Sample Note",
    body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam id, voluptatum numquam quam illum dolores officia deserunt quo veniam ipsa enim voluptatem sequi voluptates alias?",
  };

  if (dataNotes.length == 0) {
    store.commit("note/createNote", objData);

    // localStorage.setItem("notes", JSON.stringify([objData]));
  }
});

const saveData = () => {
  animation.value = "fade";
  store.commit("note/createNote", dataCreate.value);
  currentComponent.value = NoteList;
  isDisabledCreate.value = true;
  isSavingCreate.value = false;
  dataCreate.value = null;
  Swal.fire("Saved!", "", "success");
};

const createData = (val) => {
  dataCreate.value = val;
};

const savingCreate = (val) => {
  isSavingCreate.value = val;
};

const unlockCreate = (val) => {
  isDisabledCreate.value = val;
};

const showNoteCreate = () => {
  animation.value = "fade";
  currentComponent.value = NoteCreate;
};

const showNoteDetail = (val) => {
  animation.value = "fade";
  currentComponent.value = NoteDetail;
  id.value = val;
};

const konfirmasiSave = () => {
  return Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  });
};

const konfirmasiSaveCreate = () => {
  return Swal.fire({
    title: "Do you want to save note?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  });
};

const konfirmasiHapus = () => {
  return Swal.fire({
    title: "Yakin mau hapus?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't save`,
  });
};

const deleteNote = () => {
  animation.value = "fade";
  konfirmasiHapus().then((result) => {
    if (result.isConfirmed) {
      store.commit("note/deleteNote", id.value);
      currentComponent.value = NoteList;
      isDisabled.value = true;
      isSaving.value = false;
      id.value = "";
      Swal.fire("Deleted!", "", "success");
    }
  });
};

const setItem = () => {
  store.commit("note/setItem");
};

const updateData = () => {
  store.commit("note/updateNote", dataUpdate.value);
  // currentComponent.value = NoteList;
  isDisabled.value = true;
  isSaving.value = false;

  Swal.fire({
    icon: "success",
    title: "Your note has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showNoteList = () => {
  if (currentComponent.value == NoteDetail) {
    animation.value = "fade";
    // Save Detail ketika back
    if (isSaving.value == true) {
      konfirmasiSave().then((result) => {
        if (result.isConfirmed) {
          store.commit("note/updateNote", dataUpdate.value);
          currentComponent.value = NoteList;
          isDisabled.value = true;
          isSaving.value = false;
          dataUpdate.value = null;
          id.value = "";
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          currentComponent.value = NoteList;
          isDisabled.value = true;
          isSaving.value = false;
          dataUpdate.value = null;
          id.value = "";
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      currentComponent.value = NoteList;
      isDisabled.value = true;
      isSaving.value = false;
      dataUpdate.value = null;
      id.value = "";
    }
  } else if (currentComponent.value == NoteCreate) {
    animation.value = "fade";
    // Save Create ketika back
    if (isSavingCreate.value == true) {
      konfirmasiSaveCreate().then((result) => {
        if (result.isConfirmed) {
          store.commit("note/createNote", dataCreate.value);
          currentComponent.value = NoteList;
          isDisabledCreate.value = true;
          isSavingCreate.value = false;
          dataCreate.value = null;
          id.value = "";
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          currentComponent.value = NoteList;
          isDisabledCreate.value = true;
          isSavingCreate.value = false;
          dataCreate.value = null;
          id.value = "";
          Swal.fire("Note are not saved", "", "info");
        }
      });
    } else {
      currentComponent.value = NoteList;
      isDisabledCreate.value = true;
      isSavingCreate.value = false;
      dataCreate.value = null;
      id.value = "";
    }
  }
};

const edit = () => {
  isDisabled.value = !isDisabled.value;
};

const saving = (val) => {
  isSaving.value = val;
};

const updatedData = (obj) => {
  dataUpdate.value = obj;
};
</script>

<template>
  <div class="row justify-content-center px-4 py-0 m-0">
    <div
      class="col-lg-5 col-md-8 col-sm-12 col-12 p-0 parent-container d-flex flex-column"
    >
      <NavTop>
        <template
          v-slot:default
          v-if="currentComponent == NoteDetail ? true : false"
        >
          <transition name="slide-fade" mode="out-in">
            <div class="container-fluid justify-content-between px-2">
              <a
                href="#"
                class="nav-link btn btn-primary text-white btn-sm"
                @click.prevent="showNoteList"
              >
                <i class="bi bi-x-lg"></i>
              </a>

              <div class="d-flex gap-2">
                <a
                  href="#"
                  class="nav-link bg-primary text-white btn-sm"
                  @click.prevent="edit"
                >
                  <template v-if="isDisabled">
                    <i class="bi bi-lock"></i>
                    Lock
                  </template>
                  <template v-else>
                    <i class="bi bi-unlock"></i>
                    Unlock
                  </template>
                </a>
                <a
                  href="#"
                  class="nav-link btn btn-primary text-white btn-sm"
                  @click.prevent="deleteNote"
                >
                  <i class="bi bi-trash"></i>
                  Hapus
                </a>
              </div>
            </div>
          </transition>
        </template>
        <template
          v-slot:default
          v-else-if="currentComponent == NoteCreate ? true : false"
        >
          <transition name="slide-fade" mode="out-in">
            <div class="container-fluid justify-content-end px-2">
              <a
                href="#"
                class="nav-link btn btn-primary text-white btn-sm"
                @click.prevent="showNoteList"
              >
                <i class="bi bi-x-lg"></i>
              </a>
            </div>
          </transition>
        </template>
        <template v-slot:default v-else>
          <div class="container-fluid justify-content-start">
            <a href="#" class="nav-link disabled text-transparent">&nbsp;</a>
          </div>
        </template>
      </NavTop>

      <div class="h-100 child-container border">
        <transition :name="animation" mode="out-in">
          <component
            :is="currentComponent"
            @showNoteDetail="showNoteDetail"
            @back="showNoteList"
            :id="id"
            :isDisabled="isDisabled"
            @isSaving="saving"
            @isSavingCreate="savingCreate"
            @newUpdatedData="updatedData"
            @unlockButtonCreate="unlockCreate"
            @newCreateData="createData"
            @unlockEdit="edit"
          ></component>
        </transition>
      </div>

      <NavBottom>
        <template v-if="currentComponent == NoteDetail ? true : false">
          <div class="container-fluid justify-content-center">
            <a
              href="#"
              class="nav-link btn btn-primary text-white btn-sm"
              :class="{ disabled: !isSaving }"
              @click.prevent="updateData"
            >
              <i class="bi bi-save"></i>
              Simpan
            </a>
          </div>
        </template>
        <template v-else-if="currentComponent == NoteCreate ? true : false">
          <div class="container-fluid justify-content-center">
            <a
              href="#"
              class="nav-link btn btn-primary text-white btn-sm"
              :class="{ disabled: isDisabledCreate }"
              @click.prevent="saveData"
            >
              <i class="bi bi-save"></i>
              &nbsp; Simpan
            </a>
          </div>
        </template>
        <template v-else>
          <div class="container-fluid justify-content-center">
            <a
              href="#"
              class="nav-link bg-primary text-white btn-sm"
              @click.prevent="showNoteCreate"
            >
              <i class="bi bi-plus-lg"></i>
              Buat Note
            </a>
            <!-- <a href="#" class="nav-link" @click="setItem">set data</a> -->
          </div>
        </template>
      </NavBottom>
    </div>
  </div>
</template>

<style scoped>
.kotak {
  height: 1000px;
  background: black;
}
.parent-container {
  height: 100vh;
  position: relative;
  box-sizing: border-box;
}

.child-container {
  overflow-x: hidden;
  overflow-y: auto;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

/* SLIDE RIGHT */
.slide-right-enter-active {
  transition: all 0.3s ease-out;
}

.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-from {
  transform: translateX(400px);
  /* transform:scale(0); */
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(-500px);
  /* transform:scale(2); */
  opacity: 0;
}

/* SLIDE LEFT */
.slide-left-enter-active {
  transition: all 0.3s ease-out;
}

.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  transform: scale(-400px);
  /* transform:scale(2); */
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(400px);
  /* transform:scale(0); */
  opacity: 0;
}

/* FADE OUT */
.fade-out-enter-active {
  transition: all 0.3s ease-out;
}

.fade-out-leave-active {
  transition: all 0.3s ease-out;
}

.fade-out-enter-from {
  transform: scale(0);
  opacity: 0;
}

.fade-out-leave-to {
  transform: scale(0);
  opacity: 0;
}

/* FADE IN */
.fade-in-enter-active {
  transition: all 0.3s ease-out;
}

.fade-in-leave-active {
  transition: all 0.3s ease-out;
}

.fade-in-enter-from {
  transform: scale(1);
  opacity: 0;
}

.fade-in-leave-to {
  transform: scale(1);
  opacity: 0;
}

/* IN */
.in-enter-active {
  transition: all 0.3s ease-out;
}

.in-leave-active {
  transition: all 0.3s ease-out;
}

.in-enter-from {
  transform: scale(2);
  opacity: 0;
}

.in-leave-to {
  transform: scale(2);
  opacity: 0;
}

/* FADE */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: px;
  position: absolute;
  left: 0;
  z-index: -1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #0d6efd;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0d6efd;
}
</style>
