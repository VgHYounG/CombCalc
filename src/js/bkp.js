excluir(item) {
      this.abastecimentos.splice(
        this.abastecimentos.findIndex(x => x.id === item.id),
        1
      );
      this.salvaLocal();
      this.dialogExclude = false;
      this.dialogEdit = false;
    },
    alterar(item) {
      if (item.km.length <= 0 || parseFloat(item.km) <= 0)
        this.Erros.edKm = true;
      else this.Erros.edKm = false;
      if (item.litros.length <= 0 || parseFloat(item.litros) <= 0)
        this.Erros.edLitros = true;
      else this.Erros.edLitros = false;
      if (item.valor.length <= 0 || parseFloat(item.valor) <= 0)
        this.Erros.edValor = true;
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

      this.abastecimentos.sort(function(b, a) {
        let bi = parseFloat(b.km);
        let ai = parseFloat(a.km);
        return ai < bi ? -1 : ai > bi ? 1 : 0;
      });

      this.salvaLocal();

      this.dialogEdit = false;
    },
    adicionar() {
      if (this.km.length <= 0 || parseFloat(this.km) <= 0) this.Erros.km = true;
      else this.Erros.km = false;
      if (this.litros.length <= 0 || parseFloat(this.litros) <= 0)
        this.Erros.litros = true;
      else this.Erros.litros = false;
      if (this.valor.length <= 0 || parseFloat(this.valor) <= 0)
        this.Erros.valor = true;
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

      if (this.abastecimentos.length > 0)
        if (parseFloat(this.km) <= parseFloat(this.abastecimentos[0].km)) {
          this.alerta(
            "Km inserida deve ser maior do que o ultimo abastecimento"
          );
          return;
        }

      let id = localStorage.counter ? parseInt(localStorage.counter) + 1 : 1;
      localStorage.counter = id;

      this.abastecimentos.unshift({
        id: id,
        km: this.km,
        litros: this.litros,
        valor: this.valor,
        data: this.data
      });

      this.km = "";
      this.litros = "";
      this.valor = "";
      this.data = new Date().toLocaleDateString("pt-BR");
      this.salvaLocal();
    },
    salvaLocal() {
      localStorage.setItem(
        "abastecimentos",
        JSON.stringify(this.abastecimentos)
      );
    },
    