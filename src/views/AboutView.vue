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
    Alert() {
      alert("load ....");
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
      <div v-if="!isEditing">
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
          @click="AddTodo"
        />
      </div>
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
      <ol id="demo" class="w-[700px]">
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
            <button v-on:click="Alert" class="border p-[10px]">Alert</button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
