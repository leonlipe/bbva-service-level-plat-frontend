<script setup>
import { computed } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import IconAvatar from '@/components/icons/IconAvatar.vue'
const userSession = computed(() => JSON.parse(sessionStorage.getItem('userSession')))
import '@bbva-web-components/bbva-button-default'

</script>

<template>
  <header>
    <div class="row">
      <router-link to="/">
        <img src="@/assets/images/bbva-logo.svg" class="bbva-logo" />
      </router-link>
      <div>
        <div class="wp-avatar">
          <span
            >Hi,
            {{ userSession.nickname || `${userSession.firstName} ${userSession.lastName}` }}!</span
          >
          <IconAvatar class="avatar" />
        </div>
      </div>
    </div>
  </header>
  <main>
    <div class="row">
      <div class="hello-world">
        <img
          alt="Vue logo"
          class="logo"
          src="@/assets/images/vue-logo.svg"
          width="125"
          height="125"
        />
        <div class="wrapper">
          <HelloWorld msg="FGA Front Vue Archetype" />
          <bbva-button-default
            active=""
            text="Botón de prueba"
            @click="() => console.log('Click en boton')" ></bbva-button-default>

          <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
          </nav>
        </div>
      </div>
      <router-view />
    </div>
  </main>
  <footer>
    <div class="row">
      <img src="@/assets/images/bbva-logo.svg" class="bbva-logo" />
    </div>
  </footer>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  main {
    flex: 1;
    display: flex;
    place-items: center;
  }
}
</style>

<style scoped lang="scss">
@import '@/assets/styles/utils.scss';

.bbva-logo {
  width: 85px;
  height: 26px;
  vertical-align: middle;
}

header {
  background-color: var(--dark-blue);
  color: #fff;
  width: 100%;
  margin-bottom: 32px;

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }
}

.wp-avatar {
  justify-content: flex-end;
  display: flex;
  align-items: center;

  span {
    color: #ffffff;
    font-size: rem(12);
    font-weight: 600;
    margin-right: 0.9375rem;
    display: inline-block;
    text-align: right;
  }

  .avatar {
    width: rem(36);
    height: rem(36);
    border-radius: 2px;
  }
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  main {
    flex: 1;
    display: flex;
    place-items: center;
  }
}

.hello-world {
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 20px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--primary-blue-color);

    &:first-of-type {
      border: 0;
    }

    &.router-link-exact-active {
      color: var(--primary-font-color);
    }
  }
}

footer {
  margin-top: rem(48);
  padding: rem(48) 0;
  background-color: var(--dark-blue);
  color: #fff;

  img {
    width: 85px;
  }
}

@media (min-width: 1024px) {
  main .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hello-world {
    display: flex;
    place-items: center;
    padding-right: calc(160px / 2);
    margin-bottom: 0;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .hello-world .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
