<template>
    <UDashboardPage>
      <Toolbar>
    <template #start>
        <Button label="Agregar puesto de trabajo" severity="primary" raised>
          
        </Button>
    </template>
</Toolbar>

      <UDashboardPanel grow>
        <UDashboardNavbar class="primary navbar" title="Puestos de trabajo">
        </UDashboardNavbar>


        <UDashboardPanelContent>
  
          <UTable :columns="columns" :rows="employees.data">
            <template #actions-data="{ row }">
              <div class="flex gap-2">
                <UButton icon="mdi-edit" color="primary" variant="solid" size="sm"
                  :to="`/workers/${$route.params.type}/jobs/${row.documentId}`" />
                  <UButton icon="i-heroicons-eye" color="primary" variant="solid" size="sm"
                  :to="`/workers/${$route.params.type}/jobs/${row.documentId}/preview`" />
  
                  <UButton icon="mdi-delete" color="red" variant="solid" size="sm" />
  
                </div>
            </template>
          </UTable>
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </template>
  
  <script setup lang="ts">
    const showMoreFilters = ref(false);
  
  
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
        label: 'Nombre del puesto'
      },
      {
        key: 'email',
        label: 'Email'
      },
      {
        key: 'area',
        label: 'Area'
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
  
    const {
      find
    } = useStrapi()
  
  
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
  