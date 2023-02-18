export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    // badge: {
    //   color: 'primary',
    //   text: 'NEW',
    // },
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Danh sách quản lý',
    to: '/admin/user-management/user-list',
    icon: 'cilPeople',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Khoa',
    to: '/admin/falcuty-management/falcuty-list',
    icon: 'cilHouse',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Đơn vị',
    to: '/admin/workplace-management/workplace-list',
    icon: 'cilVector',
    role: ['OTHER']
  },
  // {
  //   component: 'CNavItem',
  //   name: 'Quản lý Bình luận',
  //   to: '/admin/comment-topic',
  //   icon: 'cilVector',
  // },
  // {
  {
    component: 'CNavItem',
    name: 'Quản lý Lớp',
    to: '/admin/class-management/class-list',
    icon: 'cilWc',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Giáo viên',
    to: '/admin/teacher-management/teacher-list',
    icon: 'cilUser',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Hội đồng',
    to: '/admin/assembly-management/assembly-list',
    icon: 'cilObjectGroup',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Sinh viên',
    to: '/admin/student-management/student-list',
    icon: 'cilMoodGood',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Sinh viên hướng dẫn',
    to: '/admin/student-guide-management/student-guide-list',
    icon: 'cilMoodGood',
    role: ['LECTURE']
  },
  {
    component: 'CNavItem',
    name: 'Sinh viên phản biện',
    to: '/admin/student-counter-argument-management/student-counter-argument-list',
    icon: 'cilMoodGood',
    role: ['LECTURE']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Đồ án',
    to: '/admin/graduation-project-management/graduation-project-list',
    icon: 'cilNewspaper',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Thống kê điểm',
    to: '/admin/statistical-score-management/statistical-list',
    icon: 'cilNewspaper',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Quản lý Chủ đề',
    to: '/admin/category-management/category-list',
    icon: 'cilNewspaper',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Điểm hội đồng',
    to: '/admin/score-assembly/score-assembly-list',
    icon: 'cilNewspaper',
    role: ['LECTURE']
  },
  {
    component: 'CNavItem',
    name: 'Danh sách Đề tài đề xuất',
    to: '/admin/propose-topic-management/propose-topic-list',
    icon: 'cilNewspaper',
    role: ['OTHER']
  },
  {
    component: 'CNavItem',
    name: 'Đề tài phản biện',
    to: '/admin/topic-of-lecture/topic-of-lecture-list',
    icon: 'cilApplicationsSettings',
    role: ['LECTURE']
  },
  {
    component: 'CNavItem',
    name: 'Đề tài hướng dẫn',
    to: '/admin/topic-of-lecture/topic-of-lecture-guide-list',
    icon: 'cilBlurLinear',
    role: ['LECTURE']
  },
  {
    component: 'CNavItem',
    name: 'Đề tài sinh viên đăng ký',
    to: '/admin/topic-of-lecture/topic-student-assign-list',
    icon: 'cilColorBorder',
    role: ['LECTURE']
  },
  {
    component: 'CNavItem',
    name: 'Đề tài đề xuất',
    to: '/propose-project',
    icon: 'cil-puzzle',
    role: ['STUDENT']
  },
  {
    component: 'CNavItem',
    name: 'Đề tài của tôi',
    to: '/my-project',
    icon: 'cilBook',
    role: ['STUDENT']
  },
  {
    component: 'CNavItem',
    name: 'Đề tài đăng ký',
    to: '/project-registrator',
    icon: 'cilBarcode',
    role: ['STUDENT']
  },
  // {
  //   component: 'CNavTitle',
  //   name: 'Theme',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: 'cil-drop',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: 'cil-pencil',
  // },
  // {
  //   component: 'CNavTitle',
  //   name: 'Components',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Base',
  //   to: '/base',
  //   icon: 'cil-puzzle',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Breadcrumbs',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Carousels',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Collapses',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'List Groups',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Paginations',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: 'cil-cursor',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Buttons',
  //       to: '/buttons/standard-buttons',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Button Groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Forms',
  //   to: '/forms',
  //   icon: 'cil-notes',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: 'cil-chart-pie',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Icons',
  //   to: '/icons',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'CoreUI Icons',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'info',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Brands',
  //       to: '/icons/brands',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Flags',
  //       to: '/icons/flags',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Notifications',
  //   to: '/notifications',
  //   icon: 'cil-bell',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Modals',
  //       to: '/notifications/modals',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'primary',
  //     text: 'NEW',
  //     shape: 'pill',
  //   },
  // },
  // {
  //   component: 'CNavTitle',
  //   name: 'Extras',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'Pages',
  //   to: '/pages',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'Login',
  //       to: '/pages/login',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Register',
  //       to: '/pages/register',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'ForgotPassword',
  //       to: '/pages/forgot-password',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Error 404',
  //       to: '/pages/404',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'Error 500',
  //       to: '/pages/500',
  //     },
  //   ],
  // },

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
