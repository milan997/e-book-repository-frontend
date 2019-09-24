<template>
  <div>
    <h1>Create book:</h1>
    <div>
      <v-file-input
        label="File"
        accept="application/pdf"
        v-on:change="upload"
        show-size
      ></v-file-input>

      <v-form
        ref="form"
        @submit.prevent.stop="submit"
        v-model="formValid"
        :lazy-validation="false"
      >
        <v-text-field
          :disabled="!fileUploaded"
          label="Title"
          :rules="this.rules.required"
          v-model="request.title"
        ></v-text-field>
        <v-text-field
          :disabled="!fileUploaded"
          label="Author"
          :rules="this.rules.required"
          v-model="request.author"
        ></v-text-field>
        <v-select
          label="Language"
          :disabled="!fileUploaded"
          item-value="isoCode"
          item-text="name"
          menu-props="auto"
          :rules="this.rules.required"
          v-model="request.languageCode"
          :items="languages"
        ></v-select>
        <v-select
          :items="categories"
          :disabled="!fileUploaded"
          item-value="id"
          item-text="name"
          menu-props="auto"
          :rules="this.rules.required"
          v-model="request.categoryId"
          label="Category"
        ></v-select>
        <v-combobox
          v-model="request.keywords"
          :disabled="!fileUploaded"
          chips
          multiple
          deletable-chips
          label="Keywords"
        ></v-combobox>
        <v-text-field
          label="Year of publishing:"
          :disabled="!fileUploaded"
          type="number"
          :rules="this.rules.validYear"
          v-model="request.year"
        ></v-text-field>
        <v-btn
          class="px-4"
          type="submit"
          :disabled="!fileUploaded || loading || !formValid"
          color="yellow darken-3"
          id="submit"
        >Create</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
  import CategoriesApi from '../../service/categoriesApi';
  import LanguagesApi from '../../service/languagesApi';
  import BooksApi from '../../service/booksApi';

  export default {
    name: "CreateBookView",
    props: {
      "bookId": String,
    },
    data() {
      return {
        languages: [],
        categories: [],
        fileUploaded: false,
        formValid: false,
        loading: false,
        rules: {
          required: [value => !!value || "Required."],
          validYear: [value => (value > 1000 && value < 3000) || "Enter a year between 1000-3000"],
        },
        request: {
          fileKey: '',
          keywords: [],
          author: '',
          languageCode: '',
          title: '',
          year: '',
          categoryId: '',
        }
      }
    },
    methods: {
      upload(file) {
        BooksApi.uploadBookPdf(file)
          .then(({data}) => {
            this.request.fileKey = data.fileKey;

            const { pdfMeta } = data;
            this.fileUploaded = true;
            this.request.author = pdfMeta.author;
            this.request.title = pdfMeta.title;
            this.request.year = pdfMeta.year;
            this.request.keywords = pdfMeta.keywords;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      submit() {
        if (!this.validate()) {
          return;
        }
        this.loading = true;
        BooksApi.create(this.request)
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
      CategoriesApi.getAll()
        .then((response) => {
          this.categories = response.data;
        });
      LanguagesApi.getAll()
        .then((response) => {
          this.languages = response.data;
        });
    },
  }
</script>

<style scoped>
</style>
