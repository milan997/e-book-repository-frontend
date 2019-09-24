<template>
  <div>
    <v-app-bar app color="yellow darken-3" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title @click="homepage">eBookRepository</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title v-if="$session.userLoggedIn()">{{ $session.getUserInfo().username }}</v-toolbar-title>
      <v-menu v-if="$session.userLoggedIn()" left botto>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="this.$session.admin()" @click="createBook">
            <v-list-item-title>Create Book</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="this.$session.admin()" @click="categories">
            <v-list-item-title>Categories</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-else icon @click="logout">
        <v-icon>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
    methods: {
      logout: () => window.location = '/sign-in',
      createBook() { this.$router.push('/create-book') },
      homepage() { this.$router.push('/').catch(() => {}) },
      categories() { this.$router.push('/categories') },
    }
  }
</script>

<style scoped>

</style>
