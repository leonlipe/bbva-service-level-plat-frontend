<template>
  <aside class="menu-container" ref="container"
    @mouseover="() => openMenu()"
    @mouseleave="() => closeMenu()"
    @focusin="() => openMenu()"
    @focusout="() => closeMenu()"
  >
    <bbva-web-navigation-menu item-groups="3" exit-text="Log out" ref="menu"
      @menu-item-click="(ev) => navigateTo(ev.target.value)"
    >
      <bbva-web-navigation-menu-item icon="bbva:home" slot="group1" value="/">Inicio</bbva-web-navigation-menu-item>
      <bbva-web-navigation-menu-item icon="bbva:graphics" slot="group1">Disponibilidad</bbva-web-navigation-menu-item>

      <bbva-web-navigation-menu-item icon="bbva:editticket" slot="group2" value="service-agreements">Acuerdos de servicio</bbva-web-navigation-menu-item>
      <bbva-web-navigation-menu-item icon="bbva:calendar" slot="group2">Días festivos</bbva-web-navigation-menu-item>
      <bbva-web-navigation-menu-item icon="bbva:tools" slot="group2">Incidencias</bbva-web-navigation-menu-item>
      <bbva-web-navigation-menu-item icon="bbva:edit" slot="group2">Ajustes manuales</bbva-web-navigation-menu-item>
      <bbva-web-navigation-menu-item icon="bbva:settings" slot="group2" value="setup">Acciones de configuración</bbva-web-navigation-menu-item>
    </bbva-web-navigation-menu>
  </aside>
</template>

<script type="module">
import '@/components/bbva-web-components/bbva-web-navigation-menu.js'
import '@/components/bbva-web-components/bbva-foundations-icons.js'
import router from '@/router'

export default {
  computed: {
  },
  methods: {
    openMenu () {
      this.$refs.container.setAttribute('expanded', '')
      this.$refs.menu.expanded = true
    },
    closeMenu () {
      this.$refs.container.removeAttribute('expanded')
      this.$refs.menu.expanded = false
    },
    navigateTo (name) {
      if (name === '') return
      if (name === router.currentRoute.name) return

      this.$refs.menu.value = name
      router.push({ name: name })
    },
    updateSelectedItem () {
      setTimeout(() => { this.$refs.menu.value = router.currentRoute.name })
    }
  },
  mounted () {
    this.updateSelectedItem()
  },
  watch: {
  }
}
</script>

<style>
.menu-container {
  --bbva-web-navigation-menu-transition-delay: 0.3s;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4rem;
  transition: width 0.15s 0.3s ease-in-out;
  z-index: 20;
}

.menu-container[expanded] {
  width: 15rem
}
</style>
