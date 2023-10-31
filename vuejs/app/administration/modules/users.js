import usersAPI from '../apis/users';

export const users = {
    namespaced: true,
    /*
        Defines the state being monitored for the module.
    */
    state: {
        loginStatus : 0,
        userData : {},
    },
    /*
        Defines the actions used to retrieve the data.
    */
    actions: {
        login({commit}, data){
            commit('setLoginStatus',1);
            usersAPI.login(data)
            .then( function(response) {
                commit('setUserData',response);
                commit('setLoginStatus',2);
            })
            .catch( function(){
                commit( 'setLoginStatus', 3);
            });
        },
    },
    /*
        Defines the mutations used
    */
    mutations: {
        setLoginStatus(state, status){
            state.loginStatus = status;
        },
        setUserData(state, data){
            state.userData = data;
        },
    },

    /*
        Defines the getters used by the module
    */
    getters: {
        getLoginStatus(state){
            return state.loginStatus;
        },
        getUserData(state){
            return state.userData;
        },
    }
}
