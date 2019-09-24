<template>
  <div id="mainview">
    <custom-navigation></custom-navigation>
    <v-content app>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'home',
    components: {
      customNavigation: () => import('../../components/shared/Navigation.vue'),
      customFooter: () => import('../../components/shared/CustomFooter.vue'),
    },
  }
</script>

<style scoped>
  #mainview {
    background-color: beige;
  }

  .book-card {
    overflow-y: hidden;
    max-height:250px;
  }
</style>
