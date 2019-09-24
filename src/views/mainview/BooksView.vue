<template>
  <v-layout wrap row>

    <v-flex xs12 class="mb-3">
      <v-combobox style="display: block"
                  :items="suggestions"
                  auto-select-first
                  :search-input.sync="searchTerm"
                  autofocus
                  label="Search"
      ></v-combobox>
    </v-flex>

    <v-flex xs12 class="mb-3">
      <v-combobox style="display: block"
                  :items="allCategories"
                  v-model="categories"
                  item-value="id"
                  item-text="name"
                  auto-select-first
                  multiple
                  chips
                  deletable-chips
                  clearable
                  label="Categories"
                  @change="search"
      ></v-combobox>
    </v-flex>

    <v-flex
      xs12
      v-for="book in books"
      :key="book.id"
      class="mb-3">
      <booksViewItem :deleteBook="deleteBook" :book="book"></booksViewItem>
    </v-flex>

  </v-layout>
</template>

<script>
  import BooksApi from '../../service/booksApi';
  import CategoriesApi from '../../service/categoriesApi';

  export default {
    name: "BooksView.vue",
    data: () => ({
      books: [],
      searchTerm: '',
      suggestions: [],
      categories: [],
      allCategories: [],
    }),
    components: {
      booksViewItem: () => import('./BooksViewItem'),
    },
    methods: {
      search() {
        const categoryIds = this.categories.map(category => category.id);
        console.log(this.searchTerm, categoryIds);
        BooksApi.search(this.searchTerm, categoryIds)
          .then(({data}) => {
            this.suggestions = data.suggestions;
            this.books = data.books;
          });
      },
      deleteBook(id) {
        this.books = this.books.filter(book => book.id !== id);
      },
    },
    watch: {
      searchTerm() {
        this.search();
      }
    },
    mounted() {
      this.search();
      CategoriesApi.getAll()
        .then(({data}) => this.allCategories = data);
    },
  }
</script>

<style scoped>

</style>
