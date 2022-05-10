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
      searchContent: "",
      itemDetail: null,
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
    searchTask(state, searchContent) {
      (state.itemDetail = null),
        (state.itemDetail = state.items.filter(
          (item) => item.content.toLowerCase() == searchContent.toLowerCase()
        ));
      console.log(state.itemDetail);
    },
  },
  getters: {
    AllList(state) {
      return state.items.length;
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
    searchTask({ commit }, searchContent) {
      commit("searchTask", searchContent);
    },
  },
});
createApp(App).use(store).use(router).mount("#app");
