<script>
export default {
  name: "AboutView",
  el: "#todo",
  data() {
    return {
      items: this.$store.state.items,
      todo: this.$store.state.todo,
      selectedIndex: this.$store.state.selectedIndex,
      isEditing: this.$store.state.isEditing,
      itemDetail: this.$store.state.itemDetail,
      searchContent: this.$store.state.searchContent,
    };
  },
  // noi tao function binh thg
  methods: {
    AddTodo() {
      this.$store.dispatch("addTask", this.todo), (this.todo = "");
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
        (this.todo = "");
    },
    DeleteItem(index) {
      this.$store.dispatch("deleteTask", index);
    },
    SearchItem() {
      this.$store.dispatch("searchTask", this.searchContent);
    },
  },
  computed: {
    AllList() {
      return this.$store.getters.AllList;
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
      <!-- Add, Update-->
      <div v-if="!isEditing" class="w-[700px] flex flex-row justify-between">
        <input
          class="inputText w-[300px] border border-[#e04949] outline-none mr-[30px] pl-[8px] py-[8px]"
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
      <div v-else>
        <input
          class="inputText w-[300px] border border-[#e04949] outline-none mr-[30px] pl-[8px] py-[8px]"
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
      <!-- search -->
      <div class="w-[700px] flex flex-row justify-between">
        <input
          class="inputText w-[300px] border border-[#e04949] outline-none mr-[30px] pl-[8px] py-[8px]"
          type="text"
          placeholder="Name subject"
          v-model="searchContent"
          v-on:keyup.enter="SearchItem"
        />
        <input
          class="inputSubmit text-rose-800 border border-gray-500 w-[200px]"
          type="submit"
          value="Search Content"
          v-on:click="SearchItem"
        />
      </div>
      <!-- item detail -->
      <ol v-if="itemDetail" id="demo" class="w-[700px] mt-[20px]">
        <h2>Todo tìm kiếm</h2>
        <li
          v-bind:key="itemDetail"
          class="flex flex-row justify-around py-[5px] border-y-[1px] hover:bg-[#e0dddd]"
        >
          <div class="w-[400px] text-[#0c0c0c]">
            {{ itemDetail }}
          </div>
        </li>
      </ol>
      <!-- list -->
      <ol id="demo" class="w-[700px] mt-[20px]">
        <h2>Tổng danh sách list: {{ AllList }}</h2>
        <li
          v-for="(item, index) in items"
          v-bind:key="item"
          class="flex flex-row justify-around py-[5px] border-y-[1px] hover:bg-[#e0dddd]"
        >
          <div class="w-[400px] text-[#0c0c0c]">
            {{ item.content }}
          </div>
          <div class="w-[200px] flex flex-row justify-around">
            <button @click="EditItem(item, index)" class="border p-[10px]">
              Edit
            </button>
            <button @click="DeleteItem(index)" class="border p-[10px]">
              Delete
            </button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
