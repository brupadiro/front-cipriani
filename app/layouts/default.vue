<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()
definePageMeta({
  middleware: 'auth',
  colorMode: 'light',
})

const links = [{
  id: 'home',
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: 'Candidatos',
  icon: 'i-heroicons-inbox',
  to: '/workers/candidatos',
  badge: '4'
}, {
  id: 'users',
  label: 'Empleados',
  icon: 'i-heroicons-user-group',
  to: '/workers/empleados',
  tooltip: {
    text: 'Users',
    shortcuts: ['G', 'U']
  }
}, {
  id: 'calendar',
  label: 'Callendario de entrevistas',
  icon: 'i-heroicons-calendar',
  to: '/calendar',
  tooltip: {
    text: 'Calendario',
    shortcuts: ['G', 'U']
  }
}, {
  id: 'settings',
  label: 'Settings',
  to: '/settings',
  icon: 'i-heroicons-cog-8-tooth',
}]

</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      class="panel"
      :width="250"
      :resizable="{ min: 200, max: 200 }"
    >
      <UDashboardSidebar>
        <template #header>
          <img src="/logo.svg" class="mt-8 mb-4" width="200">
        </template>

        <UDashboardSidebarLinks :links="links" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

  </UDashboardLayout>
</template>
