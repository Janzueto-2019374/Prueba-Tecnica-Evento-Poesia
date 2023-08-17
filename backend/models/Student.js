const mongoose = require('mongoose');

//Base de datos y definido el modelo de datos utilizando Mongoose.
const studentSchema = new mongoose.Schema({
  carnet: String,
  nombre: String,
  direccion: String,
  genero: String,
  telefono: String,
  fechaNacimiento: Date,
  carrera: String,
  generoPoesia: String,
  fechaInscripcion: Date,
});

//Estudiante se inscribe a través del formulario, los datos se guardarán en la base de datos MongoDB.
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
