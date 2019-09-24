<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="yellow darken-3" dark>
              <v-toolbar-title id="title">Welcome</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="formValid"
                @submit.prevent.stop="signIn"
              >
                <v-text-field
                  label="Username"
                  v-model="signInRequest.username"
                  :rules="this.rules.required"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showPassword = !showPassword"
                  v-model="signInRequest.password"
                  :rules="this.rules.required"
                ></v-text-field>
                <router-link class="ml-2" to="/forgot-password" style="color: #CC6600;"
                >Forgot password?</router-link>
                <v-card-actions>

                  <br>
                  <router-link to="/sign-up" style="color: #CC6600;"
                  >Don't have an account? Sign up!</router-link>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="px-4"
                    type="submit"
                    id="loginBtn"
                    :disabled="loading || !formValid"
                    color="yellow darken-3"
                    style="color: white"
                  >Sign In</v-btn>
                </v-card-actions>

              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import Session from '../../service/session';
  import AuthApi from '../../service/authApi';

  export default {
    data() {
      return {
        signInRequest: {
          username: '',
          password: '',
        },
        rules: {
          required: [value => !!value || "Required."],
        },
        loading: false,
        formValid: false,
        showPassword: false,
      };
    },
    methods: {
      signIn() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          AuthApi.signIn(this.signInRequest)
            .then(({data}) => {
              Session.signIn(data);
              this.$router.push("/");
            })
            .catch((error) => {
              const message = error.response.data.localizedErrorMessage;
              alert(message);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      },
    },
    mounted() {
      Session.destroy();
    }
  }
</script>


<style scoped>
  #title {
    color: white;
  }

</style>
