import { h, resolveComponent } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout'

export default [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/pages/login',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/admin/user-management/user-list',
        name: 'Danh sách Quản lý',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "user-list" */ '@/views/admin/UserManagement/UserList.vue'),
      },
      {
        path: '/admin/falcuty-management/falcuty-list',
        name: 'Quản lý Khoa',
        component: () =>
          import('@/views/admin/FalcutyManagement/FalcutyList.vue'),
      },
      {
        path: '/admin/workplace-management/workplace-list',
        name: 'Quản lý đơn vị',
        component: () =>
          import('@/views/admin/WorkplaceManagement/WorkplaceList.vue'),
      },
      {
        path: '/admin/comment-topic',
        name: 'Quản lý bình luận',
        component: () =>
          import('@/views/admin/CommentTopic/Comment.vue'),
      },
      {
        path: '/admin/statistical-score-management/statistical-list',
        name: 'Quản lý Thống kê điểm',
        component: () =>
          import('@/views/admin/StatisticalScoreManagement/StatisticalList.vue'),
      },
      {
        path: '/admin/class-management/class-list',
        name: 'Quản lý Lớp',
        component: () =>
          import('@/views/admin/ClassManagement/ClassList.vue'),
      },
      {
        path: '/admin/teacher-management/teacher-list',
        name: 'Quản lý Giáo viên',
        component: () =>
          import('@/views/admin/TeacherManagement/TeacherList.vue'),
      },
      {
        path: '/admin/assembly-management/assembly-list',
        name: 'Quản lý Hội đồng',
        component: () =>
          import('@/views/admin/AssemblyManagement/AssemblyList.vue'),
      },
      {
        path: '/admin/student-management/student-list',
        name: 'Quản lý Sinh viên',
        component: () =>
          import('@/views/admin/StudentManagement/StudentList.vue'),
      },
      {
        path: '/admin/graduation-project-management/graduation-project-list',
        name: 'Quản lý Đồ án',
        component: () =>
          import('@/views/admin/GraduationProjectManagement/GraduationProjectList.vue'),
      },
      {
        path: '/admin/category-management/category-list',
        name: 'Quản lý Chủ đề',
        component: () =>
          import('@/views/admin/CategoryManagement/CategoryList.vue'),
      },
      {
        path: '/admin/score-assembly/score-assembly-list',
        name: 'Điểm hội đồng',
        component: () =>
          import('@/views/admin/ScoreAssembly/ScoreAssemblyList.vue'),
      },
      {
        path: '/admin/propose-topic-management/propose-topic-list',
        name: 'Danh sách Đề tài đề xuất',
        component: () =>
          import('@/views/admin/ProposeTopicManagement/ProposeTopicList.vue'),
      },
      {
        path: '/admin/topic-of-lecture/topic-of-lecture-list',
        name: 'Đề tài phản biện',
        component: () =>
          import('@/views/admin/TopicOfLectureManagement/TopicOfLectureList.vue'),
      },
      {
        path: '/admin/topic-of-lecture/topic-of-lecture-guide-list',
        name: 'Đề tài hướng dẫn',
        component: () =>
          import('@/views/admin/TopicOfLectureManagement/TopicOfLectureGuideList.vue'),
      },
      {
        path: '/admin/student-guide-management/student-guide-list',
        name: 'Sinh viên hướng dẫn',
        component: () =>
          import('@/views/admin/StudentGuideManagement/StudentGuideList.vue'),
      },
      {
        path: '/admin/student-counter-argument-management/student-counter-argument-list',
        name: 'Sinh viên phản biện',
        component: () =>
          import('@/views/admin/StudentCounterArgumentManagement/StudenCounterArgumentList.vue'),
      },
      {
        path: '/admin/topic-of-lecture/topic-student-assign-list',
        name: 'Đề tài sinh viên đăng ký',
        component: () =>
          import('@/views/admin/TopicOfLectureManagement/TopicStudentAssignList.vue'),
      },
      {
        path: '/user-profile',
        name: 'Thông tin tài khoản',
        component: () =>
          import('@/views/admin/UserProfile/UserProfile.vue'),
      },
      {
        path: '/propose-project',
        name: 'Đề tài đề xuất',
        component: () =>
          import('@/views/admin/TopicOfLectureManagement/TopicStudentSuggestList.vue'),
      },
      {
        path: '/my-project',
        name: 'Đề tài của tôi',
        component: () =>
          import('@/views/admin/MyProject/MyProjectList.vue'),
      },
      {
        path: '/project-registrator',
        name: 'Đề tài đăng ký',
        component: () =>
          import('@/views/admin/ProjectRegistration/ProjectRegistrationList.vue'),
      },
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
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
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/base/cards',
            name: 'Cards',
            component: () => import('@/views/base/Cards.vue'),
          },
          {
            path: '/base/carousels',
            name: 'Carousels',
            component: () => import('@/views/base/Carousels.vue'),
          },
          {
            path: '/base/collapses',
            name: 'Collapses',
            component: () => import('@/views/base/Collapses.vue'),
          },
          {
            path: '/base/list-groups',
            name: 'List Groups',
            component: () => import('@/views/base/ListGroups.vue'),
          },
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
          },
          {
            path: '/base/paginations',
            name: 'Paginations',
            component: () => import('@/views/base/Paginations.vue'),
          },
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
          },
          {
            path: '/base/popovers',
            name: 'Popovers',
            component: () => import('@/views/base/Popovers.vue'),
          },
          {
            path: '/base/progress',
            name: 'Progress',
            component: () => import('@/views/base/Progress.vue'),
          },
          {
            path: '/base/spinners',
            name: 'Spinners',
            component: () => import('@/views/base/Spinners.vue'),
          },
          {
            path: '/base/tables',
            name: 'Tables',
            component: () => import('@/views/base/Tables.vue'),
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
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
            component: () => import('@/views/buttons/Buttons.vue'),
          },
          {
            path: '/buttons/dropdowns',
            name: 'Dropdowns',
            component: () => import('@/views/buttons/Dropdowns.vue'),
          },
          {
            path: '/buttons/button-groups',
            name: 'Button Groups',
            component: () => import('@/views/buttons/ButtonGroups.vue'),
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
            component: () => import('@/views/forms/FormControl.vue'),
          },
          {
            path: '/forms/select',
            name: 'Select',
            component: () => import('@/views/forms/Select.vue'),
          },
          {
            path: '/forms/checks-radios',
            name: 'Checks & Radios',
            component: () => import('@/views/forms/ChecksRadios.vue'),
          },
          {
            path: '/forms/range',
            name: 'Range',
            component: () => import('@/views/forms/Range.vue'),
          },
          {
            path: '/forms/input-group',
            name: 'Input Group',
            component: () => import('@/views/forms/InputGroup.vue'),
          },
          {
            path: '/forms/floating-labels',
            name: 'Floating Labels',
            component: () => import('@/views/forms/FloatingLabels.vue'),
          },
          {
            path: '/forms/layout',
            name: 'Layout',
            component: () => import('@/views/forms/Layout.vue'),
          },
          {
            path: '/forms/validation',
            name: 'Validation',
            component: () => import('@/views/forms/Validation.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
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
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
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
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
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
        path: '/:pathMath(.*)*',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
      {
        path: 'activation',
        name: 'Activation',
        component: () => import('@/views/pages/ActiveAccount'),
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/pages/ForgotPassword'),
      },
      {
        path: 'update-password',
        name: 'UpdatePassword',
        component: () => import('@/views/pages/UpdatePassword'),
      },
      {
        path: 'landing-page',
        name: 'Landing page',
        component: () => import('@/views/pages/LandingPage'),
      },
      {
        path: 'project-detail/:id',
        name: 'Project detail',
        component: () => import('@/views/pages/ProjectDetail'),
      },
    ],
  },
]
