<template>
<div>
    <div  class="container" style="margin-top: .5em;">
    
        <h2  class="centred-text-horiz">Register New User</h2>
        <hr>
    </div>

    <div class="container">
        <form class="form-group" id="registerForm">
            <div class="centred-block-horiz col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label for="login" class="centred-text-horiz">Login</label>
                <input type="text" class="form-control" v-model="login" required/>
            </div>
            <div class="centred-block-horiz col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label for="password" class="centred-text-horiz">Password</label>
                <input type="password" class="form-control" v-model="password" required/>
            </div>
            <div class="centred-block-horiz col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <label for="password2" class="centred-text-horiz">Repeat the Password</label>
                <input type="password" class="form-control" v-model="password2" required/>
            </div>
        </form>

        <button type="button" style="margin: 0 auto;" class="btn-primary centred-text-horiz" :disabled="!canRegister || passwordsDoNotMatch" @click="createNewUser()">REGISTER</button>
        <br>
        <div class="container"  v-if="passwordsDoNotMatch">
            <span class="centred-text-horiz">Passwords do not match!</span>
        </div>
        <div class="container">
            <span class="centred-text-horiz">{{response}}</span>
        </div>
    </div>
    <div v-if="loading">
            <div class="infoi">
        
            </div>
            <breeding-rhombus-spinner
                            :animation-duration="2000"
                            :size="85"
                            color="#168beb"
                            style="position: fixed;
                                    top: 50%;
                                    left: 50%;
                                    z-index:9999;
                                    transform: translate(-50%, -50%);"
                            />
        </div>
 </div>
</template>

<style scoped>
.infoi {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: .45;
  background-color: grey;
  z-index: 9000;
}
</style>

 <script>
import AuthenticationService from '../services/authentication-service'
import { BreedingRhombusSpinner} from 'epic-spinners'
export default {
    data() {
        return {
            login: '',
            password: '',
            password2: '',
            passwordsDoNotMatch: false,
            response: '',
            loading: false
        }
    },
    components: {
        BreedingRhombusSpinner
    },
    watch: {
        password(val) {
            if(val !== this.password2) 
               this.passwordsDoNotMatch = true;
            else 
                this.passwordsDoNotMatch = false
        },
        password2(val) {
            if(val !== this.password) 
               this.passwordsDoNotMatch = true;
            else 
                this.passwordsDoNotMatch = false
        },
    },
    computed: {
        canRegister() {
            if(!this.login || !this.password || !this.password2)
                return false
            else
                return true;
        }
    },
    methods: {
        createNewUser() {
            const self = this;
            this.loading = true;
            AuthenticationService.createNewUser(this.login,this.password)
                .then(r => {
                    self.response = r;
                    if(r) {
                        self.login = ''
                        self.password = ''
                        self.password2 = ''
                    }

                    this.loading = false;
                })
        }
    }
}
 </script>