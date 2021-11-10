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
              label="Nombre"
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
              label="Correo"
              hide-details="auto"
              type="email"
              dark
              v-model="email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              class="inputs-login"
              label="Contraseña"
              hide-details="auto"
              type="password"
              dark
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="8">
            <v-text-field
              class="inputs-login"
              label="Repetir Contraseña"
              hide-details="auto"
              type="password"
              dark
              v-model="rpassword"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn @click="registerUser" color="#FDFFFC" elevation="4" large
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
  name: "Register",
  data: () => ({
    user: "",
    email: "",
    password: "",
    rpassword: "",
  }),
  components: {},
  methods: {
    async registerUser() {
      if (
        this.user != "" &&
        this.email != "" &&
        this.password != "" &&
        this.rpassword != "" &&
        this.password == this.rpassword
      ) {
        const response = await UserService.register(
          this.user,
          this.email,
          this.password
        );
        this.$router.push("/");
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