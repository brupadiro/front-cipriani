<template>
    <UDashboardPanel grow>
      <UDashboardNavbar class="primary navbar" title="Administrador" />
      <UDashboardPanelContent>
        <ClientOnly>
          <UCard class="card">
            <Vueform ref="form$" :schema="schema" :endpoint="false" @submit="sendform" />
          </UCard>
      </ClientOnly>
    </UDashboardPanelContent>
  </UDashboardPanel>
</template>

  
  
  <script setup>
  import useCandidateForms from "@/mixins/candidates/forms";
  import { sub } from "date-fns";
  import { ref, onMounted, nextTick, computed } from "vue";
  
  const { update, findOne } = useStrapi();
  const route = useRoute();
  
  // Form reference
  const form$ = ref(null);
  
  // Candidate data
  
  const schema = computed(() => ({
    personalContainer: {
      type: "group",
      schema: {
        page_title: {
          type: "static",
          content: 'Editar administrador',
          tag: "h4",
        },
        divider: {
          type: "static",
          tag: "divider",
        },
      username: {
        type: 'text',
        label: 'Nombre de usuario',
        columns: {
          md: 4,
          sm: 12,
        },
      },
      email: {
        type: 'text',
        label: 'Correo electrónico',
        columns: {
          md: 4,
          sm: 12,
        },
      },
      password: {
        type: 'text',
        inputType: 'password',
        label: 'Contraseña',
        columns: {
          md: 4,
          sm: 12,
        },
        },
        submit: {
          type: "button",
          submits: true,
          buttonLabel: 'Guardar administrador',
          size: "lg",
          align: "right",
        },

      },
    },
  }));
  
  // Fetch candidate data on mount  
  // Get candidate data by ID
  // Handle form submission
  const { register } = useStrapiAuth();
  const sendform = async function ($forms, formData) {
    const token = useStrapiToken()
    try {
      await $fetch('https://complete-victory-b1ae57a058.strapiapp.com/api/users', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          ...$forms.data,
          role:1
        }

      });
      navigateTo('/')
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error(error)
    }
  };
  </script>
  