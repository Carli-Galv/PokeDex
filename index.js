const app = new Vue({
  el: "#App",
  data: {
    buscador: "",
    imprimir: [],
    listaFiltrada: [],
    lista: [],
    cargando: true,
    active: [],
  },
    methods: {
      paginacion: function (pagina){
        this.active = [];
        this.imprimir = [];
        let nPaginas = this.listaFiltrada.length / 40;
        for (i=0; i<nPaginas; i++){
          this.active.push(false);
        }
        this.active[pagina] = true;
        let init = pagina*40;
        for(i=init; i<init+40; i++){
          let id = this.listaFiltrada[i];
          this.imprimir.push({
            name: this.lista.data.results[id].name[0].toUpperCase() + this.lista.data.results[id].name.slice(1),
            id: (id+1).toString().padStart(3,'0'),
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id+1}.png`
          });
        }
        window.scroll(0,0)
      },
      buscar: function () {
        this.listaFiltrada = [];
        if(this.buscador === ""){
          for(i=0; i<800; i++){
            this.listaFiltrada.push(i);
          }
        }
        else{
          for(let i=0; i < 800; i++){
            if(this.lista.data.results[i].name.indexOf(this.buscador.toLowerCase()) != -1){
              this.listaFiltrada.push(i);
            }
          }
        }
        this.paginacion(0);
      },
    },
    created: async function () {
        this.lista = await axios(`https://pokeapi.co/api/v2/pokemon?limit=801`);
        this.buscar();
    }
  });