import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'mainview',
      component: () => import('../views/mainview/MainView.vue'),
      redirect: '/books-view',
      children: [
        {
          path: '/books-view',
          name: 'booksView',
          component: () => import('../views/mainview/BooksView.vue'),
        },
        {
          path: '/create-book',
          name: 'createBook',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/mainview/CreateBookView.vue'),
        },
        {
          path: '/edit-book/:bookId',
          name: 'editBook',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/mainview/EditBookView.vue'),
        },
        {
          path: '/categories',
          name: 'categories',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/categories/CategoriesView.vue'),
        },
      ]
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/SignInView.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/SignUpView.vue'),
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/ForgotPasswordView.vue'),
    },
  ],
});
