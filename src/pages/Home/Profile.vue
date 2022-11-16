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
                            <span class="text-h4 font-weight-medium">Brandon Crowe</span>
                        </v-col>
                        <v-col cols="12">
                            <v-icon class="mr-6 text-red-lighten-1">mdi-email</v-icon>
                            <span class="text-h7 font-weight-light">bcrowe306@gmail.com</span>
                            <v-btn color="grey-lighten-1" size="small" class="ml-6" variant="text" icon="mdi-pencil"></v-btn>
                        </v-col>
                        <v-col>
                            <v-icon class="mr-6 text-green-lighten-1">mdi-phone</v-icon>
                            <span class="text-h7 font-weight-light">(813) 606-2719</span>
                            <v-btn color="grey-lighten-1" size="small" class="ml-6" variant="text" icon="mdi-pencil"></v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
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