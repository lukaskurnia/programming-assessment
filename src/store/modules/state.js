// initial state
const state = {
  tutorialStep: -1,
};

// getters
const getters = {
  getTutorialStep: state => state.tutorialStep,
};

// mutations
const mutations = {
  setTutorialStep(state, payload) {
    state.tutorialStep = payload.val;
  },
};

// Actions
const actions = {
  setTutorialStep({ commit }, val) {
    commit("setTutorialStep", {
      val,
    });
  },
  incrementTutorialStep({ getters, commit }) {
    const val = getters.getTutorialStep + 1;
    commit("setTutorialStep", {
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
