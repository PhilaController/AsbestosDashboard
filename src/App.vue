<template>
  <div data-vuetify>
    <v-app class="app-theme" id="app">
      <v-main>
        <!-- Top app navbar -->
        <div id="my-app-navbar">
          <!-- Methods link -->
          <v-btn
            class="back-to-app mr-3 mt-2"
            v-show="$router.currentRoute.path != '/about'"
            fab
            small
            outlined
            :ripple="false"
            title="Click for more information"
            @click="$router.push('/about')"
          >
            <i class="fas fa-info fa-lg"></i>
          </v-btn>
          <v-btn
            class="back-to-app mr-3 mt-2"
            v-show="$router.currentRoute.path == '/about'"
            depressed
            outlined
            :ripple="false"
            @click="$router.push(`/`)"
          >
            <i class="fas fa-arrow-left mr-1"></i>
            <span>Back</span>
          </v-btn>
        </div>

        <!-- Content -->
        <router-view :key="$route.path" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.my-divider {
  border-top: 4px solid #ef5350 !important;
}

/* Navbar */
#my-app-navbar {
  width: 100%;
  text-align: right;
  padding-right: 10px;
  font-size: 1.2rem;
  color: #b2beb5;
}

.back-to-app {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.back-to-app:hover {
  background-color: #fff;
  border-color: #353d42;
}

/* Router links */
.router-link {
  color: #fff !important;
}

.router-link:hover {
  text-decoration: underline;
}

.app-theme {
  font-family: Avenir, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  padding-top: 5px !important;
  padding-bottom: 100px;
  overflow-x: hidden;
}

@media only screen and (min-width: 740px) and (max-width: 1000px) {
  #app {
    padding-top: 20px !important;
  }
}

#app h2,
h3 {
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
}

.help-message {
  font-weight: normal !important;
  padding-bottom: 1rem;
}
</style>