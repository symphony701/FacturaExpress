<template>
  <v-app class="general">
    <v-main class="general">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.general {
  background-image: linear-gradient(
    to right bottom,
    #051937,
    #38245a,
    #77216c,
    #b70767,
    #eb124b
  );
}
h1 {
  color: white;
  font-family: "Exo 2";
  font-weight: 700;
  font-size: 3rem;
}
h2 {
  color: white;
}

.v-picker__body {
  background: #051937;
}
</style>
