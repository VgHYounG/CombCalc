<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="km"
            :error="Erros.km"
            label="Km Atual"
            required
            dense
            single-line
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="litros"
            :error="Erros.litros"
            label="Litros"
            required
            dense
            single-line
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="valor"
            :error="Erros.valor"
            label="valor"
            required
            dense
            single-line
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="data" :error="Erros.data" label="data" required dense></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="success" class="mr-4" @click="adicionar()" block>Gravar</v-btn>
    </v-form>

    <v-list flat>
      <v-subheader>Historico</v-subheader>
      <v-list-item v-for="(item, index) in abastecimentos" :key="item.id">
        <v-list-item-content>
          <v-row dense>
            <v-col cols="4">
              <span v-text="item.data"></span>
            </v-col>
            <v-col cols="4">
              <span v-text="item.valor + ' R$'"></span>
            </v-col>
            <v-col cols="2" />
            <v-col cols="2" class="c-align-right">
              <v-btn icon @click="itemSendoEditado = {...item}; dialogEdit = true">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="4">
              <span v-text="item.km  + 'Km'"></span>
            </v-col>
            <v-col cols="4">
              <span v-text="item.litros + ' L'"></span>
            </v-col>
            <v-col cols="4" class="c-align-right">
              <span
                v-text=" (item.km - abastecimentos[index <= 0 ? 0   : index - 1].km) / item.litros+ ' Km/L'"
              ></span>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-dialog v-model="dialogEdit" persistent>
      <v-card>
        <v-card-title>
          <span>Editar Abastecimento</span>
          <div class="flex-grow-1"></div>
          <v-btn icon @click="this.dialogExclude = true">
            <v-icon color="red">delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="itemSendoEditado.km"
                  :error="Erros.edKm"
                  label="Km Atual"
                  required
                  dense
                  single-line
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="itemSendoEditado.litros"
                  :error="Erros.edLitros"
                  label="Litros"
                  required
                  dense
                  single-line
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="itemSendoEditado.valor"
                  :error="Erros.edValor"
                  label="valor"
                  required
                  dense
                  single-line
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="data" :error="Erros.edData" label="data" required dense></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialogEdit = false">Cancelar</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="green darken-1" text @click="alterar(itemSendoEditado)">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEdit" persistent>
      <v-card>
        <v-card-title>
          <h1>Editar Abastecimento</h1>
        </v-card-title>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialogExclude = false">Cancelar</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="red darken-1" text @click="excluir(itemSendoEditado)">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  methods: {
    excluir(item){
      this.abastecimentos.splice(this.abastecimentos.findIndex(x => x.id === item.id));
      this.salvaLocal();
      this.dialogExclude = false;
      this.dialogEdit = false;
    },
    alterar(item) {
      console.log(item);
      
      if (item.km.length <= 0) this.Erros.edKm = true;
      else this.Erros.edKm = false;
      if (item.litros.length <= 0) this.Erros.edLitros = true;
      else this.Erros.edLitros = false;
      if (item.valor.length <= 0) this.Erros.edValor = true;
      else this.Erros.edValor = false;
      if (item.data.length <= 0) this.Erros.edData = true;
      else this.Erros.edData = false;

      if (
        this.Erros.edKm ||
        this.Erros.edLitros ||
        this.Erros.edValor ||
        this.Erros.edData
      ) {
        return;
      }
      let idxEdt = this.abastecimentos.findIndex(x => x.id === item.id);

      this.abastecimentos[idxEdt] = item;

      this.salvaLocal();
      this.dialogEdit = false;
    },
    adicionar() {
      if (this.km.length <= 0) this.Erros.km = true;
      else this.Erros.km = false;
      if (this.litros.length <= 0) this.Erros.litros = true;
      else this.Erros.litros = false;
      if (this.valor.length <= 0) this.Erros.valor = true;
      else this.Erros.valor = false;
      if (this.data.length <= 0) this.Erros.data = true;
      else this.Erros.data = false;

      if (
        this.Erros.km ||
        this.Erros.litros ||
        this.Erros.valor ||
        this.Erros.data
      ) {
        return;
      }

      let id = localStorage.counter ? parseInt(localStorage.counter) + 1 : 1;
      localStorage.counter = id;

      this.abastecimentos.push({
        id: id,
        km: this.km,
        litros: this.litros,
        valor: this.valor,
        data: this.data
      });
      this.salvaLocal();
    },
    salvaLocal() {
      localStorage.setItem(
        "abastecimentos",
        JSON.stringify(this.abastecimentos)
      );
    }
  },
  data() {
    if (!localStorage.getItem("abastecimentos")) {
      localStorage.setItem("abastecimentos", JSON.stringify([]));
    }

    return {
      km: "",
      litros: "",
      valor: "",
      data: new Date().toLocaleDateString("pt-BR"),
      dialogEdit: false,
      dialogExclude: false,
      itemSendoEditado: [],
      Erros: {
        km: false,
        litros: false,
        data: false,
        valor: false,
        edKm: false,
        edLitros: false,
        edData: false,
        edValor: false
      },
      abastecimentos: JSON.parse(localStorage.getItem("abastecimentos"))
    };
  }
};
</script>

<style scoped>
.c-align-right {
  text-align: right;
}
</style>