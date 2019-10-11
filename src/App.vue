<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dark>
      <div class="flex-grow-1"></div>
      <v-icon>local_gas_station</v-icon>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <v-toolbar-title>CombCalc</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-content>
      <calculacombMain />
    </v-content>
  </v-app>
</template>

<script>
import calculacombMain from "./components/calculacombMain";
import header from "./components/header.vue";
import footer from "./components/footer.vue";

export default {
  name: "App",
  components: {
    calculacombMain,
    header,
    footer
  }
};
</script>
