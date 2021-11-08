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
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn to="/" color="#FDFFFC" elevation="4" large
              >Registrarse</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",

  components: {},
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