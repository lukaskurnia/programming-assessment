// initial state
const state = {
  remainingTime: 60000,
};

// getters
const getters = {
  getRemainingTime: state => state.remainingTime,
};

// mutations
const mutations = {
  setRemainingTime(state, payload) {
    state.remainingTime = payload.val;
  },
};

// Actions
const actions = {
  setRemainingTime({ commit }, val) {
    commit("setTimeoutStatus", {
      val,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
