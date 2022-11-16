<template>
    <v-container class="px-12 pt-6">
        <v-row>
            <v-col cols="12">
                <span class="text-h4">Profile</span>
                <v-breadcrumbs :items="breadcrumbs">
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
            </v-col>
            <v-col>
                <v-card class="pa-8">
                    <v-row justify="center" class="text-center">
                        <v-col cols="12" >
                                <v-avatar size="128" color="red">
                                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                                </v-avatar>
                        </v-col>
                        <v-col cols="12">
                            <v-btn variant="text" color="grey" size="x-large" class="">
                                {{account.name}}
                                <v-dialog v-model="nameDialog" max-width="500" activator="parent">
                                    <v-card>
                                        <v-card-title class="pa-6">
                                            <span class="text-h5 font-weight-light">Update Name</span>
                                            <v-divider class="mt-5"></v-divider>
                                        </v-card-title>
                                        <v-card-text class="pb-4">
                                            <v-form>
                                                <v-text-field v-model="name" variant="outlined" type="text" label="Full Name"></v-text-field>
                                                <v-divider class="my-5"></v-divider>
                                                <v-btn @click.prevent="updateName" rounded="pill" color="primary">Update</v-btn>
                                                <v-btn @click.prevent="nameDialog = false" variant="outlined" rounded="pill" color="primary"
                                                    class="ml-4">Cancel</v-btn>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                        </v-col>
                        <v-col cols="12">
                            <v-icon class="mr-6 text-red-lighten-1">mdi-email</v-icon>
                            <span class="text-h7 font-weight-light">{{account.email}}</span>
                            <v-btn color="grey-lighten-1" size="small" class="ml-6" variant="text" icon="mdi-pencil">
                                <v-icon>mdi-pencil</v-icon>
                                <v-dialog v-model="emailDialog" max-width="500" activator="parent">
                                    <v-card>
                                        <v-card-title class="pa-6">
                                            <span class="text-h5 font-weight-light">Update Email</span>
                                            <v-divider class="mt-5"></v-divider>
                                        </v-card-title>
                                        <v-card-text class="pb-4">
                                            <v-form v-model="emailFormValid" ref="emailForm" @submit.prevent="updateEmail">
                                                <v-text-field prepend-icon="mdi-email" :rules="emailRules" v-model="email" variant="outlined" type="email" label="Email Address" placeholder="johndoe@gmail.com"></v-text-field>
                                                <v-text-field 
                                                    prepend-icon="mdi-lock"
                                                    :append-inner-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" 
                                                    :type="passwordShow ? 'text' : 'password'"  
                                                    v-model="password" 
                                                    variant="outlined" 
                                                    label="Password" 
                                                    @click:append-inner="passwordShow = !passwordShow"
                                                    ></v-text-field>
                                                <span class="text-caption font-weight-light text-warning">Password required to update email address</span>
                                                <v-divider class="my-5"></v-divider>
                                                <v-btn type="submit" rounded="pill" color="primary">Update</v-btn>
                                                <v-btn @click.prevent="emailDialog = false; password=''" variant="outlined" rounded="pill" color="primary"
                                                    class="ml-4">Cancel</v-btn>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-icon class="mr-6 text-green-lighten-1">mdi-phone</v-icon>
                            <span class="text-h7 font-weight-light">{{ phoneNumber }}</span>
                            <v-btn color="grey-lighten-1" size="small" class="ml-6" variant="text" icon="mdi-pencil">
                                <v-icon>mdi-pencil</v-icon>
                                <v-dialog v-model="phoneDialog" max-width="500" activator="parent">
                                    <v-card>
                                        <v-card-title class="pa-6">
                                            <span class="text-h5 font-weight-light">Update Phone</span>
                                            <v-divider class="mt-5"></v-divider>
                                        </v-card-title>
                                        <v-card-text class="pb-4">
                                            <v-form >
                                                <v-text-field v-model="phoneNumber" variant="outlined" type="text" label="Phone Number"></v-text-field>
                                                <span class="text-caption font-weight-light">Phone number with a leading '+' and maximum of 15 digits (+123456789)</span>
                                                <v-divider class="my-5"></v-divider>
                                                <v-btn @click.prevent="updatePhone" rounded="pill" color="primary">Update</v-btn>
                                                <v-btn @click.prevent="phoneDialog = false" variant="outlined" rounded="pill" color="primary" class="ml-4">Cancel</v-btn>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
var passwordShow=ref(false)
var account = computed(() => store.getters.getAccount)
var phoneDialog = ref(false)
var phoneNumber = ref('(813) 606-2719')
var nameDialog = ref(false)
var name = ref(store.getters.getAccount.name)
var emailDialog = ref(false)
var email = ref(store.getters.getAccount.email)
var password = ref('')
var emailFormValid = ref(true)
const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]
// Methods
async function updateName(){
    await store.dispatch('updateName', name.value)
    nameDialog.value = false
}
async function updateEmail(){
    await store.dispatch('updateEmail', {email: email.value, password: password.value})
    emailDialog.value = false
}    
async function updatePhone(){
    console.log('phone updated')
    phoneDialog.value = false
}
const breadcrumbs = [
    {
        title: 'Dashboard',
        disabled: false,
        href: '/dashboard'
    },
    {
        title: 'Profile',
        disabled: false,
        href: '/profile'
    },
]
</script>