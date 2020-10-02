<template>
<div>
    <div  class="container" style="margin-top: .5em;">
        <h2  class="centred-text-horiz">Login</h2>
        <hr>
    </div>

    <div class="container">
        <form class="form-group" id="loginForm">
            <div class="centred-block-horiz col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label for="login" class="centred-text-horiz">Login</label>
                <input type="text" class="form-control" id="login" v-model="login" required/>
            </div>
            <br>
            <div class="centred-block-horiz col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label for="password" class="centred-text-horiz">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required/>
            </div>
        </form>

        <button type="button" style="margin: 0 auto;" class="btn-primary centred-text-horiz" @click="authenticateUser() ">Login</button>
    </div>
    <!--COnditional-->
    <div class="container" v-if="!success">
        <breeding-rhombus-spinner v-if="loading"
                            :animation-duration="2000"
                            :size="85"
                            color="#168beb"
                            style="margin: 0 auto; top: 35px;"
                            />
        <span style="margin-top: 1em;" class="centred-text-horiz" v-else>{{message}}</span>
        
    </div>

</div>
</template>

<script>
import AuthencitationService from '../services/authentication-service'
import { BreedingRhombusSpinner } from 'epic-spinners'
export default {
    data() {
        return {
            login: '',
            password: '',
            message: '',
            success: false,
            loading: false,
        }
    },
    components: {
        BreedingRhombusSpinner
    },
    methods: {
        authenticateUser() {
            let self = this;
            this.loading = true;
            AuthencitationService.authenticateUser(this.login, this.password).then(r => {
                self.loading = false;
                self.success = r.loggedIn;
                self.message = r.message;
                
                if(r.loggedIn)
                    self.$router.push({ name: 'works' });
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style>

</style>