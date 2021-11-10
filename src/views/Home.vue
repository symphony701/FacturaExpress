<template>
  <v-container class="container-s">
    <v-row justify="center">
      <v-col cols="7">
        <v-row justify="center">
          <h1>FacturaXpress</h1>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              class="inputs-login"
              label="Usuario"
              hide-details="auto"
              dark
              v-model="user"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              class="inputs-login"
              label="Contraseña"
              hide-details="auto"
              dark
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn color="#FDFFFC" elevation="4" large @click="validateLogin()"
              >Iniciar Sesión</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn to="/register" color="#FDFFFC" elevation="4" large
              >Registrarse</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from "./../services/UserService";
export default {
  name: "Home",
  data: () => ({
    user: "",
    password: "",
  }),
  components: {},
  methods: {
    async validateLogin() {
      if (this.user != "" && this.password != "") {
        await UserService.login(this.user, this.password);
      }
    },
  },
};
</script>
<style scoped>
.container-s {
  height: 100% !important;
  display: flex;
  align-items: center;
}
.inputs-login input {
  color: white !important;
}
.v-text-field input {
  color: white !important;
}
</style>
