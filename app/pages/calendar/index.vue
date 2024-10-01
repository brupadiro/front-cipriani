<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Calendario de entrevistas">
        <template #actions>
          <UButtonGroup>
            <UButton class="primary-button" @click="calendarOptions.value.currentView = 'timeGridDay'">Day</UButton>
            <UButton class="primary-button" @click="calendarOptions.value.currentView = 'timeGridWeek'">Week</UButton>
            <UButton class="primary-button" @click="calendarOptions.value.currentView = 'dayGridMonth'">Month</UButton>
          </UButtonGroup>
        </template>
      </UDashboardNavbar>
      <UDashboardPanelContent>
        <FullCalendar :options="calendarOptions" />
        <USlideover v-model="showInterviewModal" :width="400">
          <UCard class="card">
            <template #header>
              <div class="flex justify-between items-center">
                <h3>Detalles de la Entrevista</h3>
                <UButton icon="i-heroicons-x-mark" variant="link" @click="showInterviewModal = false" />
              </div>
            </template>
            <div v-if="selectedInterview" class="space-y-4 p-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold">Candidato:</p>
                  <p>{{ selectedInterview.candidateName }}</p>
                </div>
                <div>
                  <p class="font-semibold">Fecha:</p>
                  <p>{{ formatDate(selectedInterview.start) }}</p>
                </div>
                <div>
                  <p class="font-semibold">Duración:</p>
                  <p>{{ selectedInterview.duration }} min</p>
                </div>
              </div>
              <UFormGroup label="Comentarios">
                <UTextarea v-model="selectedInterview.comments" />
              </UFormGroup>
              <UFormGroup label="Enlace de Videollamada">
                <UInput v-model="selectedInterview.videoCallLink" />
              </UFormGroup>
              <div class="flex justify-end mt-4">
                <UButton color="primary" @click="saveInterviewDetails">Guardar</UButton>
              </div>
            </div>
          </UCard>
        </USlideover>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ref, onMounted } from 'vue';

const showInterviewModal = ref(false);
const selectedInterview = ref(null);
const interviews = ref([])
const calendarOptions = ref({
  locale: esLocale,
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  headerToolbar: true, // Hide default header
  events: interviews,
  eventClick: (info) => {
    selectedInterview.value = info.event.extendedProps;
    showInterviewModal.value = true;
  },
});

import moment from 'moment';

const formatDate = (dateString) => {
  return moment(dateString).format('DD/MM - HH:mm');
};
const calculateDuration = (duration) => {
  return moment.duration(duration).locale('es').humanize({ unitDisplay: 'short' });
};
const { find } = useStrapi();
const getInterviews = async () => {
  const { data } = await find('interviews', {
    populate: '*',
  });

  interviews.value = data.map(interview => ({
    ...interview,
    title: `Entrevista con ${interview.candidate.nombre} ${interview.candidate.apellido}`,
    start: interview.start,
    end: interview.end,
    candidateName: `${interview.candidate.nombre} ${interview.candidate.apellido}`,
    comments: interview.comments,
    videoCallLink: interview.videoLink,
  }));
};
onMounted(async () => {
  await getInterviews();
});
const saveInterviewDetails = () => {
  // Here you would typically send the updated interview details to your backend
  console.log('Saving interview details:', selectedInterview.value);
  showInterviewModal.value = false;
};
</script>
