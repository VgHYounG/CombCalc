<template>
  <v-app>
    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
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
