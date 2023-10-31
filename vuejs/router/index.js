import { isAuthenticated } from '@/helpers/auth';
import { createRouter, createWebHashHistory } from 'vue-router';

/* Importar los componentes */

/* Público */
import Login from '@/app/public/components/Login';
import Register from '@/app/public/components/Register';

/* Usuarios */

//Main Dashboard
import Main from '@/app/administration/components/dashboard/Main';
import DefaultLayout from '@/app/administration/layouts/DefaultLayout'

const router = createRouter({
  history: createWebHashHistory(),
  routes: paths(),
});

router.beforeEach((to, from, next) => {
  if (["/login", "/register"].includes(to.path)) {
    // No se requiere token para las rutas de excepción
    next();
  } else {
    // Se requiere token para las demás rutas
    if (isAuthenticated()) {
      next();
    } else {
      // No se encuentra autenticado, redirigir a la página de inicio de sesión
      next('/login');
    }
  }
});

export default router;

function paths() {
  return [
    {
        path: '/',
        redirect: '/login',
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login,
            },
            {
                path: 'register',
                name: 'Register',
                component: Register,
            },
            /* Administration */
            {
                path: '/administration',
                name: 'Home',
                component: DefaultLayout,
                redirect: '/dashboard',
                children: [
                    {
                        path: '/dashboard',
                        name: 'Dashboard',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                        import(/* webpackChunkName: "dashboard" */ '@/app/administration/views/Dashboard.vue'),
                    },
                    {
                        path: '/theme',
                        name: 'Theme',
                        redirect: '/theme/typography',
                    },
                    {
                        path: '/theme/colors',
                        name: 'Colors',
                        component: () => import('@/app/administration/views/theme/Colors.vue'),
                    },
                    {
                        path: '/theme/typography',
                        name: 'Typography',
                        component: () => import('@/app/administration/views/theme/Typography.vue'),
                    },
                    {
                        path: '/base',
                        name: 'Base',
                        component: {
                            render() {
                                return h(resolveComponent('router-view'))
                            },
                        },
                        redirect: '/base/breadcrumbs',
                        children: [
                            {
                                path: '/base/accordion',
                                name: 'Accordion',
                                component: () => import('@/app/administration/views/base/Accordion.vue'),
                            },
                            {
                                path: '/base/breadcrumbs',
                                name: 'Breadcrumbs',
                                component: () => import('@/app/administration/views/base/Breadcrumbs.vue'),
                            },
                            {
                                path: '/base/cards',
                                name: 'Cards',
                                component: () => import('@/app/administration/views/base/Cards.vue'),
                            },
                            {
                                path: '/base/carousels',
                                name: 'Carousels',
                                component: () => import('@/app/administration/views/base/Carousels.vue'),
                            },
                            {
                                path: '/base/collapses',
                                name: 'Collapses',
                                component: () => import('@/app/administration/views/base/Collapses.vue'),
                            },
                            {
                                path: '/base/list-groups',
                                name: 'List Groups',
                                component: () => import('@/app/administration/views/base/ListGroups.vue'),
                            },
                            {
                                path: '/base/navs',
                                name: 'Navs',
                                component: () => import('@/app/administration/views/base/Navs.vue'),
                            },
                            {
                                path: '/base/paginations',
                                name: 'Paginations',
                                component: () => import('@/app/administration/views/base/Paginations.vue'),
                            },
                            {
                                path: '/base/placeholders',
                                name: 'Placeholders',
                                component: () => import('@/app/administration/views/base/Placeholders.vue'),
                            },
                            {
                                path: '/base/popovers',
                                name: 'Popovers',
                                component: () => import('@/app/administration/views/base/Popovers.vue'),
                            },
                            {
                                path: '/base/progress',
                                name: 'Progress',
                                component: () => import('@/app/administration/views/base/Progress.vue'),
                            },
                            {
                                path: '/base/spinners',
                                name: 'Spinners',
                                component: () => import('@/app/administration/views/base/Spinners.vue'),
                            },
                            {
                                path: '/base/tables',
                                name: 'Tables',
                                component: () => import('@/app/administration/views/base/Tables.vue'),
                            },
                            {
                                path: '/base/tooltips',
                                name: 'Tooltips',
                                component: () => import('@/app/administration/views/base/Tooltips.vue'),
                            },
                        ],
                    },
                    {
                        path: '/buttons',
                        name: 'Buttons',
                        component: {
                            render() {
                                return h(resolveComponent('router-view'))
                            },
                        },
                        redirect: '/buttons/standard-buttons',
                        children: [
                            {
                                path: '/buttons/standard-buttons',
                                name: 'Buttons',
                                component: () => import('@/app/administration/views/buttons/Buttons.vue'),
                            },
                            {
                                path: '/buttons/dropdowns',
                                name: 'Dropdowns',
                                component: () => import('@/app/administration/views/buttons/Dropdowns.vue'),
                            },
                            {
                                path: '/buttons/button-groups',
                                name: 'Button Groups',
                                component: () => import('@/app/administration/views/buttons/ButtonGroups.vue'),
                            },
                        ],
                    },
                    {
                        path: '/forms',
                        name: 'Forms',
                        component: {
                            render() {
                                return h(resolveComponent('router-view'))
                            },
                        },
                        redirect: '/forms/form-control',
                        children: [
                            {
                                path: '/forms/form-control',
                                name: 'Form Control',
                                component: () => import('@/app/administration/views/forms/FormControl.vue'),
                            },
                            {
                                path: '/forms/select',
                                name: 'Select',
                                component: () => import('@/app/administration/views/forms/Select.vue'),
                            },
                            {
                                path: '/forms/checks-radios',
                                name: 'Checks & Radios',
                                component: () => import('@/app/administration/views/forms/ChecksRadios.vue'),
                            },
                            {
                                path: '/forms/range',
                                name: 'Range',
                                component: () => import('@/app/administration/views/forms/Range.vue'),
                            },
                            {
                                path: '/forms/input-group',
                                name: 'Input Group',
                                component: () => import('@/app/administration/views/forms/InputGroup.vue'),
                            },
                            {
                                path: '/forms/floating-labels',
                                name: 'Floating Labels',
                                component: () => import('@/app/administration/views/forms/FloatingLabels.vue'),
                            },
                            {
                                path: '/forms/layout',
                                name: 'Layout',
                                component: () => import('@/app/administration/views/forms/Layout.vue'),
                            },
                            {
                                path: '/forms/validation',
                                name: 'Validation',
                                component: () => import('@/app/administration/views/forms/Validation.vue'),
                            },
                        ],
                    },
                    {
                        path: '/charts',
                        name: 'Charts',
                        component: () => import('@/app/administration/views/charts/Charts.vue'),
                    },
                    {
                        path: '/icons',
                        name: 'Icons',
                        component: {
                        render() {
                            return h(resolveComponent('router-view'))
                        },
                        },
                        redirect: '/icons/coreui-icons',
                        children: [
                            {
                                path: '/icons/coreui-icons',
                                name: 'CoreUI Icons',
                                component: () => import('@/app/administration/views/icons/CoreUIIcons.vue'),
                            },
                            {
                                path: '/icons/brands',
                                name: 'Brands',
                                component: () => import('@/app/administration/views/icons/Brands.vue'),
                            },
                            {
                                path: '/icons/flags',
                                name: 'Flags',
                                component: () => import('@/app/administration/views/icons/Flags.vue'),
                            },
                        ],
                    },
                    {
                        path: '/notifications',
                        name: 'Notifications',
                        component: {
                            render() {
                                return h(resolveComponent('router-view'))
                            },
                        },
                        redirect: '/notifications/alerts',
                        children: [
                            {
                                path: '/notifications/alerts',
                                name: 'Alerts',
                                component: () => import('@/app/administration/views/notifications/Alerts.vue'),
                            },
                            {
                                path: '/notifications/badges',
                                name: 'Badges',
                                component: () => import('@/app/administration/views/notifications/Badges.vue'),
                            },
                            {
                                path: '/notifications/modals',
                                name: 'Modals',
                                component: () => import('@/app/administration/views/notifications/Modals.vue'),
                            },
                        ],
                    },
                    {
                        path: '/widgets',
                        name: 'Widgets',
                        component: () => import('@/app/administration/views/widgets/Widgets.vue'),
                    },
                ],
            },
            {
                path: '/pages',
                redirect: '/pages/404',
                name: 'Pages',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                children: [
                    {
                        path: '404',
                        name: 'Page404',
                        component: () => import('@/app/administration/views/pages/Page404'),
                    },
                    {
                        path: '500',
                        name: 'Page500',
                        component: () => import('@/app/administration/views/pages/Page500'),
                    },
                    /*{
                        path: 'login',
                        name: 'Login',
                        component: () => import('@/app/administration/views/pages/Login'),
                    },
                    {
                        path: 'register',
                        name: 'Register',
                        component: () => import('@/app/administration/views/pages/Register'),
                    },*/
                ],
            },
        ],
    },
  ]
}
