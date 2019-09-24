<template>
  <div >
    <h1>Categories</h1>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left"></th>
            <th class="text-left"></th>
          </tr>
          </thead>
          <tbody>
            <category-item
              v-for="category in categories"
              :key="category.id"
              :category="category"
              :remove-category="removeCategory"
            ></category-item>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
  import CategoriesApi from '../../service/categoriesApi';
  import CategoryItem from './CategoriesItem';

  export default {
    name: "BooksView.vue",
    data: () => ({
      categories: [],
    }),
    components: {
      categoryItem: CategoryItem,
    },
    methods: {
      removeCategory(id) {
        this.categories = this.categories.filter(category => category.id !== id);
      },
    },
    mounted() {
      CategoriesApi.getAll()
        .then((response) => {
          this.categories = response.data;
        });
    },
  }
</script>

<style scoped>

</style>
