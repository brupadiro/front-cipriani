<template>
    <div class="min-h-screen bg-white flex primary">
      <div class="flex-1 flex flex-col justify-center py-12 white rounded-r-full px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-80">
        <div class="mx-auto  max-w-sm lg:w-96"> 
          <div class="mb-8 top-card">
            <img class="h-12 w-auto" src="/logo.svg" alt="Cipriani" />
          </div>
          <UForm :validate-on="['submit']" :state="form" class="mt-8 space-y-6" @submit.prevent="handleSubmit">
            <UFormGroup label="Nombre de usuario" name="username">
              <UInput v-model="form.username" placeholder="Nombre de usuario" />
            </UFormGroup>
            <UFormGroup label="Contraseña" name="password">
              <UInput type="password" v-model="form.password" placeholder="Contraseña" />
            </UFormGroup>
            <div>
              <UButton type="submit" class="primary-button" block>
                Ingresar
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const { login } = useStrapiAuth()
  const form = ref({  
    username: '',
    password: ''
  })
  definePageMeta({
    layout: 'empty',
  })

  const router = useRouter()
  const handleSubmit = async () => {
    try { 
      await login({ identifier: form.value.username, password: form.value.password })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }
  </script>
  
  <style scoped>
  .top-card{
    padding: 1.5rem 1rem;
    background-color: #fff;
    border-radius: 1rem;
    text-align: center;
    box-shadow: 0 16px 35px 0 rgba(0, 0, 0, .08);
    margin: 0 auto;
    margin-bottom: 2rem;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  /* Add any additional styles here */
  </style>