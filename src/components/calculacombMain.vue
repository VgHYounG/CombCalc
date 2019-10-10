<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="km" label="Km Atual" required dense></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="litros" label="Litros" required dense></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="valor" label="valor" required dense></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="data" label="data" required dense></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="success" class="mr-4" @click.stop="">Validate</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            km: "",
            litros: "",
            valor: "",
            data: ""
        }
    }
}
</script>