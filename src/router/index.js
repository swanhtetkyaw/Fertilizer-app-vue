import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Buy from '../views/Buy.vue';
import Team from '../views/Team.vue';
import Graph from '../views/Graph.vue';
import Detail from '../views/Detail.vue';
import Inventory from '../views/Inventory.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';
import { auth } from '@/firebase';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			requireGuest: true
		}
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
		meta: {
			requireGuest: true
		}
	},
	{
		path: '/',
		name: 'Dashboard',
		component: Dashboard,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/buy',
		name: 'buy',
		component: Buy,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/graph',
		name: 'graph',
		component: Graph,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/detail',
		name: 'detail',
		component: Detail,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/team',
		name: 'team',
		component: Team,
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/inventory',
		name: 'inventory',
		component: Inventory,
		meta: {
			requireAuth: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

//route guard
router.beforeEach((to, from, next) => {
	//check for requireAuth guard
	if (to.matched.some((record) => record.meta.requireAuth)) {
		//check the user is not login
		if (!auth.currentUser) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			});
		} else {
			//if the user is login
			next();
		}
	} else if (to.matched.some((record) => record.meta.requireGuest)) {
		//check the user is log in
		if (auth.currentUser) {
			next({
				path: '/',
				query: {
					redirect: to.fullPath
				}
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
