<template style="box-sizing: border-box">
  <v-card class="book-card" style="max-height: 232px;">
    <v-container>
      <v-layout style="max-height: 208px; overflow: hidden;">
        <v-flex xs2>
          <v-img
            :src="book.image"
            contain
            style="width: 100%; height: 100%"
          ></v-img>
        </v-flex>
        <v-flex xs10 style="position: relative;">
          <div>
            <v-card-actions style="margin-bottom: 0px;">
              <h1 id="title">{{ book.title }}<span id="author">{{ book.author }}</span></h1>
              <v-spacer></v-spacer>
              <v-menu v-if="$session.admin()" left botto>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="update">
                    <v-list-item-title>Update</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteItem">
                    <v-list-item-title>Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
            <v-card-text class="py-0 my-0 pl-5">{{ book.categoryName }} ~ {{ book.year }}
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-text
              class="highlight my-0 pt-1"
              v-html="book.highlight"
            ></v-card-text>
            <v-btn
              v-if="!this.$session.userLoggedIn() || this.$session.categoryAccess(book.categoryId)"
              id="download"
              class="px-4"
              @click="download"
              color="yellow darken-3"
              style="color: white; position: absolute; bottom: 0px; right: 0px;"
              :disabled="this.downloading"
            >{{ this.downloaded ? 'Downloaded' : 'Download'}}</v-btn>
            <v-btn
              v-else
              id="subscribe"
              class="px-4"
              @click="subscribe"
              color="yellow darken-3"
              style="color: white; position: absolute; bottom: 0px; right: 0px;"
            >{{ 'Subscribe '}}</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import booksApi from '../../service/booksApi';
  import dialog from '../../service/dialog';

  export default {
    name: "BooksViewItem",
    data() {
      return {
        downloading: false,
        downloaded: false,
      }
    },
    props: {
      "book": Object,
      "deleteBook": Function,
    },
    methods: {
      deleteItem() {
        if (!dialog.confirm('You sure you want to delete: ' + this.book.title))
          return;

        const bookId = this.book.id;
        console.log({bookId});
        booksApi.delete(this.book.id)
          .then((response) => this.deleteBook(this.book.id));
      },
      update() {
        this.$router.push('/edit-book/' + this.book.id);
      },
      download() {
        if (!this.$session.userLoggedIn()) {
          window.location = '/sign-in';
          return;
        }
        this.downloading = true;
        booksApi.download(this.book.id)
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download',  this.book.title + '.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.downloading = false;
            this.downloaded = true;
          });
      },
      subscribe() {
        alert('this does nothing');
      },
    }
  }
</script>

<style scoped>
  .highlight >>> em {
    background-color: yellow !important;
  }

  #title {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 2rem;
    padding: 16px 16px 0px;
  }

  #author {
    font-size: 1rem;
    font-weight: 300;
    font-style: italic;
    color: gray;
    letter-spacing: normal;
    line-height: 2rem;
    padding: 16px 16px 20px;
  }
</style>
