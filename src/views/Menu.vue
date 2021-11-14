<template>
  <v-container class="container-s">
    <v-row justify="center">
      <v-col cols="7">
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <h1>FacturaXpress</h1>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <h2>Hola {{ nombreUsuario }}, ¿Qué deseas realizar?</h2>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn color="#FDFFFC" elevation="4" large to="cartera"
              >Descontar facturas</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn color="#FDFFFC" elevation="4" large to="historial"
              >Visualizar mis facturas descontadas</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn color="#FDFFFC" elevation="4" to="/about" large
              >Visualizar preguntas frecuentes</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn to="/" color="#FDFFFC" elevation="4" large
              >Cerrar sesión</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Menu",
  data: () => ({
    nombreUsuario: "",
  }),

  components: {},
  mounted: async function () {
    if (
      this.$store.state.userName == null ||
      this.$store.state.userId == null
    ) {
      this.$router.push("/");
    } else {
      this.nombreUsuario = this.$store.state.userName;
    }
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