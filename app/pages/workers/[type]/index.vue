<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar class="primary navbar" :title="$route.params.type === 'empleados' ? 'Empleados' : 'Candidatos'" />

      <UDashboardPanelContent>
        <UCard class="card mb-4">
          <UForm :validate-on="['submit']" :state="filters" class="space-y-4" @submit.prevent="onSubmit">
            <div class="vf-row">
              <UFormGroup 
                v-for="(field, key) in filterSchema" 
                :key="key"
                :class="['vf-col-4', field.columns, {'hidden': !field.show}]"
                :label="field.label" 
                :name="key" 
              >
                <UInput 
                  v-if="field.type === 'date'" 
                  v-model="filters[key]" 
                  type="date" 
                />
                <UInput 
                  v-if="field.type === 'text'" 
                  v-model="filters[key]" 
                  :type="field.inputType || 'text'"
                  :placeholder="field.placeholder" 
                />
                <USelect
                  v-else-if="field.type === 'select'" 
                  v-model="filters[key]" 
                  :options="field.items" 
                />
              </UFormGroup>
              <UFormGroup class="vf-col-12 vf-col-md-12">
                <UButton class="primary-button" type="submit" color="primary" variant="solid"> Buscar </UButton>
              </UFormGroup>
            </div>
          </UForm>
        </UCard>

        <UTable :columns="columns" :rows="employees.data">
          <template #actions-data="{ row }">
            <div class="flex gap-2">
              <UButton icon="mdi-edit" color="primary" variant="solid" size="sm"
                :to="`/workers/${$route.params.type}/${row.documentId}`" />
                <UButton icon="i-heroicons-eye" color="primary" variant="solid" size="sm"
                :to="`/workers/${$route.params.type}/${row.documentId}/preview`" />

                <UButton icon="mdi-delete" color="red" variant="solid" size="sm" />

              </div>
          </template>
          <template #semaphore-data="{ row }">
            <UIcon name="mdi-circle" :class="generateSemaphore(row.points)" />
          </template>
        </UTable>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">
  const showMoreFilters = ref(false);

  const filterSchema = {
    nombre: {
      type: 'text',
      label: 'Nombre',
      columns: {
        md: 6,
        sm: 12
      },
      show: true,
    },
    email: {
      type: 'text',
      label: 'Email',
      columns: {
        md: 6,
        sm: 12
      },
      show: true,
    },
    puntaje: {
      type: 'select',
      label: 'Puntaje',
      items: [
        { label: 'Seleccione una opción', value: '' },
        { label: 'Bajo (0-40)', value: 'bajo' },
        { label: 'Medio (40-85)', value: 'medio' },
        { label: 'Alto (85+)', value: 'alto' }
      ],
      columns: {
        md: 6,
        sm: 12
      },
      show: showMoreFilters,
    },
    estado: {
      type: 'select',
      label: 'Estado',
      items: [
      {label:'Seleccione una opcion',value:''},
      {label:'Rechazado',value:'rechazado'},
      {label:'Solicitud iniciada',value:'solicitudIniciada'},
      {label:'Preseleccionado',value:'preseleccionado'},
      {label:'Entrevista programada',value:'entrevistaprogramada'},
      {label:'Entrevista existosa',value:'entrevistaxistosa'},
      {label:'Contratado',value:'contratado'}
      ],
      columns: {
        md: 6,
        sm: 12
      },
      show: showMoreFilters,
    },
    createdAt: {
      type: "date",
      label: "Fecha de la solicitud",
      columns: {
        md: 12,
        sm: 12
      },
      show: showMoreFilters,

    },
    portugues: {
      type: "select",
      label: "Portugués",
      items: [
      {label:'Seleccione una opcion',value:''},

        {
          value: "Fluido",
          label: "Fluido"
        },
        {
          value: "Intermedio",
          label: "Intermedio"
        },
        {
          value: "No",
          label: "No"
        },
      ],
      columns: {
        md: 6,
        sm: 12
      },
      show: showMoreFilters,

    },
    ingles: {
      type: "select",
      label: "Ingles",
      items: [
      {label:'Seleccione una opcion',value:''},

        {
          value: "Fluido",
          label: "Fluido"
        },
        {
          value: "Intermedio",
          label: "Intermedio"
        },
        {
          value: "No",
          label: "No"
        },
      ],
      columns: {
        md: 6,
        sm: 12
      },
      show: showMoreFilters,
    },
    experienciaCasinos: {
      type: "select",
      label: "Experiencia en casinos",
      items: [
      {label:'Seleccione una opcion',value:''},

        {
          value: "Si",
          label: "Sí"
        },
        {
          value: "No",
          label: "No"
        },
      ],
      columns: {
        md: 12,
        sm: 12
      },
      show: showMoreFilters,

    },
    areasExperiencia: {
      type: "select",
      label: "Areas de experiencia en casino",
      items: [
      {label:'Seleccione una opcion',value:''},

        {
          value: "AtencionCliente",
          label: "Atención al cliente"
        },
        {
          value: "Cajas",
          label: "Cajas"
        },
        {
          value: "MaquinasTragamonedas",
          label: "Máquinas tragamonedas (slots)"
        },
        {
          value: "MesasDeJuego",
          label: "Mesas de juego"
        },
      ],
      columns: {
        md: 12,
        sm: 12
      },
      show: showMoreFilters,
    },

  };

  const filters = reactive({
    nombre: '',
    email: '',
    position: '',
    puntaje: '',
    disponibilidadComenzar: '',
    trabajandoActualmente: '',
    portugues: '',
    ingles: '',
    experienciaCasinos: '',
    areasExperiencia: '',
  });
  
  const columns = [
    {
      key: 'nombre',
      label: 'Nombre'
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'areaInteres',
      label: 'Area de interes'
    },
    {
      key: 'telefono',
      label: 'Telefono'
    },
    {
      key: 'points',
      label: 'Puntaje',
      slot: 'points'
    },
    {
      key: 'semaphore',
      label: 'Semáforo',
      slot: 'semaphore'
    },
    {
      key: 'actions',
      label: 'Acciones',
      slot: 'actions'
    },
  ];

  const page = ref(1);
  const totalPages = ref(0);

  const employees = ref({
    data: []
  });

  const generateSemaphore = (points: number) => {
    if (points >= 83) {
      return 'green';
    } else if (points >= 40) {
      return 'yellow';
    } else {
      return 'red';
    }
  };
  const deleteEmployee = (id: number) => {
    // ... your delete logic
  };  
  const {
    find
  } = useStrapi()

  const onSubmit = async () => {
    const strapiFilters: any = {};
    for (const key in filters) {
      if (filters[key]) {
        if (key === 'puntaje') {
          if (filters[key] === 'bajo') {
            strapiFilters['points'] = { $lte: 40 };
          } else if (filters[key] === 'medio') {
            strapiFilters['points'] = { $gt: 40, $lte: 85 };
          } else if (filters[key] === 'alto') {
            strapiFilters['points'] = { $gt: 85 };
          }
        } else {
          strapiFilters[key] = {}
          strapiFilters[key]['$contains'] = filters[key];
        }
      }
    }
    const route = useRoute();
    const response = await find('candidates', { 
      filters: {
        ...strapiFilters,
        tipo:route.params.type
      }
    }) 
    employees.value = response
    totalPages.value = response.meta.pageSize as number
  }

  onMounted(async () => {
    onSubmit()
  })

</script>

<style>
  .hidden {
    display: none !important;
  }

  .green {
    color: green;
  }

  .red {
    color: red
  }

  .yellow {
    color: yellow;
  }

</style>
