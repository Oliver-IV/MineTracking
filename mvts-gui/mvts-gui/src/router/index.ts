import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import RealTimeMapsView from '@/views/RealTimeMapsView.vue'
import OperationalHistoryView from '@/views/OperationalHistoryView.vue'
import ReportsView from '@/views/ReportsView.vue'
import TransportedMaterialView from '@/views/TransportedMaterialView.vue'
import CongestionsView from '@/views/CongestionsView.vue'
import AssestsControlView from '@/views/AssestsControlView.vue'
import RegisteredRoutesViews from '@/views/RegisteredRoutesViews.vue'
import RegisterNewRouteView from '@/views/RegisterNewRouteView.vue'
import RegisteredVehiclesView from '@/views/RegisteredVehiclesView.vue'
import RegisterNewVehicleView from '@/views/RegisterNewVehicleView.vue'
import RegisteredTrafficLightsView from '@/views/RegisteredTrafficLightsView.vue'
import RegisteredAddressesView from '@/views/RegisteredAddressesView.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: CreateAccountView,
        },
        {
            path: '/home',
            component: HomeView,
            children: [
                {
                    path: '',
                    redirect: 'maps',
                },
                {
                    path: '/maps',
                    name: 'maps',
                    component: RealTimeMapsView,
                },
                {
                    path: '/history',
                    name: 'history',
                    component: OperationalHistoryView,
                },
                {
                    path: '/reports',
                    name: 'reports',
                    component: ReportsView,
                    children: [
                        {
                            path: 'materials',
                            name: 'materials',
                            component: TransportedMaterialView,
                        },
                        {
                            path: 'congestions',
                            name: 'congestions',
                            component: CongestionsView,
                        },
                    ],
                },
                {
                    path: '/assets',
                    name: 'assets',
                    component: AssestsControlView,
                    children: [
                        {
                            path: 'routes',
                            name: 'routes',
                            component: RegisteredRoutesViews,
                        },
                        {
                            path: 'routes/register',
                            name: 'registerRoute',
                            component: RegisterNewRouteView,
                        },
                        {
                            path: 'vehicles',
                            name: 'vehicles',
                            component: RegisteredVehiclesView,
                        },
                        {
                            path: 'vehicles/register',
                            name: 'registerVehicle',
                            component: RegisterNewVehicleView,
                        },
                        {
                            path: 'trafficLights',
                            name: 'trafficLights',
                            component: RegisteredTrafficLightsView,
                        },
                        {
                            path: 'address',
                            name: 'address',
                            component: RegisteredAddressesView,
                        },
                    ],
                },
            ],
        },
    ],
})

export default router
