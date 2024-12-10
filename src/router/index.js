import { createRouter, createWebHistory } from "vue-router";
import HomePageView from "../views/Home.vue";
import LoginView from "../views/Login.vue";
import DashboardView from "../views/Dashboard.vue";
import RegisterView from "../views/Register.vue";
import AddRestaurantView from "../views/AddRestaurant.vue";
import ReservationView from "../views/Reservation.vue";
import MyReservationsView from "../views/MyReservations.vue";

const routes = [
  { path: "/", name: "HomePage", component: HomePageView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/dashboard", name: "Dashboard", component: DashboardView },
  { path: "/register", name: "Register", component: RegisterView },
  { path: "/add-restaurant", name: "AddRestaurant", component: AddRestaurantView },
  { path: "/reservation", name: "Reservation", component: ReservationView },
  { path: "/my-reservations", name: "MyReservations", component: MyReservationsView }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
