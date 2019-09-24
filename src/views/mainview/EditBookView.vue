<template>
  <div>
    <h1>Edit book:</h1>
    <div>
      <v-form
        ref="form"
        @submit.prevent.stop="submit"
        v-model="formValid"
        :lazy-validation="false"
      >
        <v-text-field
          label="Title"
          :rules="this.rules.required"
          :disabled="loading"
          v-model="request.title"
        ></v-text-field>
        <v-text-field
          label="Author"
          :rules="this.rules.required"
          :disabled="loading"
          v-model="request.author"
        ></v-text-field>
        <v-select
          label="Language"
          item-value="isoCode"
          item-text="name"
          menu-props="auto"
          :rules="this.rules.required"
          v-model="request.languageCode"
          :disabled="loading"
          :items="languages"
        ></v-select>
        <v-select
          :items="categories"
          item-value="id"
          item-text="name"
          menu-props="auto"
          :rules="this.rules.required"
          v-model="request.categoryId"
          :disabled="loading"
          label="Category"
        ></v-select>
        <v-combobox
          v-model="request.keywords"
          chips
          multiple
          deletable-chips
          :disabled="loading"
          label="Keywords"
        ></v-combobox>
        <v-text-field
          label="Year of publishing:"
          type="number"
          :rules="this.rules.validYear"
          v-model="request.year"
        ></v-text-field>
        <v-btn
          class="px-4"
          type="submit"
          :disabled="loading || !formValid"
          color="yellow darken-3"
          id="submit"
        >Edit</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
  import CategoriesApi from '../../service/categoriesApi';
  import LanguagesApi from '../../service/languagesApi';
  import BooksApi from '../../service/booksApi';

  export default {
    name: "EditBookView",
    data() {
      return {
        languages: [],
        categories: [],
        formValid: false,
        loading: true,
        rules: {
          required: [value => !!value || "Required."],
          validYear: [value => (value > 1000 && value < 3000) || "Enter a year between 1000-3000"],
        },
        request: {
          keywords: [],
          author: '',
          languageCode: '',
          year: '',
          categoryId: '',
          title: '',
        }
      }
    },
    methods: {
      submit() {
        if (!this.validate()) {
          return;
        }
        this.loading = true;
        BooksApi.update(this.$route.params.bookId, this.request)
          .then((response) => {
            this.$router.push("/books-view");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          })
      },
      validate() {
        return this.$refs.form.validate();
      },
    },
    mounted() {
      // CategoriesApi.getAll()
      //   .then((response) => {
      //     this.categories = response.data;
      //   });
      // LanguagesApi.getAll()
      //   .then((response) => {
      //     this.languages = response.data;
      //   });
      const bookId = this.$route.params.bookId;
      Promise.all([CategoriesApi.getAll(), LanguagesApi.getAll(), BooksApi.getById(bookId)])
        .then(([{data: categories}, {data: languages}, {data: book}]) => {
          this.categories = categories;
          this.languages = languages;

          this.request.keywords = book.keywords;
          this.request.author = book.author;
          this.request.languageCode = book.languageCode;
          this.request.year = book.year;
          this.request.categoryId = book.categoryId;
          this.request.title = book.title;

          this.loading = false;
        })
        .catch((error) => alert(error.data));
    },
  }
</script>

<style scoped>
</style>
