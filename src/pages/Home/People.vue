<template>
    <v-container class="px-12 pt-6">
        <v-row no-gutters class="" justify="center">
            <v-col cols="11">
                <span class="text-h4">People</span>
                <v-breadcrumbs :items="breadcrumbs">
                    <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
            </v-col>
            <v-col cols="11" class="flex-shrink-0" style="min-width: 100px; max-width: 100%;">
                <v-card>
                    <v-tabs v-model="tabs" density="compact" grow>
                        <v-tab value="people">People</v-tab>
                        <v-tab value="lists">Lists</v-tab>
                        <v-tab value="workflows">Workflows</v-tab>
                        <v-tab value="forms">Forms</v-tab>
                    </v-tabs>
                    <v-card-text>
                        <v-window v-model="tabs">
                            <v-window-item value="people">
                                <v-table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Zip Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(p, i) in people_list" :key="i">
                                            <td>
                                                <v-avatar size="32" color="info">
                                                    <v-icon icon="mdi-account-circle"></v-icon>
                                                </v-avatar>
                                            </td>
                                            <td>{{ p.firstName }}</td>
                                            <td>{{ p.lastName }}</td>
                                            <td>{{ p.email }}</td>
                                            <td>{{ p.address }}</td>
                                            <td>{{ p.city }}</td>
                                            <td>{{ p.state }}</td>
                                            <td>{{ p.zipcode }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-window-item>
                    
                            <v-window-item value="lists">
                                lists
                            </v-window-item>
                    
                            <v-window-item value="workflows">
                                workflows
                            </v-window-item>
                            <v-window-item value="forms">
                                forms
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
    </v-container>
</template>
<script>
import {ref} from 'vue'
import api from '@/services/api'
export default {
    setup() {
        var people_list = ref([])
        api.people.get().then(res => {
            people_list.value = res.documents
        })
        var tabs = ref('people')
        const breadcrumbs = [
            {
                title: 'Dashboard',
                disabled: false,
                href: '/dashboard'
            },
            {
                title: 'People',
                disabled: false,
                href: '/people'
            },
        ]
        return {
            breadcrumbs,
            tabs,
            people_list
        }
    },
}
</script>