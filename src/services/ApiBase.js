const API_LINK = 'http://localhost:9090/'
import store from '../store'
import router from '../router/Router'

const ApiBase = {
    apiLink: API_LINK,
    getRequest(route) {
        return fetch(`${API_LINK}${route}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": localStorage.getItem('token')
            },
        }).then(r => r.json()).then(r => {
            store.commit('setUserAuthentication', r.isAuthenticated);
            localStorage.setItem('token', r.token)

            if(r.redirect) 
                router.push('login');
            
            return r.data === undefined ? r : r.data;
        });
    },
    postRequest(route, data) {
        return fetch(`${API_LINK}${route}`, {
            method: "POST",
            headers: data instanceof FormData ? {
                    "Accept": "application/json",
                    "Authorization": localStorage.getItem('token') } 
                : {
                    "Content-Type" : "application/json",
                    "Accept": "application/json",
                    "Authorization": localStorage.getItem('token') },
            body: (data instanceof FormData) ? data : JSON.stringify(data)
        }).then(r => r.json()).then(r => {
                store.commit('setUserAuthentication', r.isAuthenticated);
                localStorage.setItem('token', r.token)

                if(r.redirect) 
                    router.push('login');
                
                return r.data === undefined ? r : r.data;
            });
    }
}
export default ApiBase;