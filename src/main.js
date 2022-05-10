import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import "./index.css";
const store = createStore({
  state() {
    return {
      items: JSON.parse(localStorage.getItem("TodoList_Local")) || {},
      todo: "",
      selectedIndex: null,
      isEditing: false,
    };
  },
  mutations: {
    addTask(state, todo) {
      if (todo.length) {
        state.items.push({
          content: todo,
        });
      }
      state.todo = "";
    },
    updateTask(state, payload) {
      if (payload.todo.length) {
        state.items.splice(payload.selectedIndex, 1, { content: payload.todo });
      }
      state.todo = "";
    },
    deleteTask(state, selectedIndex) {
      state.items.splice(selectedIndex, 1);
      state.todo = "";
    },
  },
  getters: {
    searchName(state, name) {
      return state.items.filters((m) => m.content === name);
    },
  },
  actions: {
    addTask({ commit }, todo) {
      commit("addTask", todo);
    },
    updateTask({ commit }, payload) {
      commit("updateTask", payload);
    },
    deleteTask({ commit }, selectedIndex) {
      commit("deleteTask", selectedIndex);
    },
  },
});
createApp(App).use(store).use(router).mount("#app");
