<template>
  <UDashboardPanel grow>
    <UDashboardNavbar class="primary navbar" title="Gestion de horas">
    </UDashboardNavbar>


    <UDashboardPanelContent>

      <div class="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md">

        <TabView v-model:activeIndex="activeTabIndex">
          <TabPanel header="Trackeo de tiempo">
            <div class="mb-4 flex justify-between items-center">
              <h2 class="text-2xl font-bold">Entradas de tiempo</h2>
              <Button icon="pi pi-clock" label="Agregar entrada de tiempo" @click="openNewTimeEntryDialog" />
            </div>
            <DataTable :value="timeEntries.data" :paginator="true" :rows="10">
                <Column field="employee" header="Empleado"></Column>
              <Column field="date" header="Fecha"></Column>
              <Column field="hoursWorked" header="Horas trabajadas"></Column>
            </DataTable>

            <Dialog v-model:visible="newTimeEntryDialogVisible" header="Agregar nueva entrada de tiempo" :modal="true">
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <label for="employeeName" class="text-right">Empleado</label>
                  <Dropdown id="employeeName"  
                    optionLabel="label" 
                    optionValue="value" 
                    v-model="newTimeEntry.employee" 
                    :options="employees.data.map(e => ({label: e.nombre + ' '+e.apellido, value: e.id}))"
                    class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <label for="date" class="text-right">Date</label>
                  <Calendar id="date" v-model="newTimeEntry.date" dateFormat="yy-mm-dd" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <label for="hoursWorked" class="text-right">Horas trabajadas</label>
                  <InputNumber id="hoursWorked" v-model="newTimeEntry.hoursWorked" class="col-span-3" />
                </div>
              </div>
              <template #footer>
                <Button label="Add Time Entry" icon="pi pi-check" @click="addTimeEntry" autofocus />
              </template>
            </Dialog>
          </TabPanel>

          <TabPanel header="Gestion de salidas">
            <div class="mb-4 flex justify-between items-center">
              <h2 class="text-2xl font-bold">Solicitudes de salidas</h2>
              <Button icon="pi pi-calendar-plus" label="Nueva solicitud" @click="openNewLeaveRequestDialog" />
            </div>
            <DataTable :value="leaveRequests.data" :paginator="true" :rows="10">
              <Column field="employee" header="Empleado">
              </Column>
              <Column field="startDate" header="Fecha de inicio"></Column>
              <Column field="endDate" header="Fecha de fin"></Column>
              <Column field="status_request" header="Estado"></Column>
            </DataTable>

            <Dialog v-model:visible="newLeaveRequestDialogVisible" header="Agregar solicitud de salida" :modal="true">
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <label for="employeeName" class="text-right">Empleado</label>
                  <Dropdown id="employeeName"  
                    optionLabel="label" 
                    optionValue="value" 
                    v-model="newLeaveRequest.employee" 
                    :options="employees.data.map(e => ({label: e.nombre + ' '+e.apellido, value: e.id}))"
                    class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <label for="startDate" class="text-right">Fecha de inicio</label>
                  <Calendar id="startDate" v-model="newLeaveRequest.startDate" dateFormat="yy-mm-dd"
                    class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <label for="endDate" class="text-right">Fecha de fin</label>
                  <Calendar id="endDate" v-model="newLeaveRequest.endDate" dateFormat="yy-mm-dd" class="col-span-3" />
                </div>
              <div class="grid grid-cols-4 items-center gap-4">
                  <label for="status" class="text-right">Estado</label>
                  <Dropdown id="status" v-model="newLeaveRequest.status_request" optionLabel="label" optionValue="value" :options="[
                    { label: 'Pendiente', value: 'pending' },
                    { label: 'Aprobado', value: 'approved' },
                    { label: 'Rechazado', value: 'rejected' }
                  ]" class="col-span-3" />
                </div>
              </div>
              <template #footer>
                <Button label="Submit Request" icon="pi pi-check" @click="addLeaveRequest" autofocus />
              </template>
            </Dialog>
          </TabPanel>
        </TabView>
      </div>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  const { find, create } = useStrapi()

  // State
  const activeTabIndex = ref(0)
  const employeeSearch = ref('')
  const newEmployeeDialogVisible = ref(false)
  const newTimeEntryDialogVisible = ref(false)
  const newLeaveRequestDialogVisible = ref(false)

  // Form data
  const newEmployee = ref({
    name: '',
    position: '',
    department: ''
  })
  const newTimeEntry = ref({
    employee: '',
    date: null,
    hoursWorked: null,
  })
  const newLeaveRequest = ref({
    employee: '',
    startDate: null,
    endDate: null
  })

  // Data from Strapi
  const employees = ref({ data: [] })
  const timeEntries = ref({ data: [] })
  const leaveRequests = ref({ data: [] })


  // Methods
  const openNewEmployeeDialog = () => {
    newEmployeeDialogVisible.value = true
  }

  const openNewTimeEntryDialog = () => {
    newTimeEntryDialogVisible.value = true
  }

  const addTimeEntry = async () => {
    const response = await create('time-entries/?populate=*', {
      ...newTimeEntry.value,
      date: newTimeEntry.value.date.toISOString().split('T')[0]
    })
    timeEntries.value.data.push(response.data)
    newTimeEntryDialogVisible.value = false
    newTimeEntry.value = {
      employee: '',
      date: null,
      hoursWorked: null,
    }
  }

  const openNewLeaveRequestDialog = () => {
    newLeaveRequestDialogVisible.value = true
  }

  const addLeaveRequest = async () => {
    const response = await create('exit-requests/?populate=*', {
      ...newLeaveRequest.value,
      startDate: newLeaveRequest.value.startDate.toISOString().split('T')[0],
      endDate: newLeaveRequest.value.endDate.toISOString().split('T')[0],
    })
    leaveRequests.value.data.push(response.data)
    newLeaveRequestDialogVisible.value = false
    newLeaveRequest.value = {
      employee: '',
      startDate: null,
      endDate: null
    }
  }

  const getEmployees = async () => {
    const response = await find('candidates', {
      filters: {
        tipo: 'empleados'
      }
    })
    employees.value = response
  }

  const getTimeEntries = async () => {
    const response = await find('time-entries', { populate: '*' });
    timeEntries.value = {
      ...response,
      data: response.data.map((e) => ({
        ...e,
        employee: `${e.employee.nombre} ${e.employee.apellido}`,
      })),
    };
  };

  const getLeaveRequests = async () => {
    const response = await find('exit-requests', { populate: '*' });
    leaveRequests.value = {
      ...response,
      data: response.data.map((e) => ({
        ...e,
        employee: `${e.employee.nombre} ${e.employee.apellido}`,
      })),
    };
  };

  onMounted(() => {
    getEmployees()
    getLeaveRequests()
    getTimeEntries()
  })

</script>

<style scoped>
  /* Add any component-specific styles here */

</style>
