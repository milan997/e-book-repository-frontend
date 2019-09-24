<template>
<!--  <tr v-for="category in categories" :key="category.id">-->
  <tr>
    <td
      width="70%"
      v-if="!editMode"
    >{{ category.name }}</td>
    <td
      width="70%"
      v-else
    >
      <v-text-field
        type="text"
        :rules="this.rules.required"
        v-model="editRequest.name"
      ></v-text-field>
    </td>
    <template v-if="!editMode">
      <td>
        <v-form
          @submit.prevent.stop="editMode = true"
        >
          <v-btn
            class="px-7"
            type="submit"
            color="yellow darken-2"
            id="edit"
          >Edit</v-btn>
        </v-form>
      </td>
      <td>
        <v-form
          @submit.prevent.stop="deleteCategory"
        >
          <v-btn
            class="px-4"
            type="submit"
            color="yellow darken-3"
            id="delete"
          >Delete</v-btn>
        </v-form>
      </td>
    </template>
    <template v-else>
      <td>
        <v-form
          @submit.prevent.stop="editCategory"
        >
          <v-btn
            class="px-4"
            type="submit"
            color="yellow darken-2"
            id="submit"
          >Submit</v-btn>
        </v-form>
      </td>
      <td>
        <v-form
          @submit.prevent.stop="editMode = false"
        >
          <v-btn
            class="px-4"
            type="submit"
            color="yellow darken-3"
            id="cancel"
          >Cancel</v-btn>
        </v-form>
      </td>
    </template>
  </tr>
</template>

<script>
  import CategoryApi from '../../service/categoriesApi';

  export default {
    name: "CategoriesItem",
    props: {
      category: Object,
      removeCategory: Function,
    },
    data() {
      return {
        editMode: false,
        rules: {
          required: [value => !!value || "Required."],
        },
        editRequest: {
          name: this.category.name,
        }
      }
    },
    methods: {
      editCategory() {
        CategoryApi.update(this.category.id, this.editRequest)
          .then((response) => {
            this.editMode = false;
            this.category.name = this.editRequest.name;
          });
      },
      deleteCategory() {
        CategoryApi.delete(this.category.id)
          .then((response) => this.removeCategory(this.category.id));
      },
    },
  }
</script>

<style scoped>

</style>
