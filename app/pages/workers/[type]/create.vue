<template>
  <UDashboardPanel grow>
    <UDashboardNavbar class="primary navbar" title="Reclutamiento" />
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
  import forms from "~/mixins/candidates/forms";

  export default defineComponent({
    name: "CandidatesIndex",
    mixins: [calculatePoints, forms],
  });

</script>

<script setup>
  import {
    sub
  } from "date-fns";
  import {
    ref,
    onMounted,
    nextTick
  } from "vue";
  const {
    personalInfoSchema,
    contactoSchema,
    laboralSchema,
    finalQuestionSchema
  } = useCandidateForms();

  const {
    isNotificationsSlideoverOpen
  } = useDashboard();
  const {
    create
  } = useStrapi();
  const schema = {
    personalContainer: {
      type: "group",
      schema: {
        page_title: {
          type: "static",
          content: "Agregar candidato",
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
        submit: {
          type: "button",
          submits: true,
          buttonLabel: "Agregar candidato",
          size: "lg",
          align: "right",
          class: "primary-button",
        },
      },
    },
  };

  // Schema definitions
  const form$ = ref(null);

  const sendform = async function ($forms, formData) {
    const body = {
      ...$forms.data,
      points: calculatePoints($forms.data),
    };
    await create("candidates", body);
  };

</script>
