<script setup>
  const userRoles = ['Administrador', 'Usuario', 'Invitado']
  const statuses = ['Habilitado', 'Deshabilitado']

  const users = ref([])
  definePageMeta({
  middleware: 'auth',
  colorMode: 'light',
})

  const username = ref('')
  const selectedRole = ref(null)
  const employeeName = ref('')
  const selectedStatus = ref(null)

  const resetForm = () => {
    username.value = ''
    selectedRole.value = null
    employeeName.value = ''
    selectedStatus.value = null
  }
  const { find } = useStrapi()
  const searchUsers = async () => {
    const response = await find('users')
    console.log(response)
    users.value = response
  }
  onMounted(() => {
    searchUsers()
  })
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar class="primary navbar" title="Reclutamiento" />
    <UDashboardPanelContent>
      <UCard class="card">
        <template #header>
          <h2 class="text-xl font-semibold">Usuarios del Sistema</h2>
        </template>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UFormGroup label="Nombre de usuario">
            <UInput v-model="username" placeholder="Ingrese nombre de usuario" />
          </UFormGroup>
          <UFormGroup label="Rol de Usuario">
            <USelect v-model="selectedRole" :options="userRoles" placeholder="Seleccionar" />
          </UFormGroup>
          <UFormGroup label="Nombre del Empleado">
            <UInput v-model="employeeName" placeholder="Type for hints..." />
          </UFormGroup>
          <UFormGroup label="Estatus">
            <USelect v-model="selectedStatus" :options="statuses" placeholder="Seleccionar" />
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <UButton class="primary-button" color="gray" @click="resetForm">Reiniciar</UButton>
            <UButton class="primary-button" color="primary" @click="searchUsers">Buscar</UButton>
          </div>
        </template>
      </UCard>

      <UCard class="mt-4 card">
        <UButton color="primary" icon="i-heroicons-plus" to="/admin/create">
        Agregar
      </UButton>

        <UTable :columns="[
      { key: 'username', label: 'Nombre de usuario' },
      { key: 'email', label: 'email de Usuario' },
      { key: 'status', label: 'Estatus' },
      { key: 'actions', label: 'Acciones' }
    ]" :rows="users">
        <template #actions-data="{ row }">
          <div class="flex space-x-2">
            <UButton color="gray" icon="i-heroicons-trash" size="sm" />
            <UButton color="gray" icon="i-heroicons-pencil" size="sm" />
          </div>
        </template>
      </UTable>
      </UCard>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>
