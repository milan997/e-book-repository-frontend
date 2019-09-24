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
                @submit.prevent.stop="forgotPassword"
              >
                <v-text-field
                  label="Username"
                  v-model="request.username"
                  :rules="this.rules.required"
                ></v-text-field>
                <v-text-field
                  label="Old password"
                  :type="showOldPassword ? 'text' : 'password'"
                  :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showOldPassword = !showOldPassword"
                  v-model="request.oldPassword"
                  :rules="this.rules.required"
                ></v-text-field>
                <v-text-field
                  label="New password"
                  :type="showNewPassword ? 'text' : 'password'"
                  :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showNewPassword = !showNewPassword"
                  v-model="request.newPassword"
                  :rules="this.rules.matchPassword"
                ></v-text-field>
                <v-text-field
                  label="Repeat new password"
                  :type="showNewPassword ? 'text' : 'password'"
                  :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showNewPassword = !showNewPassword"
                  v-model="repeatedNewPassword"
                  :rules="this.rules.matchPassword"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="px-4"
                    type="submit"
                    id="submitBtn"
                    :disabled="loading || !formValid"
                    color="yellow darken-3"
                    style="color: white"
                  >Submit</v-btn>
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
        request: {
          username: '',
          oldPassword: '',
          newPassword: '',
        },
        rules: {
          required: [value => !!value || "Required."],
          matchPassword: [value => (this.repeatedNewPassword && this.repeatedNewPassword === this.request.newPassword)  || 'Passwords must match!'],
        },
        loading: false,
        formValid: false,
        repeatedNewPassword: '',
        showOldPassword: false,
        showNewPassword: false,
      };
    },
    methods: {
      forgotPassword() {
        if (this.$refs.form.validate()) {
          this.loading = true;
          AuthApi.forgotPassword(this.request)
            .then((response) => {
              window.location = '/sign-in';
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
