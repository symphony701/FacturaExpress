<template>
  <v-container class="container-s">
    <v-row justify="center">
      <v-col cols="12" class="justify-center">
        <v-row justify="center">
          <h1>Preguntas Frecuentes</h1>
        </v-row>
        <v-row justify="start">
          <h2>¿Qué es FacturaXpress?</h2>
        </v-row>
        <v-row justify="start">
          <p>
            FacturaXpress es una aplicación web que le ofrece al usuario
            administrar una cartera de descuento de facturas.
          </p>
        </v-row>
        <v-row justify="start">
          <h2>¿Como puedo realizar el descuento de una factura?</h2>
        </v-row>
        <v-row justify="start">
          <p>
            Para poder navegar y utilizar la aplicación solamente se necesita
            crear una cuenta con tu correo, nombre y contraseña ¡No te preocupes
            porque es gratuito!
          </p>
        </v-row>
        <v-row justify="start">
          <h2>
            ¿Qué puedo configurar al realizar el descuento de una factura?
          </h2>
        </v-row>
        <v-row justify="start">
          <p>
            Te permitimos configurar todo lo que necesites respecto a los datos
            que te brinda el banco, los costos iniciales que te indican y los
            datos de las facturas a las que les quieres realizar el descuento.
          </p>
        </v-row>
        <v-row justify="start">
          <p>
            Te permitimos configurar todo lo que necesites respecto a los datos
            que te brinda el banco, los costos iniciales que te indican y los
            datos de las facturas a las que les quieres realizar el descuento.
          </p>
          <p>Lista de datos configurables:</p>
        </v-row>
        <v-row justify="start">
          <ul>
            <li>Tipo de tasa</li>
            <li>Plazo de la tasa</li>
            <li>Porcentaje de la tasa</li>
            <li>
              Periodo de capitalización (solo si el tipo de tasa es nominal)
            </li>
            <li>Fecha en la que se realizará el descuento</li>
            <li>Número de dias por año con los que se trabajará</li>
            <li>
              Costos y/gastos iniciales que deben pagarse al acreedor para
              realizar la operacion. (Colocar valores enteros)
            </li>
            <li>Fecha de emisión de la factura</li>
            <li>Fecha de pago de la factura</li>
            <li>Total facturado</li>
            <li>Tipo de moneda del total facturado</li>
          </ul>
        </v-row>
        <v-row justify="start">
          <h2>
            ¿Qué puedo configurar al realizar el descuento de una factura?
          </h2>
        </v-row>
        <v-row justify="start">
          <h2>¿Alguno de los servicios ofrecidos son de pago?</h2>
        </v-row>
        <v-row justify="start">
          <p>
            Al igual que para crear una cuenta en la aplicación no se realiza
            ningún pago, para utilizar todos los servicios que te brindamos
            tamopoco se debe realizar algún tipo de pago. Nuestros servicios son
            gratuitos.
          </p>
        </v-row>
        <v-row justify="start">
          <h5>
            Copyright&copy; 2021 - App's Symphony/Johnny Roque - Todos los
            derechos reservados
          </h5>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "About",
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&display=swap");
.container-s {
  height: auto !important;
  display: flex;
  align-items: center;
}
* {
  color: white;
}
p {
  margin-bottom: 20px !important;
}
h2 {
  font-family: "Dongle";
  font-size: 3rem;
}
</style>
