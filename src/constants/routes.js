// Route paths for the application
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  
  // Student routes
  STUDENTS: '/students',
  STUDENT_DETAILS: '/students/:id',
  STUDENT_CREATE: '/students/create',
  STUDENT_EDIT: '/students/:id/edit',
  STUDENT_ATTENDANCE: '/students/:id/attendance',
  STUDENT_GRADES: '/students/:id/grades',
  
  // Teacher routes
  TEACHERS: '/teachers',
  TEACHER_DETAILS: '/teachers/:id',
  TEACHER_CREATE: '/teachers/create',
  TEACHER_EDIT: '/teachers/:id/edit',
  TEACHER_SCHEDULE: '/teachers/:id/schedule',
  
  // Parent routes
  PARENTS: '/parents',
  PARENT_DETAILS: '/parents/:id',
  PARENT_CREATE: '/parents/create',
  PARENT_EDIT: '/parents/:id/edit',
  
  // Class routes
  CLASSES: '/classes',
  CLASS_DETAILS: '/classes/:id',
  CLASS_CREATE: '/classes/create',
  CLASS_EDIT: '/classes/:id/edit',
  CLASS_SCHEDULE: '/classes/:id/schedule',
  CLASS_ATTENDANCE: '/classes/:id/attendance',
  
  // Course routes
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:id',
  COURSE_CREATE: '/courses/create',
  COURSE_EDIT: '/courses/:id/edit',
  
  // Grade routes
  GRADES: '/grades',
  GRADE_DETAILS: '/grades/:id',
  GRADE_CREATE: '/grades/create',
  GRADE_EDIT: '/grades/:id/edit',
  GRADE_REPORTS: '/grades/reports',
  
  // Attendance routes
  ATTENDANCE: '/attendance',
  ATTENDANCE_CREATE: '/attendance/create',
  ATTENDANCE_REPORTS: '/attendance/reports',
  
  // Schedule routes
  SCHEDULE: '/schedule',
  SCHEDULE_CREATE: '/schedule/create',
  SCHEDULE_EDIT: '/schedule/:id/edit',
  
  // Finance routes
  FINANCE: '/finance',
  FEES: '/finance/fees',
  FEES_CREATE: '/finance/fees/create',
  FEES_EDIT: '/finance/fees/:id/edit',
  SALARIES: '/finance/salaries',
  EXPENSES: '/finance/expenses',
  REPORTS: '/finance/reports',
  
  // Library routes
  LIBRARY: '/library',
  BOOKS: '/library/books',
  BOOK_DETAILS: '/library/books/:id',
  BOOK_CREATE: '/library/books/create',
  BOOK_EDIT: '/library/books/:id/edit',
  BORROWED: '/library/borrowed',
  
  // Transport routes
  TRANSPORT: '/transport',
  BUSES: '/transport/buses',
  BUSES_CREATE: '/transport/buses/create',
  BUSES_EDIT: '/transport/buses/:id/edit',
  ROUTES: '/transport/routes',
  ROUTES_CREATE: '/transport/routes/create',
  
  // Communication routes
  COMMUNICATION: '/communication',
  ANNOUNCEMENTS: '/communication/announcements',
  ANNOUNCEMENT_CREATE: '/communication/announcements/create',
  MESSAGES: '/communication/messages',
  MESSAGE_CREATE: '/communication/messages/create',
  
  // Settings routes
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
  ACCOUNT: '/settings/account',
  NOTIFICATIONS: '/settings/notifications',
  SECURITY: '/settings/security',
  SYSTEM: '/settings/system',
  
  // Admin routes
  ADMIN: '/admin',
  USERS: '/admin/users',
  USER_CREATE: '/admin/users/create',
  USER_EDIT: '/admin/users/:id/edit',
  ROLES: '/admin/roles',
  PERMISSIONS: '/admin/permissions',
  SYSTEM_LOGS: '/admin/logs',
  BACKUP: '/admin/backup',
  
  // Reports routes
  REPORTS: '/reports',
  STUDENT_REPORTS: '/reports/students',
  TEACHER_REPORTS: '/reports/teachers',
  FINANCE_REPORTS: '/reports/finance',
  ATTENDANCE_REPORTS: '/reports/attendance',
  PERFORMANCE_REPORTS: '/reports/performance',
  
  // Error routes
  UNAUTHORIZED: '/unauthorized',
  FORBIDDEN: '/forbidden',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
};

// Sidebar navigation items
export const SIDEBAR_NAVIGATION = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: ROUTES.DASHBOARD,
    roles: ['admin', 'teacher', 'parent', 'student'],
  },
  {
    id: 'students',
    label: 'Students',
    icon: 'GraduationCap',
    path: ROUTES.STUDENTS,
    roles: ['admin', 'teacher'],
  },
  {
    id: 'teachers',
    label: 'Teachers',
    icon: 'Users',
    path: ROUTES.TEACHERS,
    roles: ['admin'],
  },
  {
    id: 'parents',
    label: 'Parents',
    icon: 'UserCircle',
    path: ROUTES.PARENTS,
    roles: ['admin'],
  },
  {
    id: 'classes',
    label: 'Classes',
    icon: 'School',
    path: ROUTES.CLASSES,
    roles: ['admin', 'teacher'],
  },
  {
    id: 'courses',
    label: 'Courses',
    icon: 'BookOpen',
    path: ROUTES.COURSES,
    roles: ['admin', 'teacher'],
  },
  {
    id: 'grades',
    label: 'Grades',
    icon: 'Award',
    path: ROUTES.GRADES,
    roles: ['admin', 'teacher', 'parent', 'student'],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: 'CalendarCheck',
    path: ROUTES.ATTENDANCE,
    roles: ['admin', 'teacher', 'parent'],
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'Calendar',
    path: ROUTES.SCHEDULE,
    roles: ['admin', 'teacher', 'parent', 'student'],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: 'DollarSign',
    path: ROUTES.FINANCE,
    roles: ['admin'],
  },
  {
    id: 'library',
    label: 'Library',
    icon: 'Library',
    path: ROUTES.LIBRARY,
    roles: ['admin', 'teacher', 'student'],
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: 'Bus',
    path: ROUTES.TRANSPORT,
    roles: ['admin', 'parent'],
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: 'MessageSquare',
    path: ROUTES.COMMUNICATION,
    roles: ['admin', 'teacher', 'parent'],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3',
    path: ROUTES.REPORTS,
    roles: ['admin', 'teacher'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    path: ROUTES.SETTINGS,
    roles: ['admin', 'teacher', 'parent', 'student'],
  },
];

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student',
};

// API endpoints (for future implementation)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  STUDENTS: {
    LIST: '/api/students',
    DETAILS: (id) => `/api/students/${id}`,
    CREATE: '/api/students',
    UPDATE: (id) => `/api/students/${id}`,
    DELETE: (id) => `/api/students/${id}`,
    ATTENDANCE: (id) => `/api/students/${id}/attendance`,
    GRADES: (id) => `/api/students/${id}/grades`,
  },
  TEACHERS: {
    LIST: '/api/teachers',
    DETAILS: (id) => `/api/teachers/${id}`,
    CREATE: '/api/teachers',
    UPDATE: (id) => `/api/teachers/${id}`,
    DELETE: (id) => `/api/teachers/${id}`,
  },
  CLASSES: {
    LIST: '/api/classes',
    DETAILS: (id) => `/api/classes/${id}`,
    CREATE: '/api/classes',
    UPDATE: (id) => `/api/classes/${id}`,
    DELETE: (id) => `/api/classes/${id}`,
  },
};