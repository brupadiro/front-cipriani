<template>
  <div class="layout-wrapper">
    <div class="custom-sidebar" style="padding: 2rem;">
      <Menu :model="items">
        <template #start>
          <Image src="/logo.svg" alt="Cipriani Logo" class="logo" />
        </template>
        <template #submenulabel="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <a v-ripple class="flex items-center p-menuitem-link" v-bind="props.action">
            <span :class="item.icon" class="text-link" /> 
            <span class="text-link font-bold">{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut"
              class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          </a>
        </template>

      </Menu>
    </div>
    <div class="layout-main-container">
      <div class="layout-main" style="margin-top: 60px;">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import {
    useRouter
  } from 'nuxt/app'

  const router = useRouter()
  const sidebarVisible = ref(true)

  const items = ref([{
      label: 'Administrador',
      icon: 'pi pi-fw pi-cog',
      command: () => router.push('/')
    },
    {
      label: 'Reclutamiento',
      icon: 'pi pi-fw pi-user',
      command: () => router.push('/workers/candidatos')
    },
    {
      label: 'Empleados',
      icon: 'pi pi-fw pi-calendar',
      command: () => router.push('/workers/empleados')
    },
    {
      label: 'Calendario',
      icon: 'pi pi-fw pi-clock',
      command: () => router.push('/calendar')
    },
    {
      label: 'Salir',
      icon: 'pi pi-fw pi-sign-out',
      command: () => $auth.logout()
    }
  ])

</script>

<style scoped>
  .layout-wrapper {
    display: flex;
    min-height: 100vh;
  }

  .layout-main-container {
    flex: 1;
    padding: 2rem;
    margin-left: 250px;
    /* Adjust for sidebar width */
  }

  .custom-sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    color: white;
  }

  .sidebar-header {
    padding: 1rem;
    text-align: center;
  }

  .logo {
    width: 80px;
    margin-bottom: 0.5rem;
  }

  .search-container {
    padding: 1rem;
  }

  :deep(.p-sidebar-content) {
    padding: 0;
  }

  :deep(.p-menu) {
    width: 100%;
    border: none;
    background: transparent;
  }

  :deep(.p-menuitem-link) {
    color: white !important;
  }

  :deep(.p-menuitem-icon) {
    color: white !important;
  }

  :deep(.p-menuitem-text) {
    color: white !important;
  }
  :deep(.p-menuitem-link.p-highlight) {
    background: #101f44;
    color: white;
    border-radius: 30px;
  }

  :deep(.p-inputtext) {
    width: 100%;
  }
</style>
