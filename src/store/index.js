import { createStore } from 'vuex'
import AuthService from '../moduleApi/modules/auth'
import VueJwtDecode from 'vue-jwt-decode'
import router from '../router/index'
import { ElMessage } from 'element-plus'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    user: null,
  },
  getters: {},
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    SET_CURRENT_USER(state, payload) {
      console.log('From Mutation')
      state.user = payload
      console.log('User state change: ', state.user)
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        console.log(
          'Log in from Action store ...',
          credentials.username,
          credentials.password,
        )
        const res = await AuthService.login(credentials)
        if (res.status == 200) {
          console.log('login RES', res)
          console.log(
            'this.$jwtDec("<your jwt>")',
            VueJwtDecode.decode(res.data.token),
          )
          commit('SET_CURRENT_USER', VueJwtDecode.decode(res.data.token))
          localStorage.setItem('Token', res.data.token)
          localStorage.setItem('uid', VueJwtDecode.decode(res.data.token).uid)
          localStorage.setItem('type', VueJwtDecode.decode(res.data.token).type)
          if (VueJwtDecode.decode(res.data.token).type !== 'STUDENT') {
            router.push({ name: 'Dashboard' })
          } else if (VueJwtDecode.decode(res.data.token).type === 'STUDENT') {
            router.push({ name: 'Landing page' })
          }
        }
      } catch (error) {
        console.log(error)
        if (
          response.response &&
          response.response.data &&
          response.response.data.errorMessage
        ) {
          ElMessage({
            type: 'error',
            message: `${response.response.data.errorMessage}`,
          })
          return
        }

        if (error.code) {
          ElMessage({
            message: `${error.message}`,
            type: 'error',
          })
        }
      }
    },

    async logout({ commit }) {
      try {
        console.log('Log out from Action store ...')
        localStorage.removeItem('Token')
        localStorage.removeItem('uid')
        localStorage.removeItem('type')
        commit('SET_CURRENT_USER', null)
        router.push({ name: 'Login' })
      } catch (error) {
        console.log(error)
      }
    },

    async register({ commit }, credentials) {
      try {
        console.log('Sign up from Action store ...', credentials)
        const res = await AuthService.register(credentials)
        if (res.status) {
          console.log('register RES', res)
          router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
      }
    },

    async forgotPassword({ commit }, credentials) {
      try {
        console.log('Forgot PW from Action store...')
        const res = await AuthService.forgotPassword(credentials)
        if (res.status) {
          console.log('forgotPassword RES', res)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async updatePassword({ commit }, credentials) {
      try {
        console.log('Update PW from Action store...')
        const res = await AuthService.updatePassword(credentials)
        if (res.status) {
          console.log('updatePassword RES', res)
          router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
      }
    },

    async activeAccount({ commit }, credentials) {
      try {
        console.log('activeAccount from Action store...')
        const res = await AuthService.activeAccount(credentials)
        if (res.status) {
          console.log('activeAccount RES', res)
          // router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {},
  // modules,
})
