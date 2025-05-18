import { createRouter, createWebHashHistory } from 'vue-router';
import RealTimeMapsView from '@/views/RealTimeMapsView.vue';
import AssestsControlView from '@/views/AssestsControlView.vue';
import OperationalHistoryView from '@/views/OperationalHistoryView.vue';
import ReportsView from '@/views/ReportsView.vue';
import RegisteredRoutesViews from '@/views/RegisteredRoutesViews.vue';
import RegisteredVehiclesView from '@/views/RegisteredVehiclesView.vue';
import RegisteredTrafficLightsView from '@/views/RegisteredTrafficLightsView.vue';
import RegisteredAddressesView from '@/views/RegisteredAddressesView.vue';
import TransportedMaterialView from '@/views/TransportedMaterialView.vue';
import CongestionsView from '@/views/CongestionsView.vue';
import RegisterNewRouteView from '@/views/RegisterNewRouteView.vue';
import RegisterNewVehicleView from '@/views/RegisterNewVehicleView.vue';
import LoginView from '@/views/LoginView.vue';



const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: "/maps",
            name: "maps",
            component: RealTimeMapsView
        },
        {
            path: "/history",
            name: "history",
            component: OperationalHistoryView
        },
        {
            path: "/reports",
            name: "reports",
            component: ReportsView,
            children: [
                {
                    path: "materials",
                    name: "materials",
                    component: TransportedMaterialView
                }
                ,
                {
                    path: "congestions",
                    name: "congestions",
                    component: CongestionsView
                }
            ]
        },
        {
            path: "/assets",
            name: "assets",
            component: AssestsControlView,
            children: [
                {
                    path: 'routes',
                    name: 'routes',
                    component: RegisteredRoutesViews
                },
                {
                    path: 'routes/register',
                    name: 'registerRoute',
                    component: RegisterNewRouteView
                },
                {
                    path: 'vehicles',
                    name: 'vehicles',
                    component: RegisteredVehiclesView,
                },
                {
                    path: 'vehicles/register',
                    name: 'registerVehicle',
                    component: RegisterNewVehicleView
                },
                {
                    path: 'trafficLights',
                    name: 'trafficLights',
                    component: RegisteredTrafficLightsView
                },
                {
                    path: 'address',
                    name: 'address',
                    component: RegisteredAddressesView
                }
            ]
        }

    ]
})

export default router;