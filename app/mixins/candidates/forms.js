export default function useCandidateForms() {
    const columnDefinition = {
      md: 6,
      sm: 12,
    };
    
    const personalInfoSchema = {
      nombre: {
        type: "text",
        placeholder: "Nombre",
        columns: columnDefinition,
      },
      apellido: {
        type: "text",
        placeholder: "Apellido",
        columns: columnDefinition,
      },
      email: {
        type: "text",
        label: "Email",
        columns: columnDefinition,
      },
      pais: {
        type: "text",
        label: "País de residencia actual",
        columns: columnDefinition,
      },
      nacionalidad: {
        type: "text",
        label: "Nacionalidad",
        columns: columnDefinition,
      },
      edad: {
        type: "text",
        inputType: "number",
        label: "Edad",
        columns: columnDefinition,
      },
      telefono: {
        type: "phone",
        label: "Número de contacto",
        columns: columnDefinition,
      },
      cedulaUruguaya: {
        type: "select",
        label: "¿Tienes cédula Uruguaya?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
          {
            value: "EnProceso",
            label: "Estoy en proceso de obtenerla",
          },
        ],
        columns: {
          md: 6,
          sm: 12,
        },
      },
      residenciaActual: {
        type: "select",
        label: "¿Actualmente, resides en Punta del Este o cerca de Maldonado, Uruguay?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      mediosParaVivir: {
        type: "select",
        label: "¿Tienes los medios para vivir en Punta del Este durante tu capacitación y período de trabajo?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
          {
            value: "Asistencia",
            label: "Necesitaría asistencia",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      residenciaFamiliar: {
        type: "select",
        label: "¿Dónde reside tu familia actualmente?",
        items: [
          {
            value: "PuntaDelEste",
            label: "En Punta del Este o Maldonado",
          },
          {
            value: "OtraParteUruguay",
            label: "En otra parte de Uruguay",
          },
          {
            value: "OtroPais",
            label: "En otro país",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
    };
    
    const contactoSchema = {
      titleName: {
        type: "static",
        content: "Nombre completo",
        tag: "b",
      },
      divider: {
        type: "static",
        tag: "hr",
      },
      nombre: {
        type: "text",
        placeholder: "Nombre",
        columns: columnDefinition,
      },
      apellido: {
        type: "text",
        placeholder: "Apellido",
        columns: columnDefinition,
      },
      email: {
        type: "email",
        label: "Email",
        columns: columnDefinition,
      },
      telefono: {
        type: "text",
        label: "Teléfono",
        columns: columnDefinition,
      },
      fechaDeNacimiento: {
        type: "text",
        inputType: "date",
        label: "Fecha de nacimiento",
        columns: columnDefinition,
      },
      direccion: {
        type: "text",
        label: "Dirección",
        columns: columnDefinition,
      },
      estudios: {
        type: "textarea",
        label: "Estudios",
        columns: {
          md: 12,
          sm: 12,
        },
      },
      idioma: {
        type: "text",
        label: "Idioma",
        columns: columnDefinition,
      },
      laboralActual: {
        type: "text",
        label: "Laboral actual",
        columns: columnDefinition,
      },
      infoAdicional: {
        type: "textarea",
        label: "Info adicional",
        columns: {
          md: 12,
          sm: 12,
        },
      },
      antecedentes: {
        type: "textarea",
        label: "Antecedentes",
        columns: {
          md: 12,
          sm: 12,
        },
      },
      linkCV: {
        type: "text",
        label: "LINK CV - LINKEDIN",
        columns: columnDefinition,
      },
      puestoInteres: {
        type: "text",
        label: "Puesto de interés",
        columns: columnDefinition,
      },
      areaInteres: {
        type: "text",
        label: "Area de interés",
        columns: columnDefinition,
      },
    };
    
    const laboralSchema = {
      trabajandoActualmente: {
        type: "select",
        label: "¿Estás trabajando actualmente?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      dispuestoARenunciar: {
        type: "select",
        label: "Si estás trabajando, ¿estarías dispuesto a renunciar para participar de la academia de personal?",
        items: [
          {
            value: "SiTotal",
            label: "Sí, tengo disponibilidad total",
          },
          {
            value: "NoSoloTrabajar",
            label: "No, renunciaría sólo para trabajar, no para participar de la academia",
          },
          {
            value: "SoyIndependiente",
            label: "Soy independiente, tengo autonomía para realizar ambas cosas",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      movilidadAcademia: {
        type: "select",
        label: "¿Tienes movilidad propia para asistir a la Academia de Formación Laboral en el área de Punta del Este, Maldonado o Manantiales durante un período de capacitación de hasta 8 meses?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
          {
            value: "TransportePublico",
            label: "Dependo del transporte público",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      disponibilidadTurnos: {
        type: "select",
        label: "¿Tienes disponibilidad para trabajar en turnos rotativos (incluyendo nocturnos, fines de semana y feriados)?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      portugues: {
        type: "select",
        label: "¿Hablas portugués?",
        items: [
          {
            value: "Fluido",
            label: "Fluido",
          },
          {
            value: "Intermedio",
            label: "Intermedio",
          },
          {
            value: "No",
            label: "No",
          },
        ],
        columns: columnDefinition,
      },
      ingles: {
        type: "select",
        label: "¿Hablas inglés?",
        items: [
          {
            value: "Fluido",
            label: "Fluido",
          },
          {
            value: "Intermedio",
            label: "Intermedio",
          },
          {
            value: "No",
            label: "No",
          },
        ],
        columns: columnDefinition,
      },
      otrosIdiomas: {
        type: "text",
        label: "¿Hablas otros idiomas relevantes para el trabajo (especificar)?",
        columns: {
          md: 12,
          sm: 12,
        },
      },
      experienciaCasinos: {
        type: "select",
        label: "¿Tienes experiencia trabajando en casinos?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      areasExperiencia: {
        type: "checkbox-group",
        label: "¿En qué áreas tienes experiencia en casinos? (Selecciona todas las que correspondan)",
        items: [
          {
            value: "AtencionCliente",
            label: "Atención al cliente",
          },
          {
            value: "Cajas",
            label: "Cajas",
          },
          {
            value: "MaquinasTragamonedas",
            label: "Máquinas tragamonedas (slots)",
          },
          {
            value: "MesasDeJuego",
            label: "Mesas de juego",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
      posicionesAutoridad: {
        type: "select",
        label: "¿Has ocupado posiciones de autoridad como supervisor, jefe o gerente en un casino o en un entorno similar?",
        items: [
          {
            value: "Supervisor",
            label: "Sí, como supervisor",
          },
          {
            value: "Jefe",
            label: "Sí, como jefe",
          },
          {
            value: "Gerente",
            label: "Sí, como gerente",
          },
          {
            value: "No",
            label: "No",
          },
        ],
      },
      cantidadEmpleados: {
        type: "select",
        label: "¿Cuántos empleados tenías a tu cargo en posiciones de autoridad?",
        items: [
          {
            value: "D1A5",
            label: "1-5 empleados",
          },
          {
            value: "D6A10",
            label: "6-10 empleados",
          },
          {
            value: "MasDe10",
            label: "Más de 10 empleados",
          },
          {
            value: "Ninguno",
            label: "No tenía empleados a cargo",
          },
        ],
        columns: {
          md: 12,
          sm: 12,
        },
      },
    };
    
    const finalQuestionSchema = {
      situacionMaquinaTragamonedas: {
        type: "Radiogroup",
        label: "En una situación donde un cliente se queja de una máquina tragamonedas que no parece funcionar correctamente, ¿cómo reaccionarías?",
        items: [
          {
            value: "Disculparme",
            label: "Me disculparía y buscaría la ayuda de un supervisor",
          },
          {
            value: "Resolver",
            label: "Intentaría resolver el problema directamente o explicaría cómo funciona la máquina",
          },
          {
            value: "Derivar",
            label: "No es mi responsabilidad, derivaría el caso al departamento técnico",
          },
        ],
      },
      situacionClienteAgresivo: {
        type: "Radiogroup",
        label: "Durante un turno largo, un cliente comienza a comportarse de manera agresiva porque perdió dinero en la mesa de juego. ¿Cómo reaccionas?",
        items: [
          {
            value: "Calmar",
            label: "Mantendría la calma, trataría de calmar al cliente y pediría asistencia de seguridad si es necesario",
          },
          {
            value: "Ignorar",
            label: "Ignoraría al cliente, no es mi problema",
          },
          {
            value: "Firme",
            label: "Me mantendría firme pero cortés, explicando que la situación no puede ser modificada",
          },
        ],
      },
      situacionErrorCaja: {
        type: "Radiogroup",
        label: "Durante una auditoría rutinaria, se detecta un error de caja de $500. Tú fuiste responsable de la caja en ese momento. ¿Qué haces?",
        items: [
          {
            value: "Reportar",
            label: "Reporto el error inmediatamente para aclararlo",
          },
          {
            value: "Arreglar",
            label: "Intento arreglarlo por mi cuenta antes de decir algo",
          },
          {
            value: "NoMencionar",
            label: "No menciono nada, es posible que no lo noten",
          },
        ],
      },
      disponibilidadComenzar: {
        type: "select",
        label: "¿Estás disponible para comenzar a trabajar o participar de la academia en menos de 6 meses?",
        items: [
          {
            value: "Si",
            label: "Sí",
          },
          {
            value: "No",
            label: "No",
          },
          {
            value: "Otro",
            label: "Otro (especificar)",
          },
        ],
      },
      expectativaSalarial: {
        type: "number",
        label: "¿Cuál es tu expectativa salarial mensual (en USD)?",
      },
      comentariosAdicionales: {
        type: "textarea",
        label: "¿Hay algo más que te gustaría compartir con nosotros sobre tu disponibilidad o experiencia?",
      },
    };
    
    
    return {
      columnDefinition,
      personalInfoSchema,
      contactoSchema,
      laboralSchema,
      finalQuestionSchema,
    };
  }