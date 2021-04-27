import { createStore } from "vuex";
import State from "./modules/state";

export default createStore({
  modules: {
    State,
  },
});
