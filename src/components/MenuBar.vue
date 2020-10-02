<template>
     <nav class="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <!--<img src="../static/images/seneca-logo.png" id="logo-img" alt="Logo">-->
                <h1 id="logo-creative">Creative Non-Fiction</h1>
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapseNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapseNavbar">
                <ul class="navbar-nav ml-auto">
                    <router-link class="nav-link" exact-active-class="active" :to="{ name: 'home' }">
                        <li class="nav-item">
                            <i class="fas fa-home"></i>Home
                        </li>
                    </router-link>
                    <router-link class="nav-link" exact-active-class="active" :to="{ name: 'works' }">
                        <li class="nav-item">
                            <i class="fas fa-images"></i>Works
                        </li>
                    </router-link>
                    <router-link class="nav-link" exact-active-class="active" :to="{ name: 'upload' }">
                        <li class="nav-item" v-if="profile.isAuthenticated">
                            <i class="fas fa-plus-square"></i>Upload
                        </li>
                    </router-link>
                    <router-link class="nav-link" exact-active-class="active" :to="{ name: 'login' }">
                        <li class="nav-item" v-if="!profile.isAuthenticated">
                            <i class="fas fa-sign-in-alt">Login</i>
                        </li>
                    </router-link>
                    <li v-if="profile.isAuthenticated" >
                        <div class="nav-link" @click="logout()"><i class="fas fa-sign-out-alt"></i>Logout</div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { mapGetters } from 'vuex'
import AuthenticationService from '../services/authentication-service'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters({
            profile: 'getProfile'
        })
    },
    methods: {
        logout() {
            AuthenticationService.logoutUser();
        }
    }
}
</script>