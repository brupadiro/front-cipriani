<template>
  <UDashboardPanel grow>
    <UDashboardNavbar class="primary navbar" :title="$route.params.type === 'empleados' ? 'Empleado' : 'Candidato'" />
    <UDashboardPanelContent>
      <UCard class="shadow-lg">
        <template #header>
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">{{ candidate.nombre }} {{ candidate.apellido }}</h1>
              <p class="text-lg text-gray-600">{{ candidate.puestoInteres }}</p>
            </div>
            <UBadge :color="getStatusColor(candidate.estado)" size="lg">{{ parseStatus(candidate.estado) }}</UBadge>
          </div>
        </template>

        <div class="space-y-8">
          <div class="flex justify-between items-center">
            <div class="space-y-1">
              <p class="text-sm text-gray-500">{{ candidate.areaInteres }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(candidate.fechaDeNacimiento) }} ({{ candidate.edad }} años de edad)</p>
            </div>
            <UProgress :value="candidate.points" max="100" :color="getPointsColor(candidate.points)" class="w-32">
              {{ candidate.points }} puntos
            </UProgress>
          </div>

          <UDivider />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-xl font-semibold mb-4 text-gray-700">Información Personal</h2>
              <ul class="space-y-3">
                <li class="flex items-center"><UIcon name="i-heroicons-envelope" class="mr-2 text-gray-400" />{{ candidate.email }}</li>
                <li class="flex items-center"><UIcon name="i-heroicons-phone" class="mr-2 text-gray-400" />{{ candidate.telefono }}</li>
                <li class="flex items-center"><UIcon name="i-heroicons-flag" class="mr-2 text-gray-400" />{{ candidate.nacionalidad }}</li>
                <li class="flex items-center"><UIcon name="i-heroicons-map-pin" class="mr-2 text-gray-400" />{{ candidate.direccion }}</li>
              </ul>
            </div>

            <div>
              <h2 class="text-xl font-semibold mb-4 text-gray-700">Resumen Profesional</h2>
              <ul class="space-y-3">
                <li class="flex items-center"><UIcon name="i-heroicons-academic-cap" class="mr-2 text-gray-400" />{{ candidate.estudios }}</li>
                <li class="flex items-center"><UIcon name="i-heroicons-briefcase" class="mr-2 text-gray-400" />Actual: {{ candidate.laboralActual }}</li>
                <li class="flex items-center"><UIcon name="i-heroicons-language" class="mr-2 text-gray-400" />Idiomas: {{ getLanguages() }}</li>
                <li class="flex items-center"><UIcon name="i-heroicons-link" class="mr-2 text-gray-400" /><a :href="candidate.linkCV" target="_blank" class="text-blue-500 hover:underline">CV / LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <UDivider />

          <div>
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Información Adicional</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UCard class="bg-gray-50">
                <template #header>
                  <h3 class="font-semibold text-gray-700">Preferencias Laborales</h3>
                </template>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <UIcon :name="candidate.movilidadAcademia === 'Si' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="mr-2" :class="candidate.movilidadAcademia === 'Si' ? 'text-green-500' : 'text-red-500'" />
                    Dispuesto a reubicarse
                  </li>
                  <li class="flex items-center">
                    <UIcon :name="candidate.disponibilidadTurnos === 'Si' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="mr-2" :class="candidate.disponibilidadTurnos === 'Si' ? 'text-green-500' : 'text-red-500'" />
                    Disponible para turnos
                  </li>
                  <li class="flex items-center">
                    <UIcon :name="candidate.disponibilidadComenzar === 'Si' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="mr-2" :class="candidate.disponibilidadComenzar === 'Si' ? 'text-green-500' : 'text-red-500'" />
                    Puede comenzar inmediatamente
                  </li>
                  <li class="flex items-center">
                    <UIcon name="i-heroicons-currency-dollar" class="mr-2 text-gray-400" />
                    {{ candidate.expectativaSalarial || 'No especificado' }}
                  </li>
                </ul>
              </UCard>
              <UCard class="bg-gray-50">
                <template #header>
                  <h3 class="font-semibold text-gray-700">Experiencia</h3>
                </template>
                <ul class="space-y-2">
                  <li class="flex items-center">
                    <UIcon :name="candidate.experienciaCasinos === 'Si' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="mr-2" :class="candidate.experienciaCasinos === 'Si' ? 'text-green-500' : 'text-red-500'" />
                    Experiencia en casinos
                  </li>
                  <li class="flex items-center">
                    <UIcon name="i-heroicons-user-group" class="mr-2 text-gray-400" />
                    {{ candidate.posicionesAutoridad }}
                  </li>
                  <li class="flex items-center">
                    <UIcon name="i-heroicons-users" class="mr-2 text-gray-400" />
                    {{ candidate.cantidadEmpleados }} empleados a cargo
                  </li>
                </ul>
              </UCard>
            </div>
          </div>

          <UDivider />

          <div class="space-y-4">
            <div>
              <h2 class="text-xl font-semibold mb-2 text-gray-700">Comentarios</h2>
              <p class="text-gray-600">{{ candidate.comentariosAdicionales }}</p>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-2 text-gray-700">Información adicional</h2>
              <p class="text-gray-600">{{ candidate.infoAdicional }}</p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Floating Action Button for scheduling interview -->
      <div class="fixed bottom-8 right-8 space-y-4">
      <button
        @click="openStatusUpdateModal()"
        class="bg-blue-500 hover:bg-blue-600 mr-2 text-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <UIcon name="mdi-user" class="w-6 h-6" />
      </button>
      <button
        @click="isInterviewModalOpen = true"
        class="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        <UIcon name="i-heroicons-calendar" class="w-6 h-6" />
      </button>
    </div>
      <!-- Modal for scheduling interview -->
      <UModal v-model="isInterviewModalOpen">
        <UCard class="card">
          <template #header>
            <h3 class="text-lg font-semibold">Programar Entrevista</h3>
          </template>
          <form @submit.prevent="scheduleInterview" class="space-y-4">
            <UFormGroup label="Fecha y hora de inicio" name="startDate">
              <UInput v-model="interviewForm.start" type="datetime-local" />
            </UFormGroup>
            <UFormGroup label="Duración (minutos)" name="duration">
              <UInput v-model="interviewForm.duration" type="number" min="15" step="15" />
            </UFormGroup>
            <UFormGroup label="Enlace de video" name="videoLink">
              <UInput v-model="interviewForm.videoLink" type="url" placeholder="https://meet.google.com/..." />
            </UFormGroup>
            <div class="flex justify-end space-x-2">
              <UButton color="gray" @click="isInterviewModalOpen = false">Cancelar</UButton>
              <UButton type="submit" color="primary">Programar</UButton>
            </div>
          </form>
        </UCard>
      </UModal>

      <UModal v-model="isStatusModalOpen">
      <UCard class="card">
        <template #header>
          <h3 class="text-lg font-semibold">Actualiza el estado del candidato</h3>
        </template>
        <form @submit.prevent="changeStatus" class="space-y-4">
          <UFormGroup label="New Status" name="status">
            <USelect
              v-model="statusForm.status"
              :options="statusOptions"
              option-attribute="label"
              value-attribute="value"
            />
          </UFormGroup>
          <UFormGroup label="Comentarios" name="comments">
            <UTextarea
              v-model="statusForm.comments"
              placeholder="Add any additional notes or comments..."
              rows="3"
            />
          </UFormGroup>
          <div class="flex justify-end space-x-2">
            <UButton color="gray" @click="isStatusModalOpen = false">Cancel</UButton>
            <UButton type="submit" color="primary">Actualizar estado</UButton>
          </div>
        </form>
      </UCard>
    </UModal>

    </UDashboardPanelContent>
  </UDashboardPanel>

</template>
  
  <script setup>
  import { ref } from 'vue'
  import moment from 'moment';
  const candidate = ref({})
  const { update, findOne, create } = useStrapi();
  const route = useRoute()
  const isInterviewModalOpen = ref(false)
  const isStatusModalOpen = ref(false)
  const interviewForm = ref({
    start: '',
    duration: 30,
    videoLink: ''
  })

  const statusForm = ref({
  status: '',
  comments: '',
})

const statusOptions = [
  { label: 'Solicitud Iniciada', value: 'solicitudIniciada' },
  { label: 'Rechazado', value: 'rechazado' },
  { label: 'Preseleccionado', value: 'preseleccionado' },
  { label: 'Entrevista Programada', value: 'entrevistaprogramada' },
  { label: 'Entrevista Exitosa', value: 'entrevistaexistosa' },
  { label: 'Contratado', value: 'contratado' },
]

const getStatusLabel = (status) => {
  return statusOptions.find(option => option.value === status)?.label || status
}
const openStatusUpdateModal = () => {
  statusForm.value.status = candidate.value.estado
  statusForm.value.comments = ''
  isStatusModalOpen.value = true
}

const changeStatus =async() => {
  candidate.value.estado = statusForm.value.status
  // Here you would typically send the updated status and comments to your backend
  await updateStatus(statusForm.value.status)
  isStatusModalOpen.value = false
  // You might want to show a success message here
}

  const getPointsColor = (points) => {
    if (points > 85) {
      return 'green';
    } else if (points >= 40 && points <= 85) {
      return 'yellow';
    } else {
      return 'red';
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-UY', { year: 'numeric', month: 'long', day: 'numeric' })
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'candidatos':
        return 'primary'
      case 'solicitudIniciada':
        return 'yellow'
      case 'rechazado':
        return 'red'
      case 'preseleccionado':
        return 'blue'
      case 'entrevistaprogramada':
        return 'purple'
      case 'entrevistaexistosa':
        return 'green'
      case 'contratado':
        return 'cyan'
      default:
        return 'gray'
    }
  }
  
  const getLanguages = () => {
    const languages = []
    if (candidate.idioma) languages.push(candidate.idioma)
    if (candidate.ingles) languages.push(`English (${candidate.ingles})`)
    if (candidate.portugues) languages.push(`Portuguese (${candidate.portugues})`)
    if (candidate.otrosIdiomas) languages.push(candidate.otrosIdiomas)
    return languages.join(', ')
  }
  onMounted(async () => {
  await getCandidate();
});
const getCandidate = async () => {
  const response = await findOne("candidates/" + route.params.id,{populate:'*'});
  await nextTick();
  await nextTick();
  candidate.value = response.data
  if(response.data.interview){
    interviewForm.value = response.data.interview
    interviewForm.value.start = new Date(interviewForm.value.start).toISOString();
  }
};

  const parseStatus = (status) => {
    switch (status) {
      case 'solicitudIniciada':
        return 'Solicitud Iniciada';
      case 'rechazado':
        return 'Rechazado';
      case 'preseleccionado':
        return 'Preseleccionado';
      case 'entrevistaprogramada':
        return 'Entrevista Programada';
      case 'entrevistaexistosa':
        return 'Entrevista Exitosa';
      case 'contratado':
        return 'Contratado';
      default:
        return status;
    }
  };


  const scheduleInterview = async() => {
    // Here you would typically send the interview details to your backend
    console.log('Scheduling interview:', interviewForm.value)
    // For demo purposes, we'll just close the modal
    interviewForm.value.start = moment(interviewForm.value.start).toISOString();
    interviewForm.value.end = moment(interviewForm.value.start).add(interviewForm.value.duration, 'minutes').toISOString();
    if(candidate.value.interview){
      delete interviewForm.value.documentId
      delete interviewForm.value.id
      const response = await update(`interviews/${candidate.value.interview.documentId}`, interviewForm.value);
    }else{
      const response = await create(`interviews`, interviewForm.value);
    }
    console.log(response)
    updateStatus('entrevistaprogramada')
    isInterviewModalOpen.value = false
    // You might want to show a success message here
  }

  const updateStatus = async (newStatus) => {
    try {
      await update(`candidates/${route.params.id}`, { estado: newStatus });
      // Update the candidate object in the UI
      candidate.value.estado = newStatus;
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error updating status:', error);
    }
  };
  </script>