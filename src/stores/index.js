import {
    createStore
} from "vuex";
import note from "./note";

export const store = createStore({
    modules: {
        note
    }
})