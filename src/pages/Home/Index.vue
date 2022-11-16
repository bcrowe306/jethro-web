<template>
    <v-layout>
        <v-app-bar elevation="0">
            <v-app-bar-title>
                Jethro
            </v-app-bar-title>
            <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>
            <v-spacer></v-spacer>
            
            <!-- <v-btn @click.prevent="logout" icon>
                <v-icon>mdi-logout</v-icon>
            </v-btn> -->
            <v-btn icon>
                <v-icon>mdi-message-outline</v-icon>
            </v-btn>
            
            <v-btn icon>
                <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
            <v-btn>
                <v-avatar color="red">
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </v-avatar>
                <v-menu activator="parent">
                    <v-list elevation="0" density="compact" :lines="false" nav>
                        <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" :title="account.name"
                            :subtitle="account.email">
                        </v-list-item>
                        <v-list-item to="/profile">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-account-box"></v-icon>
                            </template>
                            <v-list-item-title >Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item >
                            <template v-slot:prepend>
                                <v-icon icon="mdi-cog"></v-icon>
                            </template>
                            <v-list-item-title>Setting</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item  @click.prevent="logout">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-logout"></v-icon>
                            </template>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer theme="dark" >
            <v-list >
                <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" :title="account.name"
                    :subtitle="account.email" class="pt-3 pb-8">
                    
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="link in links" :key="link" :prepend-icon="link.icon" :title="link.title" :to="link.path"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main class="bg-blue-grey-lighten-5">
            <router-view></router-view>

        </v-main>
    </v-layout>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup() {
        const store = useStore()
        var account = ref( store.getters.getAccount )
        const router = useRouter()
        const links = [
            {
                path: '/dashboard',
                title: 'Dashboard',
                icon: 'mdi-view-dashboard'
            },
            {
                path: '/people',
                title: 'People',
                icon: 'mdi-account-multiple'
            },
            {
                path: '/groups',
                title: 'Groups',
                icon: 'mdi-account-box-multiple'
            },
        ]
        return {
            links,
            logout(){
                store.dispatch('logout').then(() => {
                    router.push('/login')
                })
            },
            account
        }
    },
}
</script>