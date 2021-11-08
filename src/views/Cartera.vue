<template>
  <v-container class="container-s">
    <v-row justify="center">
      <v-col>
        <v-row justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <h1>Cartera de facturas</h1>
          </v-col>
        </v-row>
        <!--seccion 1-->
        <v-row justify="center">
          <v-col cols="12" class="justify-center">
            <v-row justify="start">
              <v-col cols="2">
                <h2>Tasa y Plazo:</h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="10" class="justify-center">
                <v-row justify="space-around">
                  <v-col cols="3">
                    <v-select dense dark label="Tasa:" outlined></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      dense
                      dark
                      label="Plazo de tasa:"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      class="inputs-login"
                      label="Porcentaje de tasa (%):"
                      hide-details="auto"
                      dark
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col cols="3">
                    <v-select
                      dense
                      label="Período de Capitalización"
                      outlined
                      dark
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      class="inputs-login"
                      label="Plazo (en días):"
                      hide-details="auto"
                      dark
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      dense
                      label="Días por año"
                      dark
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex start" cols="11">
                    <v-btn to="/" color="#FDFFFC" elevation="4" large
                      >Crear Cartera</v-btn
                    ></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!--seccion 2-->
        <v-row justify="center">
          <v-col cols="12" class="justify-center">
            <v-row justify="start">
              <v-col cols="2">
                <h2>Costes/Gastos Iniciales:</h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="10" class="justify-center">
                <v-row justify="space-around">
                  <v-col cols="3">
                    <v-select dense dark label="Motivo:" outlined></v-select>
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center">
                    <v-text-field
                      class="inputs-login"
                      label="Valor:"
                      hide-details="auto"
                      dark
                      style="margin-right: 10px"
                    ></v-text-field>
                    <div style="width: 35%">
                      <v-select dense dark label="Moneda:" outlined></v-select>
                    </div>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="10">
                    <v-data-table
                      :headers="headersCostes"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex start" cols="11">
                    <v-btn to="/" color="#FDFFFC" elevation="4" large
                      >Agregar</v-btn
                    ></v-col
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!--seccion 3-->
        <v-row justify="center">
          <v-col cols="12" class="justify-center">
            <v-row justify="start">
              <v-col cols="2">
                <h2>Datos de la Factura:</h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="10" class="justify-center">
                <v-row justify="space-around">
                  <v-col cols="3">
                    <v-menu
                      dark
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="0"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dark
                          v-model="date1"
                          label="Fecha de emisión"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        dark
                        v-model="date1"
                        @input="menu1 = false"
                        color="#EB124B"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="3">
                    <v-menu
                      dark
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="0"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dark
                          v-model="date2"
                          label="Fecha de pago"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        dark
                        v-model="date2"
                        @input="menu2 = false"
                        color="#EB124B"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center">
                    <v-text-field
                      class="inputs-login"
                      label="Total facturado:"
                      hide-details="auto"
                      dark
                      style="margin-right: 10px"
                    ></v-text-field>
                    <div style="width: 35%">
                      <v-select dense dark label="Moneda:" outlined></v-select>
                    </div>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col class="d-flex justify-center">
                    <v-btn to="/" color="#FDFFFC" elevation="4" large
                      >Crear Factura</v-btn
                    ></v-col
                  >
                </v-row>
                <v-row justify="space-around">
                  <v-col cols="12">
                    <v-data-table
                      :headers="headersCostes"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex justify-center" cols="3">
                    <v-btn color="#FDFFFC" elevation="4" large
                      >Resultado</v-btn
                    ></v-col
                  >
                  <v-col class="d-flex justify-center" cols="3">
                    <v-btn color="#FDFFFC" elevation="4" large
                      >Limpiar</v-btn
                    ></v-col
                  >
                  <v-col class="d-flex justify-center" cols="3">
                    <v-btn color="#FDFFFC" elevation="4" large
                      >Volver</v-btn
                    ></v-col
                  >
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex justify-center" cols="3">
                    <h2>Valor total a recibir: 0</h2>
                  </v-col>
                  <v-col class="d-flex justify-center" cols="3">
                    <h2>TCEA: 0</h2>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Cartera",
  components: {},
  data: () => ({
    headersCostes: [
      {
        text: "Motivo",
        value: "motivoCosto",
      },
      { text: "Valor:", value: "valorCosto" },
    ],
    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu1: false,
    menu2: false,
  }),
};
</script>
<style >
.container-s {
  height: auto !important;
  display: flex;
  align-items: center;
}
.inputs-login input {
  color: white !important;
}
.v-text-field input {
  color: white !important;
}
.v-date-picker-title {
  color: white !important;
}

.v-picker__body {
  background: #051937 !important;
}
</style>