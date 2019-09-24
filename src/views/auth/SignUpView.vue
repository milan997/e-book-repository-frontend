<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="yellow darken-3" darkt>
              <v-toolbar-title id="title">Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                ref="form"
                v-model="formValid"
                :lazy-validation="false"
                @submit.prevent.stop="signUp"
              >
                <v-text-field
                  label="Username"
                  v-model="signUpRequest.username"
                  :rules="this.rules.required"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showPassword = !showPassword"
                  v-model="signUpRequest.password"
                  :rules="this.rules.required"
                ></v-text-field>
                <v-text-field
                  label="Repeat password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showPassword = !showPassword"
                  v-model="repeatedPassword"
                  :rules="this.rules.matchPassword"
                ></v-text-field>
                <v-text-field
                  label="First name"
                  v-model="signUpRequest.firstName"
                  :rules="this.rules.required"
                ></v-text-field>
                <v-text-field
                  label="Last name"
                  v-model="signUpRequest.lastName"
                  :rules="this.rules.required"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="px-4"
                    type="submit"
                    id="signUpBtn"
                    :disabled="loading || !formValid"
                    color="yellow darken-3"
                    style="color: white"
                  >Sign Up</v-btn>
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
        signUpRequest: {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
        },
        rules: {
          required: [value => !!value || "Required."],
          matchPassword: [value => value === this.signUpRequest.password || 'Passwords must match!'],
        },
        loading: false,
        formValid: false,
        repeatedPassword: '',
        showPassword: false,
      };
    },
    methods: {
      signUp() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          AuthApi.signUp(this.signUpRequest)
            .then((response) => {
              Session.signIn(response.data);
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
