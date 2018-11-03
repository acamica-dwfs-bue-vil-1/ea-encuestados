/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  if (localStorage.preguntas) {
    this.preguntas = JSON.parse(localStorage.getItem('preguntas'));    
  }
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let id = [0];
    this.preguntas.forEach(e => id.push(e.id));
    
    let max = id.reduce((valorInicial, valorActual) => {
          if (valorActual > valorInicial) {
            return valorActual;
          }else{
            return valorInicial;
          }
        });
      return max;
      
    //  if (this.preguntas !== []) {
  //   return Math.max(this.preguntas.id);
  // }else{
  //   return 0;
  // }
  
    // Math.max(this.preguntas);
    // let max;
    // if (this.preguntas !== []) {
    //   max = this.preguntas.reduce((valorInicial, valorActual) => {
    //     if (valorActual > valorInicial) {
    //       return valorActual;
    //     }else{
    //       return valorInicial;
    //     }
    //   }, this.ultimoId);
    // }
    // this.ultimoId = max;
    // return this.ultimoId;    
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    console.log(this.preguntas);
    // this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
  //se borran las preguntas
  borrarPregunta: function(id){
    //arreglar el find!
    let arrPreguntaBorrada = this.preguntas.filter(pregunta => pregunta.id !== id);
    console.log(arrPreguntaBorrada);
    [...this.preguntas] = arrPreguntaBorrada;
    // this.guardar();    
    this.preguntaEliminada.notificar();    
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    this.preguntas.forEach(pregunta => {
      if (pregunta.textoPregunta === nombrePregunta) {
        pregunta.cantidadPorRespuesta.forEach(respuesta => {
          if (respuesta.textoRespuesta === respuestaSeleccionada) {
            respuesta.cantidad++;
          }
        });
      }
    });
    console.log(nombrePregunta, respuestaSeleccionada);
    // this.guardar();
  },

  borrarTodo: function () {
    this.preguntas = [];
    this.preguntasEliminadas.notificar();    
  },

  editarPregunta: function (id) {
    let preguntaAEditadar = this.preguntas.find(pregunta => pregunta.id === id);
    console.log('pregunta a editar: ' + preguntaAEditadar.textoPregunta);
    const edicionPregunta = prompt('Editar pregunta:')
    preguntaAEditadar.textoPregunta = edicionPregunta;
    this.preguntaEditada.notificar();    
  },
};
