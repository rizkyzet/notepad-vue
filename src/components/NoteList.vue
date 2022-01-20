<template>

 <div class="px-4 py-3">
  <div class="row row-cols-lg-2 row-cols-md-3 row-cols-sm-2 row-cols-1">
    
   
      <div class="col my-3" v-for="note in notes" :key="note.id">
        <div
          class="card h-100 border-primary bg-primary text-white"
          @click.prevent="$emit('showNoteDetail', note.id)"
        >
          <div class="card-body">
            <h5 class="card-title">{{  note.title.length >=30 ?  note.title.slice(0, 30) + "....." : note.title }}</h5>
            <p class="card-text">
              {{ note.body.length >=50 ?  note.body.slice(0, 50) + "....." : note.body }}
            </p>
          </div>
        </div>
      </div>

    
  </div>
 </div>
</template>

<script>
import { useStore, mapState } from "vuex";
import { ref } from "vue";
export default {
 
  computed: {
    ...mapState({
      notes: (state) => state.note.notes,
    }),
  },
  methods: {},
  emits: ["showNoteDetail"],

};
</script>

<style scoped>
.kotak {
  height: 1000px;
  background: black;
}
.card:hover {
  background: #0b5ed7 !important;
  color: white;
  cursor: pointer;
}

/* FADE IN*/
.fade-in-enter-active {
  transition: all 0.5s ease-out;
}

.fade-in-leave-active {
  transition: all 0.5s ease-out;
}

.fade-in-enter-from {
  transform:scale(2);
  /* opacity: 0; */
}

.fade-in-leave-to {
   /* transform:scale(0); */
  /* opacity: 1; */
  transform:scale(2);
}

</style>
