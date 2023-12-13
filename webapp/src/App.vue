<template>
  <v-app>
    <v-main>
      <bbva-navigation-menu v-if="showMenu" ref="menu"/>
      <div :class="showMenu ? 'pl-14' : ''">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import BbvaNavigationMenu from '@/components/navigation/BbvaNavigationMenu.vue'
const supportedLanguages = ['en', 'en-US', 'es', 'es-ES', 'es-US']
const defaultLanguage = 'en-US'

window.IntlMsg = window.IntlMsg || {}
window.IntlMsg.lang = supportedLanguages.includes(navigator.language) ? navigator.language : defaultLanguage
window.IntlMsg.localesHost = `${window.location.protocol}//${window.location.host}`
window.IntlMsg.url = 'locales.json'

export default {
  data() {
    return {
      showMenu: true
    }
  },
  components: {
    BbvaNavigationMenu,
  },
  watch: {
    $route() {
      const noMenuRoutes = ['model-new', 'model-new-elements'];
      if( noMenuRoutes.includes( this.$route.name ) ){
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    }
  }

}
</script>
