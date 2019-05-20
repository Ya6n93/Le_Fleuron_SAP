import Vue from "vue";
import Router from "vue-router";
import InscriptionCandidat from "../components/InscriptionCandidat";
import connexion from "../components/Connexion";
import AddEntreprise from "../components/AddEntreprise";
import Index from "../components/Index";
import Dashboard from "../components/Dashboard";
import FormOffre from "../components/FormOffre";
import Error404 from "../components/404";
import AdminPanel from "../components/AdminPanel";
import Joboard from "../components/Joboard";

Vue.use(Router);

export default new Router({
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	},
	routes: [
		{
			path: '/',
			component: Index
		},
		{
			path: "/candidat/inscription",
			component: InscriptionCandidat
		},
		{
			path: "/entreprise/add",
			component: AddEntreprise
		},
		{
			path: "/connexion",
			component: connexion
		},
		{
			path: "/entreprise/dashboard",
			component: Dashboard
		},
		{
			path: "/entreprise/add/offer",
			component: FormOffre
		},
		{
			path: "*",
			component: Error404
		},
		{
			path: "/candidat/joboard",
			component: Joboard
		},
	]
});
