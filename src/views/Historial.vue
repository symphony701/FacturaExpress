<template>
  <v-container fluid class="container-s">
    <v-row justify="center">
      <v-col cols="12">
        <v-row justify="center">
          <h2>Historial</h2>
        </v-row>

        <v-row justify="center">
          <v-col cols="11">
            <v-data-table
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="d-flex justify-center">
            <v-btn to="/menu" color="#FDFFFC" elevation="4" large>Volver</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Historial",

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
h2 {
  font-size: 2.5rem;
}
</style>