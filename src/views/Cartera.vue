<template>
  <v-container class="container-s">
    <v-row justify="center">
      <v-col>
        <v-row justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <h1>Descontar facturas</h1>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              fab
              dark
              large
              color="#41BEA6"
              fixed
              right
              bottom
              @click="
                () => {
                  dialog = true;
                }
              "
            >
              <v-icon>mdi-help</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!--seccion 1-->
        <v-row justify="center">
          <v-col cols="12" class="justify-center">
            <v-row justify="start">
              <v-col cols="2">
                <h2>Tasa y Plazo de la Entidad Financiera:</h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="10">
                <p>
                  Aquí debes ingresar los datos brindados por la entidad
                  financiera consultada anteriormente. Todos los campos deben
                  ser completados a excepción del período de capitalización que
                  solo es necesario si la tasa elegida es nominal.
                </p>
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
                      @change="changedSelect()"
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
                      :disabled="selectPeriodoCapitalizacion"
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
                      >Guardar datos</v-btn
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
              <v-col cols="10">
                <p>
                  Son los costes o gastos que deben pagarse al acreedor para
                  realizar la operación, y que se descontarán del Valor Neto
                  (diferencia entre el Valor Nominal y Descuento); estos montos
                  afectarán al cálculo de la Tasa de Coste Efectivo Anual
                  (T.C.E.A.). Si no hubiera costos o gastos, digite 0 (cero)
                  como valor del costo y cualquier motivo.
                </p>
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
                    >
                      <template v-slot:no-data>
                        <v-alert :value="true" color="#ffffff">
                          No hay costos que mostrar
                        </v-alert>
                      </template>
                    </v-data-table>
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
        <v-row justify="center">
          <v-col cols="12" class="justify-center">
            <v-row justify="start">
              <v-col cols="2">
                <h2>Costes/Gastos Finales:</h2>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="10">
                <p>
                  Son la suma de costes/gastos cargados/abonados al instrumento
                  en tiempo vencido o al final de la operación.
                </p>
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
                      v-model="motivoModelF"
                      :items="motivoOptionsF"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="4" class="d-flex justify-center">
                    <v-text-field
                      class="inputs-login"
                      label="Valor:"
                      hide-details="auto"
                      dark
                      v-model="valorCostoF"
                      style="margin-right: 10px"
                    ></v-text-field>
                    <div style="width: 35%">
                      <v-select
                        dense
                        dark
                        label="Moneda:"
                        v-model="modelMonedaF"
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
                      :items="costosLocalesF"
                      :items-per-page="5"
                      class="elevation-1"
                    >
                      <template v-slot:no-data>
                        <v-alert :value="true" color="#ffffff">
                          No hay costos que mostrar
                        </v-alert>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex start" cols="11">
                    <v-btn
                      :disabled="buttonCrearCostoF"
                      color="#FDFFFC"
                      elevation="4"
                      large
                      @click="agregarCostoF"
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
              <v-col cols="10">
                <p>
                  Debe ingresar los datos de cada factura emitida y agregarla a
                  la cartera con el botón “Agregar factura”. Cuando termine de
                  agregar todas las facturas a descontar, de clic en “Calcular
                  descuento de facturas total”
                </p>
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
                      v-model="valorFactura"
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
                      >Agregar factura a la cartera</v-btn
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
                    >
                      <template v-slot:no-data>
                        <v-alert :value="true" color="#ffffff">
                          No hay facturas que mostrar
                        </v-alert>
                      </template>
                    </v-data-table>
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
                      >Calcular descuento de facturas total</v-btn
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
                    <h2>TCEA Total(%): {{ valorTotalTCEA }}</h2>
                  </v-col>
                </v-row>
                <v-row justify="space-around">
                  <v-col class="d-flex justify-center" cols="3">
                    <v-dialog v-model="dialog" width="500">
                      <v-container class="dialog">
                        <v-row>
                          <v-col class="justify-center">
                            <v-row justify="center">
                              <v-col>
                                <h2 style="text-align: center !important">
                                  Diccionario de datos:
                                </h2>
                              </v-col>
                            </v-row>
                            <v-row justify="center">
                              <v-col>
                                <p style="text-align: start !important">
                                  <b> <u>Tasa:</u> </b> representa si la tasa es
                                  efectiva o nominal.<br />
                                  <br />
                                  <b> <u>Plazo de tasa:</u> </b> Representa al
                                  tiempo en el que se expresa el plazo de la
                                  tasa de interés dada como dato. <br />
                                  <br />
                                  <b> <u>Porcentaje de tasa:</u> </b> Tasa de
                                  interés del periodo que está sujeta al
                                  préstamo tomado como porcentaje <br />
                                  <br />
                                  <b> <u>Periodo de capitalización:</u> </b>
                                  Válido solo si la tasa es Nominal. <br />
                                  <br />
                                  <b> <u>Fecha de descuento:</u> </b> Fecha en
                                  la que se descontará el instrumento
                                  financiero. <br />
                                  <br />
                                  <b> <u>Días por año:</u> </b> Tipo de
                                  calendario con el que se realizarán los
                                  cálculos. <br />
                                  <br />
                                  <b> <u>Motivo:</u> </b> El motivo de los
                                  costes o gastos <br />
                                  <br />
                                  <b> <u>Valor de costes/gastos:</u> </b> Valor
                                  de costes/gastos: Se coloca el monto cobrado
                                  al final de la operación. <br />
                                  <br />
                                  Si no se genera ningún coste o gasto, debe
                                  digitar 0 (cero). <br />
                                  <br />
                                  <b> <u>Fecha de emisión:</u> </b> Aquella
                                  fecha donde se origina la factura. <br />
                                  <br />
                                  <b> <u>Fecha de pago:</u> </b> Aquella fecha
                                  en la que vencerá el compromiso originado por
                                  la factura y el cliente realizará la
                                  cancelación. <br />
                                  <br />
                                  <b> <u>Total facturado:</u> </b> Valor por el
                                  que ha girado la factura y cuyo compromiso
                                  vence en la fecha de pago. <br />
                                  <br />
                                  <b> <u>Efectivo:</u> </b> Le permitimos hacer
                                  cálculo con dinero en soles o dólares. Pero el
                                  dinero a recibir se calculará y mostrará en
                                  soles. <br />
                                  <br />
                                  <b> <u>TED:</u> </b> Tasa efectiva descontada.
                                  <br />
                                  <br />
                                  <b> <u>d:</u> </b>
                                  Tasa descontada o adelantada dado en
                                  porcentaje.
                                  <br />
                                  <br />
                                  <b> <u>Descuento:</u> </b>
                                  Intereses adelantados que se descontarán del
                                  valor neto.
                                  <br />
                                  <br />
                                  <b> <u>Valor Neto:</u> </b>
                                  Representa al valor del instrumento al momento
                                  del descuento.
                                  <br />
                                  <br />
                                  <b> <u>Valor Entregado:</u> </b>
                                  Monto de dinero entregado en tiempo vencido.
                                  <br />
                                  <br />
                                  <b> <u>Valor total a recibir:</u> </b>
                                  Monto a recibir después de realizarle el
                                  descuento a la factura o facturas.
                                  <br />
                                  <br />
                                  <b> <u>TCEA:</u> </b>
                                  Tasa de Costos Efectivo Anual. Tasa que
                                  permite conocer el costo total a pagar dado en
                                  porcentaje.
                                  <br />
                                </p>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-dialog>
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
import Swal from "sweetalert2";
export default {
  name: "Cartera",
  components: {},
  data: () => ({
    buttonCrearCartera: false,
    buttonCrearCosto: true,
    buttonCrearCostoF: true,
    buttonCrearFactura: true,
    buttonResultado: true,
    buttonLimpiar: true,
    carteraNueva: null,
    dialog: false,
    selectPeriodoCapitalizacion: false,
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
    motivoModelF: "",
    motivoOptions: [
      { text: "Portes", value: "portes" },
      { text: "Fotocopias", value: "fotocopia" },
      { text: "Comisión de estudio", value: "comision_estudio" },
      { text: "Comisión de intermediación", value: "comision_intermediacion" },
      { text: "Gastos de administración", value: "gastos_administracion" },
      { text: "Seguro", value: "seguro" },
      { text: "Otros gastos", value: "otros" },
    ],
    motivoOptionsF: [
      { text: "Portes", value: "portes" },
      { text: "Gastos de administración", value: "gastos_administracion" },
      { text: "Otros gastos", value: "otros" },
    ],
    valorCosto: "0",
    valorCostoF: "0",
    modelMoneda: "",
    modelMonedaF: "",
    monedaOptions: [
      { text: "S/", value: "Sol" },
      { text: "$", value: "Dólar Americano" },
    ],
    costosLocales: [],
    costosLocalesF: [],
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
    valorFactura: "0",
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
    changedSelect() {
      if (this.tasaModel == "efectiva") {
        this.selectPeriodoCapitalizacion = true;
        this.periodoCapitalizacionModel = "diaria";
      } else if (this.tasaModel == "nominal") {
        this.selectPeriodoCapitalizacion = false;
      }
    },

    async crearCartera() {
      if (
        this.tasaModel == "" ||
        this.plazoTasaModel == "" ||
        this.porcentajeTasa == "" ||
        this.periodoCapitalizacionModel == "" ||
        this.diasPorYearModel == ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Datos incompletos",
          text: "Llene los datos correctamente",
        });
      } else if (
        parseFloat(this.porcentajeTasa) < 0 ||
        parseFloat(this.porcentajeTasa) > 100
      ) {
        Swal.fire({
          icon: "error",
          title: "Error en el porcentaje de tasa",
          text: "Debe ser un valor mayor a 0 y menor a 100",
        });
      } else {
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
      }
    },
    async agregarCosto() {
      if (
        this.motivoModel == "" ||
        this.valorCosto == "" ||
        this.modelMoneda == ""
      ) {
        console.log(this.motivoModel, this.valorCosto, this.modelMoneda);
        Swal.fire({
          icon: "error",
          title: "Datos incompletos",
          text: "Llene los datos correctamente",
        });
      } else if (parseFloat(this.valorCosto) < 0) {
        Swal.fire({
          icon: "error",
          title: "Dato incorrecto en el valor del Costo Inicial",
          text: "El valor tiene que ser mayor o igual que 0",
        });
      } else {
        //CostoService.addCosto(this.carteraNueva.CCartera,this.motivoModel,parseInt(this.valorCosto),this.modelMoneda)
        this.costosLocales.push({
          CCartera: this.carteraNueva.CCartera,
          NMotivo: this.motivoModel,
          NumMonto: parseFloat(this.valorCosto),
          NMoneda: this.modelMoneda,
        });
        //this.buttonCrearFactura = false;
        this.buttonCrearCostoF = false;
      }
    },
    async agregarCostoF() {
      if (
        this.motivoModelF == "" ||
        this.valorCostoF == "" ||
        this.modelMonedaF == ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Datos incompletos",
          text: "Llene los datos correctamente",
        });
      } else if (parseFloat(this.valorCostoF) < 0) {
        Swal.fire({
          icon: "error",
          title: "Dato incorrecto en el valor del Costo Final",
          text: "El valor tiene que ser mayor o igual que 0",
        });
      } else {
        this.buttonCrearCosto = true;
        this.costosLocalesF.push({
          CCartera: this.carteraNueva.CCartera,
          NMotivo: this.motivoModelF,
          NumMonto: parseFloat(this.valorCostoF),
          NMoneda: this.modelMonedaF,
        });

        this.buttonCrearFactura = false;
      }
    },
    async agregarFactura() {
      if (this.valorFactura == "" || this.modelMonedaFactura == "") {
        Swal.fire({
          icon: "error",
          title: "Datos incompletos",
          text: "Llene los datos correctamente",
        });
      } else if (parseFloat(this.valorFactura) <= 0.0) {
        Swal.fire({
          icon: "error",
          title: "Dato incorrecto en el valor de la factura",
          text: "El valor tiene que ser mayor que 0",
        });
      } else {
        if (this.buttonCrearCostoF == false) {
          //this.buttonCrearCosto = true;
          this.buttonCrearCostoF = true;
          const res = await CostoService.addCosto(this.costosLocales);
          const res2 = await CostoService.addCostoF(this.costosLocalesF);
        }

        this.montoFactura = await Operaciones.ConversorFactura(
          this.valorFactura,
          this.modelMonedaFactura
        );

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

        const NumVRecibido = await Operaciones.NumVRecibido(
          NumVNeto,
          this.costosLocales,
          0
        );

        const NumVEntregado = await Operaciones.NumVEntregado(
          parseFloat(this.montoFactura),
          this.costosLocalesF,
          0
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
      }
    },
    async resultado() {
      this.buttonLimpiar = true;
      this.buttonCrearFactura = true;
      this.buttonResultado = true;

      const res = await FacturaService.addFacturas(this.facturasLocales);

      let aux = 0;
      this.facturasLocales.forEach((factura) => {
        aux = aux + factura.NumVRecibido;
      });
      this.valorTotalARecibir = parseFloat(aux.toFixed(2));

      let aux2 = 0;
      this.facturasLocales.forEach((factura) => {
        aux2 = aux2 + factura.NumTCEA;
      });
      this.valorTotalTCEA = aux2 / this.facturasLocales.length;

      /*this.valorTotalTCEA = Operaciones.NumTCEATotal(
        Operaciones.arregloFlujo(this.valorTotalARecibir, this.facturasLocales)
      );*/
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

p {
  color: white;
  text-align: center;
}

.dialog {
  /*background-image: linear-gradient(
    to bottom,
    #0f3369,
    #56337e,
    #95227c,
    #ca0063,
    #eb1238
  );*/
  background: #008c93;
}
</style>