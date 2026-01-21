// Role-based access control constants

export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent',
  STUDENT: 'student',
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    canManageStudents: true,
    canManageTeachers: true,
    canManageParents: true,
    canManageClasses: true,
    canManageCourses: true,
    canManageGrades: true,
    canManageAttendance: true,
    canManageSchedule: true,
    canManageFinance: true,
    canManageLibrary: true,
    canManageTransport: true,
    canManageCommunication: true,
    canManageSettings: true,
    canViewReports: true,
    canManageUsers: true,
    canViewAllData: true,
    canEditAllData: true,
    canDeleteAllData: true,
  },
  [USER_ROLES.TEACHER]: {
    canManageStudents: true,
    canManageTeachers: false,
    canManageParents: false,
    canManageClasses: false,
    canManageCourses: false,
    canManageGrades: true,
    canManageAttendance: true,
    canManageSchedule: true,
    canManageFinance: false,
    canManageLibrary: true,
    canManageTransport: false,
    canManageCommunication: true,
    canManageSettings: false,
    canViewReports: true,
    canManageUsers: false,
    canViewAllData: false,
    canEditAllData: false,
    canDeleteAllData: false,
  },
  [USER_ROLES.PARENT]: {
    canManageStudents: false,
    canManageTeachers: false,
    canManageParents: false,
    canManageClasses: false,
    canManageCourses: false,
    canManageGrades: false,
    canManageAttendance: false,
    canManageSchedule: false,
    canManageFinance: true,
    canManageLibrary: false,
    canManageTransport: true,
    canManageCommunication: true,
    canManageSettings: false,
    canViewReports: true,
    canManageUsers: false,
    canViewAllData: false,
    canEditAllData: false,
    canDeleteAllData: false,
  },
  [USER_ROLES.STUDENT]: {
    canManageStudents: false,
    canManageTeachers: false,
    canManageParents: false,
    canManageClasses: false,
    canManageCourses: false,
    canManageGrades: false,
    canManageAttendance: false,
    canManageSchedule: false,
    canManageFinance: false,
    canManageLibrary: true,
    canManageTransport: false,
    canManageCommunication: false,
    canManageSettings: false,
    canViewReports: true,
    canManageUsers: false,
    canViewAllData: false,
    canEditAllData: false,
    canDeleteAllData: false,
  },
};

export const SIDEBAR_NAVIGATION_BY_ROLE = {
  [USER_ROLES.ADMIN]: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { id: 'students', label: 'Students', icon: 'GraduationCap', path: '/students' },
    { id: 'teachers', label: 'Teachers', icon: 'Users', path: '/teachers' },
    { id: 'parents', label: 'Parents', icon: 'UserCircle', path: '/parents' },
    { id: 'classes', label: 'Classes', icon: 'School', path: '/classes' },
    { id: 'courses', label: 'Courses', icon: 'BookOpen', path: '/courses' },
    { id: 'grades', label: 'Grades', icon: 'Award', path: '/grades' },
    { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck', path: '/attendance' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar', path: '/schedule' },
    { id: 'finance', label: 'Finance', icon: 'DollarSign', path: '/finance' },
    { id: 'library', label: 'Library', icon: 'Library', path: '/library' },
    { id: 'transport', label: 'Transport', icon: 'Bus', path: '/transport' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare', path: '/communication' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', path: '/reports' },
    { id: 'admin', label: 'Admin', icon: 'Shield', path: '/admin' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
  ],
  [USER_ROLES.TEACHER]: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { id: 'students', label: 'Students', icon: 'GraduationCap', path: '/students' },
    { id: 'classes', label: 'Classes', icon: 'School', path: '/classes' },
    { id: 'courses', label: 'Courses', icon: 'BookOpen', path: '/courses' },
    { id: 'grades', label: 'Grades', icon: 'Award', path: '/grades' },
    { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck', path: '/attendance' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar', path: '/schedule' },
    { id: 'library', label: 'Library', icon: 'Library', path: '/library' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare', path: '/communication' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
  ],
  [USER_ROLES.PARENT]: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { id: 'grades', label: 'Grades', icon: 'Award', path: '/grades' },
    { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck', path: '/attendance' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar', path: '/schedule' },
    { id: 'finance', label: 'Finance', icon: 'DollarSign', path: '/finance' },
    { id: 'transport', label: 'Transport', icon: 'Bus', path: '/transport' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare', path: '/communication' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
  ],
  [USER_ROLES.STUDENT]: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { id: 'grades', label: 'Grades', icon: 'Award', path: '/grades' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar', path: '/schedule' },
    { id: 'library', label: 'Library', icon: 'Library', path: '/library' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3', path: '/reports' },
    { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
  ],
};

// Route permissions
export const ROUTE_PERMISSIONS = {
  '/students': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  '/students/create': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  '/students/[id]': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  '/students/[id]/edit': [USER_ROLES.ADMIN],
  
  '/teachers': [USER_ROLES.ADMIN],
  '/teachers/create': [USER_ROLES.ADMIN],
  '/teachers/[id]': [USER_ROLES.ADMIN],
  '/teachers/[id]/edit': [USER_ROLES.ADMIN],
  
  '/parents': [USER_ROLES.ADMIN],
  '/parents/create': [USER_ROLES.ADMIN],
  '/parents/[id]': [USER_ROLES.ADMIN],
  
  '/classes': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  '/classes/create': [USER_ROLES.ADMIN],
  '/classes/[id]': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  '/classes/[id]/edit': [USER_ROLES.ADMIN],
  
  '/courses': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  '/courses/create': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  
  '/grades': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  '/grades/create': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  '/grades/[id]': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  
  '/attendance': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT],
  '/attendance/create': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  
  '/schedule': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  '/schedule/create': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  
  '/finance': [USER_ROLES.ADMIN, USER_ROLES.PARENT],
  '/finance/fees': [USER_ROLES.ADMIN, USER_ROLES.PARENT],
  '/finance/salaries': [USER_ROLES.ADMIN],
  '/finance/expenses': [USER_ROLES.ADMIN],
  
  '/library': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.STUDENT],
  '/library/books': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.STUDENT],
  
  '/transport': [USER_ROLES.ADMIN, USER_ROLES.PARENT],
  '/transport/buses': [USER_ROLES.ADMIN, USER_ROLES.PARENT],
  '/transport/routes': [USER_ROLES.ADMIN, USER_ROLES.PARENT],
  
  '/communication': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT],
  
  '/reports': [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  
  '/admin': [USER_ROLES.ADMIN],
  '/admin/users': [USER_ROLES.ADMIN],
  '/admin/users/create': [USER_ROLES.ADMIN],
  '/admin/roles': [USER_ROLES.ADMIN],
  '/admin/permissions': [USER_ROLES.ADMIN],
  '/admin/logs': [USER_ROLES.ADMIN],
  '/admin/backup': [USER_ROLES.ADMIN],
  
  '/settings': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  '/settings/profile': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  '/settings/account': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  '/settings/notifications': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  '/settings/security': [USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.STUDENT],
  '/settings/system': [USER_ROLES.ADMIN],
};

export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions ? permissions[permission] : false;
};

export const canAccessRoute = (userRole, route) => {
  if (!userRole || !route) return false;
  const allowedRoles = ROUTE_PERMISSIONS[route];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
};