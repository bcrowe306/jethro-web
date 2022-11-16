<template>
    <v-container class="fill-height">
        <v-row justify="center" style="height: 100vh" align="center" >
            <v-col cols="7">
                <v-card rounded elevation="3">
                    <v-row class="" no-gutters>
                        
                        <v-col cols="5" class="pa-12" align-self="center">
                            <v-row no-gutters class="" align="center">
                                <v-col cols="12" class="mb-2">
                                    <span class="text-h4">Sign Up</span>
                                </v-col>
                                
                                <v-col cols="12">
                                    <v-row no-gutters class="mb-8">
                                        <v-col cols="6"><span>Already have account?</span></v-col>
                                        <v-col cols="6"><router-link class="float-right" to="/login">Sign In</router-link></v-col>
                                    </v-row>
                                    
                                </v-col>
                                <v-col cols="12">
                                    <v-form v-model="valid" ref="signupForm" @submit.prevent="SignUn">
                                        <!-- Name -->
                                        <v-text-field v-model="name" :rules="nameRules" placeholder="Name" type="text" label="Full Name" variant="outlined"></v-text-field>

                                        <!-- Email -->
                                        <v-text-field v-model="email" :rules="emailRules" placeholder="johndoe@example.com" type="email" label="Email Address" variant="outlined"></v-text-field>

                                        <!-- Password -->
                                        <v-text-field v-model="password" type="password" label="Password" variant="outlined"></v-text-field>
    
                                        <v-row no-gutters align="center">
                                            <v-col><v-checkbox :inline="true" density="compact" label="I agree to the terms and privacy"></v-checkbox></v-col>
                                        </v-row>

                                        <!-- Error Message -->
                                        <span v-if="errorMessage" class="text-red text-caption">{{errorMessage}}</span>
                                        <v-btn type="submit" class="text--white" block variant="flat" color="primary" size="large">Sign In</v-btn>

                                    </v-form>
                                </v-col>
                            </v-row>
                            
                        </v-col>

                        <v-col cols="7" class="bg-primary pa-12 d-flex align-center justify-start">
                            <div class="v-col-8">
                                <h2 class="text-h4">
                                    Elegant Design with unlimited features, built with love
                                </h2>
                                <h6 class="text-subtitle-1 font-weight-light mt-6">
                                    Wrappixel helps developers to build organized and well-coded admin dashboards full of beautiful and feature
                                    rich
                                    modules.
                                </h6>
                                <v-btn variant="outlined" color="white" class="text-white mt-6" size="large">Learn More</v-btn>
                            </div>
                        
                        </v-col>
                    </v-row>
                </v-card>  
            </v-col>
        </v-row>
        
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
var valid = true

var errorMessage = ref('')
const router = useRouter()
const loginForm = ref(null)
var loading = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]
const nameRules = [
    v => !!v || 'Name is required'
]

async function SignUn() {
    errorMessage.value = ''
    if (valid) {
        loading.value = true
        store.dispatch('signup', { email: email.value, password: password.value, name:name.value }).then(() => {
            router.push('/')
        })
            .catch(err => {
                errorMessage.value = err.message
            })
            .finally(() => {
                loading.value = false
            })
    } else {
        errorMessage.value = 'Invalid form values'
    }
}

</script>