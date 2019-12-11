const state = {
  state: '等待连接',
  printers: localStorage.getItem('printers') ? JSON.parse(localStorage.getItem('printers')) : [],
  printdata: null
}

const mutations = {
  CONNECT(state) {
    console.log('+++++');
    state.state = '已连接'
  },
  DIS_CONNECT(state) {
    state.state = '等待连接'
  },
  SET_PRINTERS(state) {
    state.printers = arguments[1]
  },
  SET_PRINTDATA(state) {
    state.printdata = arguments[1]
  }

}

const actions = {
  someAsyncTask({
    commit
  }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  CONNECT({
    commit
  }) {
    commit('CONNECT')
  },
  DIS_CONNECT({
    commit
  }) {
    commit('DIS_CONNECT')
  },
  SET_PRINTERS({
    commit
  }, data) {
    commit('SET_PRINTERS', data)
  },
  SET_PRINTDATA({ commit }, data) {
    commit('SET_PRINTERS', data)
  },
}

export default {
  state,
  mutations,
  actions
}