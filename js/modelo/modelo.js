/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
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
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
  },
  //se borran las preguntas
  borrarPregunta: function(id){
    //arreglar el find!
    let arrPreguntaBorrada = this.preguntas.filter(pregunta => pregunta.id !== id);
    console.log(arrPreguntaBorrada);
    [...this.preguntas] = arrPreguntaBorrada;
    this.preguntaEliminada.notificar();    
  } 
};
