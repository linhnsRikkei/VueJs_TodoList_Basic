import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { HTTP } from "./API/Api";
const store = createStore({
  state() {
    return {
      items: [],
      todo: "",
      selectedIndex: null,
      isEditing: false,
      currentSortDir: "asc",
    };
  },
  mutations: {
    async addTask(state, todo) {
      if (todo.length) {
        try {
          await HTTP.post(`Subject/`, {
            content: todo,
          });
          alert("Them thanh cong");
        } catch (error) {
          console.log(error);
        }
      }
      state.todo = "";
    },
    getAllApi(state, items) {
      state.items = items;
    },
    async updateTask(state, payload) {
      if (payload.todo.length) {
        try {
          await HTTP.put(`Subject/${payload.selectedIndex}`, {
            content: payload.todo,
          });
          alert("Cap nhat thanh cong");
        } catch (error) {
          console.log(error);
        }
      }
      state.todo = "";
    },
    async deleteTask(state, selectedIndex) {
      try {
        await HTTP.delete(`Subject/${selectedIndex}`);
        alert("Xoa thanh cong");
      } catch (error) {
        console.log(error);
      }
    },
    sortContentIncrease(state, sortKey) {
      state.currentSortDir = sortKey;
      state.items.sort((a, b) => {
        let modifier = 1;
        if (state.currentSortDir === "desc") modifier = -1;
        if (a.content < b.content) return -1 * modifier;
        if (a.content > b.content) return modifier;
        return state.items;
      });
    },
  },
  getters: {
    AllList(state) {
      return state.items.length;
    },
    getItems(state) {
      return state.items;
    },
  },
  actions: {
    addTask({ commit }, todo) {
      commit("addTask", todo);
    },
    async getAllApi({ commit }) {
      try {
        const res = await HTTP.get(`Subject`);
        commit("getAllApi", res.data);
      } catch (error) {
        console.log(error);
      }
    },
    updateTask({ commit }, payload) {
      commit("updateTask", payload);
    },
    deleteTask({ commit }, selectedIndex) {
      commit("deleteTask", selectedIndex);
    },
    sortContentIncrease({ commit }, sortKey) {
      commit("sortContentIncrease", sortKey);
    },
  },
});
createApp(App).use(store).use(router).mount("#app");
