// import * from "api.js"
export { excluir, carregar, adicionar }

function carregar(key) {
    if (!key) return false;
    let items = JSON.parse(localStorage.getItem(key));
    return items
}

function salvaLocal(key, item) {
    localStorage.setItem(
        key,
        JSON.stringify(item)
    );

    return item;
}

function excluir(key, id) {

    if (!key || !id) return false;

    let items = carregarStorage(key);

    if (!items) return items;

    items.splice(items.findIndex(x => x.id === id), 1);

    let res = salvaLocal(key, items);
    return res;
}

function contador(key) {

    let count = localStorage.getItem(key + '-counter');
    count = count ? parseInt(count) : 0;
    count++;

    localStorage.setItem(key + '-counter', count + '');

    return count;
}

function adicionar(key, item) {

    let items = carregar(key);
    if (!items) items = [];

    item.id = contador(key);
    items.push(item);

    salvaLocal(key, items);
};

function alterar(item) {
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

    this.abastecimentos.sort(function (b, a) {
        let bi = parseFloat(b.km);
        let ai = parseFloat(a.km);
        return ai < bi ? -1 : ai > bi ? 1 : 0;
    });

    this.salvaLocal();

    this.dialogEdit = false;
};



