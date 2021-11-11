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
                    <v-select
                      dense
                      dark
                      label="Tasa:"
                      outlined
                      :items="tasaOptions"
                      v-model="tasaModel"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      dense
                      dark
                      label="Plazo de tasa:"
                      v-model="plazoTasaModel"
                      :items="plazoTasaOptions"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      class="inputs-login"
                      label="Porcentaje de tasa (%):"
                      hide-details="auto"
                      v-model="porcentajeTasa"
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
                      v-model="periodoCapitalizacionModel"
                      :items="periodoCapitalizacionOptions"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-menu
                      dark
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="0"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          dark
                          v-model="fechaDescuentoDate"
                          label="Fecha de descuento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        dark
                        v-model="fechaDescuentoDate"
                        @input="menu3 = false"
                        color="#EB124B"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      dense
                      label="Días por año"
                      dark
                      outlined
                      :items="diasPorYear"
                      v-model="diasPorYearModel"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex start" cols="11">
                    <v-btn
                      :disabled="buttonCrearCartera"
                      @click="crearCartera()"
                      color="#FDFFFC"
                      elevation="4"
                      large
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
                    <v-select
                      dense
                      dark
                      label="Motivo:"
                      v-model="motivoModel"
                      :items="motivoOptions"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center">
                    <v-text-field
                      class="inputs-login"
                      label="Valor:"
                      hide-details="auto"
                      dark
                      v-model="valorCosto"
                      style="margin-right: 10px"
                    ></v-text-field>
                    <div style="width: 35%">
                      <v-select
                        dense
                        dark
                        label="Moneda:"
                        v-model="modelMoneda"
                        :items="monedaOptions"
                        outlined
                      ></v-select>
                    </div>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="10">
                    <v-data-table
                      :headers="headersCostes"
                      :items="costosLocales"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex start" cols="11">
                    <v-btn
                      :disabled="buttonCrearCosto"
                      color="#FDFFFC"
                      elevation="4"
                      large
                      @click="agregarCosto"
                      >Agregar Costo</v-btn
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
                      v-model="montoFactura"
                      style="margin-right: 10px"
                    ></v-text-field>
                    <div style="width: 35%">
                      <v-select
                        dense
                        dark
                        label="Moneda:"
                        v-model="modelMonedaFactura"
                        :items="monedaOptions"
                        outlined
                      ></v-select>
                    </div>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col class="d-flex justify-center">
                    <v-btn
                      :disabled="buttonCrearFactura"
                      color="#FDFFFC"
                      elevation="4"
                      large
                      @click="agregarFactura()"
                      >Crear Factura</v-btn
                    ></v-col
                  >
                </v-row>
                <v-row justify="space-around">
                  <v-col cols="12">
                    <v-data-table
                      :headers="headersFactura"
                      :items="facturasLocales"
                      :items-per-page="5"
                      class="elevation-1"
                    ></v-data-table>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex justify-center" cols="3">
                    <v-btn
                      color="#FDFFFC"
                      elevation="4"
                      large
                      :disabled="buttonResultado"
                      @click="resultado()"
                      >Resultado</v-btn
                    ></v-col
                  >
                  <v-col class="d-flex justify-center" cols="3">
                    <v-btn
                      color="#FDFFFC"
                      elevation="4"
                      large
                      :disabled="buttonLimpiar"
                      @click="limpiar()"
                      >Limpiar</v-btn
                    ></v-col
                  >
                  <v-col class="d-flex justify-center" cols="3">
                    <v-btn color="#FDFFFC" elevation="4" large to="/menu"
                      >Volver</v-btn
                    ></v-col
                  >
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex justify-center" cols="3">
                    <h2>Valor total a recibir: {{ valorTotalARecibir }}</h2>
                  </v-col>
                  <v-col class="d-flex justify-center" cols="3">
                    <h2>TCEA: {{ valorTotalTCEA }}</h2>
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
import CarteraService from "./../services/CarteraService";
import FacturaService from "./../services/FacturaService";
import CostoService from "./../services/CostoService";
import Operaciones from "./../services/Operaciones";
export default {
  name: "Cartera",
  components: {},
  data: () => ({
    buttonCrearCartera: false,
    buttonCrearCosto: true,
    buttonCrearFactura: true,
    buttonResultado: true,
    buttonLimpiar: true,
    carteraNueva: null,
    headersCostes: [
      {
        text: "Motivo",
        value: "NMotivo",
      },
      { text: "Moneda:", value: "NMoneda" },
      { text: "Valor:", value: "NumMonto" },
    ],
    date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    fechaDescuentoDate: new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10),
    menu1: false,
    menu2: false,
    menu3: false,
    //Cartera data
    //TASA Y PLAZO
    diasPorYearModel: "",
    diasPorYear: [
      { text: "360 dias", value: 360 },
      { text: "365 dias", value: 365 },
    ],
    tasaModel: "",
    tasaOptions: [
      { text: "Nominal", value: "nominal" },
      { text: "Efectiva", value: "efectiva" },
    ],
    plazoTasaModel: "",
    plazoTasaOptions: [
      { text: "Diario", value: "diario" },
      { text: "Quincenal", value: "quincenal" },
      { text: "Mensual", value: "mensual" },
      { text: "Bimestral", value: "bimestral" },
      { text: "Trimestral", value: "trimestral" },
      { text: "Cuatrimestral", value: "cuatrimestral" },
      { text: "Semestral", value: "semestral" },
      { text: "Anual", value: "anual" },
    ],
    plazoTasaNum: 0,
    porcentajeTasa: null,
    periodoCapitalizacionModel: "",
    periodoCapitalizacionOptions: [
      { text: "Diario", value: "diario" },
      { text: "Quincenal", value: "quincenal" },
      { text: "Mensual", value: "mensual" },
      { text: "Bimestral", value: "bimestral" },
      { text: "Trimestral", value: "trimestral" },
      { text: "Cuatrimestral", value: "cuatrimestral" },
      { text: "Semestral", value: "semestral" },
      { text: "Anual", value: "anual" },
    ],
    periodoCapitalizacionNum: 0,
    //costes gastos database
    motivoModel: "",
    motivoOptions: [
      { text: "Portes", value: "portes" },
      { text: "Fotocopias", value: "fotocopia" },
      { text: "Comisión de estudio", value: "comision_estudio" },
      { text: "Comisión de intermediación", value: "comision_intermediacion" },
      { text: "Gastos de administración", value: "gastos_administracion" },
      { text: "Seguro", value: "seguro" },
      { text: "Otros gastos", value: "otros" },
    ],
    valorCosto: 0,
    modelMoneda: "",
    monedaOptions: [
      { text: "S/", value: "sol" },
      { text: "$", value: "dolar" },
    ],
    costosLocales: [],
    //factura
    modelMonedaFactura: "",
    headersFactura: [
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
    facturasLocales: [],
    montoFactura: 0,
    valorTotalARecibir: 0,
    valorTotalTCEA: 0,
  }),
  mounted: async function () {
    if (
      this.$store.state.userName == null ||
      this.$store.state.userId == null
    ) {
      this.$router.push("/");
    }
  },
  methods: {
    async crearCartera() {
      switch (this.periodoCapitalizacionModel) {
        case "diario":
          this.periodoCapitalizacionNum = 1;
          break;
        case "quincenal":
          this.periodoCapitalizacionNum = 15;
          break;
        case "mensual":
          this.periodoCapitalizacionNum = 30;
          break;
        case "bimestral":
          this.periodoCapitalizacionNum = 60;
          break;
        case "trimestral":
          this.periodoCapitalizacionNum = 90;
          break;
        case "cuatrimestral":
          this.periodoCapitalizacionNum = 120;
          break;
        case "semestral":
          this.periodoCapitalizacionNum = 180;
          break;
        case "anual":
          this.periodoCapitalizacionNum = parseInt(this.diasPorYearModel);
          break;

        default:
          break;
      }
      switch (this.plazoTasaModel) {
        case "diario":
          this.plazoTasaNum = 1;
          break;
        case "quincenal":
          this.plazoTasaNum = 15;
          break;
        case "mensual":
          this.plazoTasaNum = 30;
          break;
        case "bimestral":
          this.plazoTasaNum = 60;
          break;
        case "trimestral":
          this.plazoTasaNum = 90;
          break;
        case "cuatrimestral":
          this.plazoTasaNum = 120;
          break;
        case "semestral":
          this.plazoTasaNum = 180;
          break;
        case "anual":
          this.plazoTasaNum = parseInt(this.diasPorYearModel);
          break;

        default:
          break;
      }

      const res = await CarteraService.addCartera(
        this.$store.state.userId,
        this.tasaModel,
        parseFloat(this.porcentajeTasa),
        this.plazoTasaModel,
        this.plazoTasaNum,
        parseInt(this.diasPorYearModel),
        this.periodoCapitalizacionModel,
        this.periodoCapitalizacionNum,
        this.fechaDescuentoDate
      );
      this.carteraNueva = res;
      this.buttonCrearCartera = true;
      this.buttonCrearCosto = false;
    },
    async agregarCosto() {
      if (
        (this.motivoModel != "", this.valorCosto != "", this.modelMoneda != "")
      ) {
        //CostoService.addCosto(this.carteraNueva.CCartera,this.motivoModel,parseInt(this.valorCosto),this.modelMoneda)
        this.costosLocales.push({
          CCartera: this.carteraNueva.CCartera,
          NMotivo: this.motivoModel,
          NumMonto: parseFloat(this.valorCosto),
          NMoneda: this.modelMoneda,
        });
        this.buttonCrearFactura = false;
      }
    },
    async agregarFactura() {
      if (this.buttonCrearCosto == false) {
        this.buttonCrearCosto = true;
        const res = await CostoService.addCosto(this.costosLocales);
      }
      const NumTEA = Operaciones.NumTEA(
        this.tasaModel,
        parseFloat(this.porcentajeTasa),
        this.plazoTasaNum,
        this.periodoCapitalizacionNum
      );
      const NumPlazoDescuento = Operaciones.NumPlazoDescuento(
        this.date2,
        this.fechaDescuentoDate
      );
      const NumTed = Operaciones.NumTED(NumTEA, NumPlazoDescuento);

      const NumD360 = Operaciones.NumD360(NumTed);

      const NumDescuento = Operaciones.NumDescuento(
        parseFloat(this.montoFactura),
        NumD360
      );

      const NumVNeto = Operaciones.NumVNeto(
        parseFloat(this.montoFactura),
        NumDescuento
      );

      const NumVRecibido = Operaciones.NumVRecibido(
        NumVNeto,
        this.costosLocales,
        0
      );

      const NumVEntregado = Operaciones.NumVEntregado(
        parseFloat(this.montoFactura)
      );

      const NumTCEA = Operaciones.NumTCEA(
        NumVEntregado,
        NumVRecibido,
        parseInt(this.diasPorYearModel),
        NumPlazoDescuento
      );

      this.facturasLocales.push({
        DFechaEmision: this.date1,
        DFechaPago: this.date2,
        NumMonto: parseFloat(this.montoFactura),
        NMoneda: this.modelMonedaFactura,
        CCartera: this.carteraNueva.CCartera,
        NumTEA: NumTEA,
        NumTED: NumTed,
        NumD360: NumD360,
        NumDescuento: NumDescuento,
        NumVNeto: NumVNeto,
        NumVRecibido: NumVRecibido,
        NumVEntregado: NumVEntregado,
        NumTCEA: NumTCEA,
        NumPlazoDescuento: NumPlazoDescuento,
      });

      this.buttonResultado = false;
    },
    async resultado() {
      this.buttonLimpiar = true;
      this.buttonCrearFactura = true;

      const res = await FacturaService.addFacturas(this.facturasLocales);

      let aux = 0;
      this.facturasLocales.forEach((factura) => {
        aux = aux + factura.NumVRecibido;
      });
      this.valorTotalARecibir = aux;

      let aux2 = 0;
      this.facturasLocales.forEach((factura) => {
        aux2 = aux2 + factura.NumTCEA;
      });

      this.valorTotalTCEA = aux2 / this.facturasLocales.length;
    },
    limpiar() {
      console.log(this.date1, this.date2);
    },
  },
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