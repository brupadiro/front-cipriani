<template>
<div class="container w-screen max-w-full">
  <div class="headerform flex justify-center align-center white">
    <Image src="/logo.svg" width="200px"></Image>
  </div>
  <div class="mx-auto p-4 flex justify-center content-form">
    <ClientOnly>
        <UCard class="card max-w-60">
          <Vueform ref="form$" :schema="schema" :endpoint="false" @submit="sendform" />
        </UCard>
      </ClientOnly>

  </div>
    </div>
</template>

<script>
  import calculatePoints from "~/mixins/candidates/calculatePoints";
  import useCandidateForms from "~/mixins/candidates/forms";

  export default defineComponent({
    name: "CandidatesIndex",
    mixins: [calculatePoints],
  });
  definePageMeta({
    layout: 'empty',
  })

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
          buttonLabel: "Trabaja con nosotros",
          size: "lg",
          align: "center",
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

<style scoped>
.headerform{
  width:100%;
  height:200px;
}
.max-w-60{
  max-width:60%
}
.card{
  border-radius: 0px!important;
}
</style>