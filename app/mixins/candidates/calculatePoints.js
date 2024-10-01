export default function calculatePoints(employee) {
  let points = 0;

  // 1. Cédula Uruguaya
  if (employee.cedulaUruguaya === 'Si') {
    points += 10;
  } else if (employee.cedulaUruguaya === 'EstoyEnProceso') {
    points += 5;
  }

  // 2. Disponibilidad por ubicación
  if (employee.residePuntaDelEste === 'Si') {
    points += 20;
  }

  if (employee.mediosVivirPuntaDelEste === 'Si') {
    points += 10;
  } else if (employee.mediosVivirPuntaDelEste === 'NecesitariaAsistencia') {
    points += 5;
  } else if (employee.mediosVivirPuntaDelEste === 'No') {
    return 0; // Descartar si no tiene medios para vivir en Punta del Este
  }

  if (employee.familiaReside === 'PuntaDelEste') {
    points += 10;
  } else if (employee.familiaReside === 'OtroUruguay') {
    points += 5;
  }

  // 3. Disponibilidad para asistir a la Academia de Formación Laboral
  if (employee.trabajandoActualmente === 'No') {
    points += 15;
  } else if (employee.trabajandoActualmente === 'Si') {
    points += 5;
    if (employee.dispuestoARenunciar === 'SiTotal') {
      points += 10;
    } else if (employee.dispuestoARenunciar === 'SoyIndependiente') {
      points += 5;
    }
  }

  // 4. Disponibilidad horaria
  if (employee.disponibilidadTurnos === 'Si') {
    points += 10; // Agregar puntos por disponibilidad horaria
  }

  // 5: Idiomas
  switch (employee.portugues) {
    case 'Fluido':
      points += 10;
      break;
    case 'Intermedio':
      points += 5;
      break;
  }

  switch (employee.ingles) {
    case 'Fluido':
      points += 5;
      break;
    case 'Intermedio':
      points += 3;
      break;
  }

  // Agregar puntos por otros idiomas (asumiendo que 'otrosIdiomas' es un array)

  // 6: Experiencia laboral y posiciones de autoridad
  if (employee.experienciaCasinos === 'Si') {
    points += 5;
  }

  // Asumiendo que 'areasExperiencia' es un array
  switch (employee.areasExperiencia) {
    case 'AtencionCliente':
    case 'Cajas':
    case 'MaquinasTragamonedas':
    case 'MesasDeJuego':
      points += 5;
      break;
  }

  switch (employee.posicionesAutoridad) {
    case 'Supervisor':
      points += 5;
      break;
    case 'Jefe':
      points += 8;
      break;
    case 'Gerente':
      points += 10;
      break;
  }

  switch (employee.cantidadEmpleados) {
    case '1-5':
      points += 5;
      break;
    case '6-10':
      points += 7;
      break;
    case 'MasDe10':
      points += 10;
      break;
  }
  if (employee.disponibilidadComenzar === 'MenosDe6Meses') {
    points += 10;
  } else if (employee.disponibilidadComenzar === 'MasDe6Meses') {
    points += 5;
  }
  if (employee.situacionMaquinaTragamonedas === 'Disculparme') {
    points += 5;
  } else if (employee.situacionMaquinaTragamonedas === 'Resolver') {
    points += 10;
  }

  if (employee.situacionClienteAgresivo === 'Calmar') {
    points += 10;
  } else if (employee.situacionClienteAgresivo === 'Firme') {
    points += 5;
  }

  if (employee.situacionErrorCaja === 'Reportar') {
    points += 10;
  } else if (employee.situacionErrorCaja === 'Arreglar') {
    points += 5;
  }
  return points;
}