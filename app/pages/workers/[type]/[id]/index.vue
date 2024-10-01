<template>
  <UDashboardPanel grow>
    <UDashboardNavbar class="primary navbar" :title="route.params.type === 'empleados' ? 'Empleados' : 'Candidatos'" />
    <UDashboardPanelContent>
      <ClientOnly>
        <UCard class="card">
          <Vueform ref="form$" :schema="schema" :endpoint="false" @submit="sendform" />
        </UCard>
      </ClientOnly>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>



<script>
import calculatePoints from "~/mixins/candidates/calculatePoints";

export default defineComponent({
  name: "CandidatesIndex",
  mixins: [calculatePoints],
});


</script>

<script setup>
import useCandidateForms from "@/mixins/candidates/forms";
import { sub } from "date-fns";
import { ref, onMounted, nextTick, computed } from "vue";
const {personalInfoSchema, contactoSchema, laboralSchema, finalQuestionSchema } = useCandidateForms();

const { update, findOne } = useStrapi();
const route = useRoute();

// Form reference
const form$ = ref(null);

// Candidate data
const employeeSchema = {
  archivoContrato: {
    type: "file",
    label: "Archivo de contrato",
    accept: ".pdf",
  },
  contrato: {
    type: "select",
    label: "Tipo de contrato",
    items: [
      { label: "Seleccione una opción", value: "" },
      { label: "Indefinido", value: "indefinido" },
      { label: "Temporal", value: "temporal" },
      { label: "Practicas", value: "practicas" },
    ],
  },
  salario: {
    type: "number",
    label: "Salario",
  },
  fechaIncorporacion: {
    type: "date",
    label: "Fecha de incorporación",
  },
};

const schema = computed(() => ({
  personalContainer: {
    type: "group",
    schema: {
      page_title: {
        type: "static",
        content: route.params.type === 'empleados' ? 'Editar empleado' : 'Editar candidato',
        tag: "h4",
      },
      divider: {
        type: "static",
        tag: "divider",
      },
      ...contactoSchema,
      ...personalInfoSchema,
    },
  },
  laboralContainer: {
    type: "group",
    schema: {
      page_title: {
        type: "static",
        content: "Informacion laboral",
        tag: "h4",
      },
      ...laboralSchema,
    },
  },
  finalQuestionContainer: {
    type: "group",
    schema: {
      page_title: {
        type: "static",
        content: "Informacion adicional",
        tag: "h4",
      },
      ...finalQuestionSchema,
      ...(route.params.type === 'empleados' ? employeeSchema : {}),
      submit: {
        type: "button",
        submits: true,
        buttonLabel: route.params.type === 'empleados' ? 'Guardar empleado' : 'Guardar candidato',
        size: "lg",
        align: "right",
      },
    },
  },
}));

// Fetch candidate data on mount
onMounted(async () => {
  await getCandidate();
});

// Get candidate data by ID
const getCandidate = async () => {
  const candidate = await findOne("candidates/" + route.params.id);
  await nextTick();
  await nextTick();
  if (form$.value) {
    form$.value.update(candidate.data);
  }
};

// Handle form submission
const sendform = async function ($forms, formData) {
  const body = {
    ...$forms.data,
    points: calculatePoints($forms.data),
  };
  await update("candidates", route.params.id, body);
};
</script>
