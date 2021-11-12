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
              :headers="headers"
              :items="facturas"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:no-data>
                <v-alert :value="true" color="error">
                  Usted no posee facturas para mostrar
                </v-alert>
              </template>
            </v-data-table>
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
import FacturaService from "./../services/FacturaService";
export default {
  name: "Historial",
  data: () => ({
    headers: [
      {
        text: "Id:",
        value: "CFactura",
      },
      { text: "Plazo descuento:", value: "NumPlazoDescuento" },
      { text: "F. de emisión:", value: "DFechaEmision" },
      { text: "F. de Pago:", value: "DFechaPago" },
      { text: "Monto:", value: "NumMonto" },
      { text: "Moneda:", value: "NMoneda" },
      { text: "TEA(%):", value: "NumTEA" },
      { text: "TE(%):", value: "NumTED" },
      { text: "d(%):", value: "NumD360" },
      { text: "Descuento:", value: "NumDescuento" },
      { text: "V. Neto:", value: "NumVNeto" },
      { text: "V. Recibido:", value: "NumVRecibido" },
      { text: "V. Entregado:", value: "NumVEntregado" },
      { text: "TCEA(%):", value: "NumTCEA" },
    ],
    facturas: [],
  }),
  components: {},
  mounted: async function () {
    if (
      this.$store.state.userName == null ||
      this.$store.state.userId == null
    ) {
      this.$router.push("/");
    } else {
      const response = await FacturaService.getAllFacturasByUser(
        this.$store.state.userId
      );
      this.facturas = response;
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
h2 {
  font-size: 2.5rem;
}
</style>