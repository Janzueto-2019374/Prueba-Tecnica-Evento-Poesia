const Student = require('../models/Student');
const { addDays, isFriday, isSaturday, isSunday } = require('date-fns');

exports.addStudent = async (req, res) => {
    const {
      carnet,
      nombre,
      direccion,
      genero,
      telefono,
      fechaNacimiento,
      carrera,
      generoPoesia,
    } = req.body;
  
    // Validaciones del carnet
    if (carnet.length !== 6 || carnet[0] !== 'A' || carnet[2] !== '5' || !['1', '3', '9'].includes(carnet[5])) {
      return res.status(400).send('Carnet inválido');
    }
  
    // Validación de edad
    const today = new Date();
    const age = Math.floor((today - new Date(fechaNacimiento)) / (365.25 * 24 * 60 * 60 * 1000));
    if (age <= 17) {
      return res.status(400).send('Debes ser mayor de 17 años para participar');
    }
  
    // Lógica para definir la fecha de declamación según las reglas
    let fechaDeclaracion;
    if (carnet.endsWith('1') && generoPoesia === 'dramatico') {
      fechaDeclaracion = addDays(new Date(), 5);
      while (isSaturday(fechaDeclaracion) || isSunday(fechaDeclaracion)) {
        fechaDeclaracion = addDays(fechaDeclaracion, 1);
      }
    } else if (carnet.endsWith('3') && generoPoesia === 'epico') {
      const ultimoDiaMes = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      fechaDeclaracion = ultimoDiaMes;
      while (isSaturday(fechaDeclaracion) || isSunday(fechaDeclaracion)) {
        fechaDeclaracion = addDays(fechaDeclaracion, -1);
      }
    } else if (carnet.endsWith('9') && generoPoesia === 'lirico') {
      fechaDeclaracion = addDays(new Date(), 1);
      while (!isFriday(fechaDeclaracion)) {
        fechaDeclaracion = addDays(fechaDeclaracion, 1);
      }
    }
  
    const fechaInscripcion = new Date();
  
    const student = new Student({
      carnet,
      nombre,
      direccion,
      genero,
      telefono,
      fechaNacimiento,
      carrera,
      generoPoesia,
      fechaInscripcion,
      fechaDeclaracion,
    });
  
    try {
      await student.save();
      res.status(201).send('Inscripción exitosa');
    } catch (error) {
      res.status(500).send('Error al procesar la inscripción');
    }
  };
  

  exports.getReport = async (req, res) => {
    try {
      const students = await Student.find();
      const reportData = students.map(student => ({
        nombre: student.nombre,
        carrera: student.carrera,
        fechaNacimiento: student.fechaNacimiento,
        generoPoesia: student.generoPoesia,
        fechaDeclaracion: student.fechaDeclaracion,
      }));
      res.status(200).json(reportData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error al obtener el reporte');
    }
  };
  
