import ApiBase from '../services/ApiBase'
import store from '../store'
import router from '../router/Router'

class AuthenticationService {
    authenticateUser(login, password) {
        return ApiBase.postRequest('login',  {
            login,
            password
        });
    }
    logoutUser() {
        localStorage.setItem('token', null);
        store.commit('setUserAuthentication', false);
        router.push('/');
    }
    createNewUser(login, password) {
        return ApiBase.postRequest('registerUser', { login,password });
    }
}

export default new AuthenticationService();