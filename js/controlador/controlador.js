/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
    this.modelo.guardar();
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);  
    this.modelo.guardar();    
  },
  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
    this.modelo.guardar();       
  },
  borrarTodo: function () {
    this.modelo.borrarTodo();
    this.modelo.guardar();       
  },
  editarPregunta: function (id) {
    this.modelo.editarPregunta(id);
    this.modelo.guardar();
  }
};
