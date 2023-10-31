import webAPI from '../apis/web';

export const web = {
    namespaced: true,
    /*
        Defines the state being monitored for the module.
    */
    state: {
        loginStatus : 0,
        webData : {},
    },
    /*
        Defines the actions used to retrieve the data.
    */
    actions: {
        login({commit}, data){
            commit('setLoginStatus',1);
            webAPI.login(data)
            .then( function(response) {
                console.log('response',response);
                if (response.data.success) {
                    commit('setWebData', response.data.result);
                    commit('setLoginStatus',2);
                }else{
                    commit( 'setLoginStatus', 3);
                }

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
        setWebData(state, data){
            state.webData = data;
        },
    },

    /*
        Defines the getters used by the module
    */
    getters: {
        getLoginStatus(state){
            return state.loginStatus;
        },
        getWebData(state){
            return state.webData;
        },
    }
}
