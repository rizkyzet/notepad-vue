<script setup>
import { ref, reactive, shallowRef } from "vue";
import { useStore } from "vuex";
import NoteList from "./components/NoteList.vue";
import NoteDetail from "./components/NoteDetail.vue";
import NoteCreate from "./components/NoteCreate.vue";
import NavBottom from "./components/NavBottom.vue";
import NavTop from "./components/NavTop.vue";

const currentComponent = shallowRef(NoteList);
const id = ref("");
const isDisabled = ref(true);
const isSaving = ref(false);
const dataUpdate = ref(null);
const animation = ref("");
const store = useStore();

const showNoteCreate = () => {
  animation.value = "slide-left";
  currentComponent.value = NoteCreate;
};

const showNoteDetail = (val) => {
  animation.value = "slide-right";
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

const konfirmasiHapus = () => {
  return Swal.fire({
    title: "Yakin mau hapus?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't save`,
  });
};

const deleteNote = () => {
  konfirmasiHapus().then((result) => {
    if (result.isConfirmed) {
      store.commit("note/deleteNote", id.value);
      currentComponent.value = NoteList;
      isDisabled.value = true;
      isSaving.value = false;
      id.value = "";
    }
  });
};

const setItem = () => {
  store.commit("note/setItem");
};

const savingData = () => {
  store.commit("note/updateNote", dataUpdate.value);
  isDisabled.value = true;
  isSaving.value = false;
  Swal.fire({
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
};

const showNoteList = () => {

  if (currentComponent.value == NoteDetail) {
    animation.value = "slide-left";
  }else if (currentComponent.value == NoteCreate){
    animation.value = "slide-right";
  }
  
  if (isSaving.value == true) {
    konfirmasiSave().then((result) => {
      if (result.isConfirmed) {
        store.commit("note/updateNote", dataUpdate.value);
        currentComponent.value = NoteList;
        isDisabled.value = true;
        isSaving.value = false;
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        currentComponent.value = NoteList;
        isDisabled.value = true;
        isSaving.value = false;
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  } else {
    currentComponent.value = NoteList;
    isDisabled.value = true;
    isSaving.value = false;
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
      class="col-lg-5 col-md-10 col-sm-12 col-12 p-0 parent-container d-flex flex-column"
    >
      <NavTop>
        <template
          v-slot:default
          v-if="currentComponent == NoteDetail ? true : false"
        >
          <transition name="slide-fade" mode="out-in">
            <div class="container-fluid justify-content-between">
              <a
                href="#"
                class="nav-link btn btn-primary text-white btn-sm"
                @click="showNoteList"
              >
                <i class="bi bi-chevron-left"></i>
              </a>

              <div class="d-flex gap-2">
                <a
                  href="#"
                  class="nav-link btn btn-primary text-white btn-sm"
                  :class="{ disabled: !isSaving }"
                  @click="savingData"
                >
                  <i class="bi bi-save"></i>
                </a>
                <a
                  href="#"
                  class="nav-link btn btn-primary text-white btn-sm"
                  @click="deleteNote"
                >
                  <i class="bi bi-trash"></i>
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
          <div class="container-fluid justify-content-end">
            <a
              href="#"
              class="nav-link btn btn-primary text-white btn-sm"
              @click="showNoteList"
            >
              <i class="bi bi-chevron-right"></i>
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
            @newUpdatedData="updatedData"
          ></component>
        </transition>
      </div>

      <NavBottom>
        <template v-if="currentComponent == NoteDetail ? true : false">
          <div class="container-fluid justify-content-center">
            <a
              href="#"
              class="nav-link bg-primary text-white rounded-circle"
              @click="edit"
            >
              <template v-if="isDisabled">
                <i class="bi bi-lock"></i>
              </template>
              <template v-else>
                <i class="bi bi-unlock"></i>
              </template>
            </a>
          </div>
        </template>
        <template v-else>
          <div class="container-fluid justify-content-center">
            <a
              href="#"
              class="nav-link bg-primary text-white rounded-circle"
              @click="showNoteCreate"
            >
              <i class="bi bi-plus-lg"></i>
            </a>
            <a href="#" class="nav-link" @click="setItem">set data</a>
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
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active {
  transition: all 0.5s ease-out;
}

.slide-right-leave-active {
  transition: all 0.5s ease-out;
}

.slide-right-enter-from {
  transform: translateX(400px);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(-500px);
  opacity: 0;
}

.slide-left-enter-active {
  transition: all 0.5s ease-out;
}

.slide-left-leave-active {
  transition: all 0.5s ease-out;
}

.slide-left-enter-from {
  transform: translateX(-400px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(400px);
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
