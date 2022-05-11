<script>
export default {
  name: "AboutView",
  el: "#todo",
  data() {
    return {
      todo: this.$store.state.todo,
      selectedIndex: this.$store.state.selectedIndex,
      isEditing: this.$store.state.isEditing,
      searchContent: "",
      itemSearch: null,
      sort1: "asc",
      sort2: "desc",
      sort: true,
    };
  },
  // noi tao function binh thg
  methods: {
    AddTodo() {
      this.$store.dispatch("addTask", this.todo),
        (this.todo = ""),
        this.CallApi();
      this.$store.dispatch("getAllApi");
    },
    CallApi() {
      this.$store.dispatch("getAllApi");
    },
    EditItem(item, index) {
      (this.todo = item.content),
        (this.selectedIndex = index),
        (this.isEditing = true);
    },
    UpdateTodo() {
      const payload = {
        todo: this.todo,
        selectedIndex: this.selectedIndex,
      };
      (this.isEditing = false),
        this.$store.dispatch("updateTask", payload),
        (this.todo = ""),
        this.CallApi();
      this.$store.dispatch("getAllApi");
    },
    DeleteItem(id) {
      this.$store.dispatch("deleteTask", id);
      setTimeout(() => {
        this.$store.dispatch("getAllApi");
      }, 1000);
    },
    sortContentIncrease() {
      this.sort = !this.sort;
      var sortKey;
      if (this.sort === true) {
        sortKey = this.sort1;
      } else {
        sortKey = this.sort2;
      }
      this.$store.dispatch("sortContentIncrease", sortKey);
    },
  },
  // function ko co tham so, chay ko can ()
  computed: {
    AllList() {
      return this.$store.getters.AllList;
    },
    searchItem() {
      const search = this.searchContent;
      return this.getItems.filter(function (item) {
        return item.content.toLowerCase().includes(search.toLowerCase());
      });
    },
    getItems() {
      return this.$store.getters.getItems;
    },
  },
  // tao function vs chuc nang theo doi thuoc tinh cua doi tuong
  watch: {
    items: {
      deep: true,
      handler(items) {
        localStorage.setItem("TodoList_Local", JSON.stringify(items));
      }, //hàm này chỉ là lấy dữ liệu mới nhất khi thuộc tính toDos có thay đổi để cập nhập lại vào localStorage
    },
  },
};
</script>
<template>
  <div
    class="about flex flex-col justify-center items-center text-[20px] font-extralight"
  >
    <h1>This is an about page</h1>
    <h2>Todo list</h2>

    <div class="dList text-[20px] flex flex-col justify-center items-center">
      <!-- search -->
      <div class="w-[700px] mb-[20px] flex flex-row justify-start items-center">
        <input
          class="inputText w-full border rounded-lg border-[#030303] outline-none pl-[8px] py-[8px]"
          type="text"
          placeholder="Search name subject"
          v-model="searchContent"
        />
      </div>
      <!-- Add, Update-->
      <div
        v-if="!isEditing"
        class="w-[700px] flex flex-row justify-between mb-[20px]"
      >
        <input
          class="inputText w-[300px] border rounded-lg border-[#050505] outline-none mr-[30px] pl-[8px] py-[8px]"
          type="text"
          placeholder="Name subject"
          v-model="todo"
          v-on:keyup.enter="AddTodo"
        />
        <input
          class="inputSubmit text-rose-800 border border-gray-500 w-[100px]"
          type="submit"
          value="Add"
          v-on:click="AddTodo"
        />
      </div>
      <!-- update-->
      <div v-else class="w-[700px] flex flex-row justify-between">
        <input
          class="inputText w-[300px] border rounded-lg border-[#e04949] outline-none mr-[30px] pl-[8px] py-[8px]"
          type="text"
          v-model="todo"
          v-on:keyup.enter="UpdateTodo"
        />
        <input
          class="inputSubmit text-rose-800 border border-gray-500 w-[100px]"
          type="submit"
          value="Update"
          @click="UpdateTodo"
        />
      </div>
      <!-- San xep theo content -->
      <button
        @click="sortContentIncrease()"
        class="w-[150px] border border-[#070707] mt-[20px]"
      >
        Sap xep
      </button>
      <!-- list -->
      <ol id="demo" class="w-[700px] mt-[20px]">
        <button @click="CallApi" class="mb-[10px] border p-[5px]">
          CallApi
        </button>
        <h2>Tổng danh sách list: {{ AllList }}</h2>
        <li
          v-for="item in searchItem"
          v-bind:key="item"
          class="flex flex-row justify-around py-[5px] border-y-[1px] hover:bg-[#e0dddd]"
        >
          <div class="w-[400px] text-[#0c0c0c]">
            {{ item.content }}
          </div>
          <div class="w-[200px] flex flex-row justify-around">
            <button @click="EditItem(item, item.id)" class="border p-[10px]">
              Edit
            </button>
            <button @click="DeleteItem(item.id)" class="border p-[10px]">
              Delete
            </button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
