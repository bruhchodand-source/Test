import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout';
import { AppProvider } from '@context/AppContext';
import Dashboard from '@pages/Dashboard';
import Students from '@pages/Students';
import StudentForm from '@components/forms/StudentForm';
import { ROUTES } from '@constants/routes';

// Public routes (no auth required)
const PublicRoutes = {
  path: '/login',
  element: <div>Login Page</div>, // Will be implemented later
};

// Protected routes (require auth)
const ProtectedRoutes = {
  path: '/',
  element: <AppProvider><MainLayout /></AppProvider>,
  children: [
    // Redirect root to dashboard
    {
      index: true,
      element: <Navigate to={ROUTES.DASHBOARD} replace />,
    },
    
    // Dashboard
    {
      path: ROUTES.DASHBOARD.replace('/', ''),
      element: <Dashboard />,
    },
    
    // Students
    {
      path: ROUTES.STUDENTS.replace('/', ''),
      element: <Students />,
    },
    {
      path: ROUTES.STUDENT_CREATE.replace('/', ''),
      element: <StudentForm />,
    },
    {
      path: ROUTES.STUDENT_DETAILS.replace('/:id', ''),
      children: [
        {
          path: '',
          element: <div>Student Details</div>, // Will be implemented
        },
        {
          path: 'edit',
          element: <StudentForm />,
        },
      ],
    },
    
    // Teachers
    {
      path: ROUTES.TEACHERS.replace('/', ''),
      element: <div>Teachers Page</div>, // Will be implemented
    },
    {
      path: ROUTES.TEACHER_CREATE.replace('/', ''),
      element: <div>Create Teacher</div>, // Will be implemented
    },
    {
      path: ROUTES.TEACHER_DETAILS.replace('/:id', ''),
      children: [
        {
          path: '',
          element: <div>Teacher Details</div>, // Will be implemented
        },
        {
          path: 'edit',
          element: <div>Edit Teacher</div>, // Will be implemented
        },
      ],
    },
    
    // Classes
    {
      path: ROUTES.CLASSES.replace('/', ''),
      element: <div>Classes Page</div>, // Will be implemented
    },
    {
      path: ROUTES.CLASS_CREATE.replace('/', ''),
      element: <div>Create Class</div>, // Will be implemented
    },
    {
      path: ROUTES.CLASS_DETAILS.replace('/:id', ''),
      children: [
        {
          path: '',
          element: <div>Class Details</div>, // Will be implemented
        },
        {
          path: 'edit',
          element: <div>Edit Class</div>, // Will be implemented
        },
      ],
    },
    
    // Parents
    {
      path: ROUTES.PARENTS.replace('/', ''),
      element: <div>Parents Page</div>, // Will be implemented
    },
    {
      path: ROUTES.PARENT_CREATE.replace('/', ''),
      element: <div>Create Parent</div>, // Will be implemented
    },
    {
      path: ROUTES.PARENT_DETAILS.replace('/:id', ''),
      element: <div>Parent Details</div>, // Will be implemented
    },
    
    // Courses
    {
      path: ROUTES.COURSES.replace('/', ''),
      element: <div>Courses Page</div>, // Will be implemented
    },
    {
      path: ROUTES.COURSE_CREATE.replace('/', ''),
      element: <div>Create Course</div>, // Will be implemented
    },
    {
      path: ROUTES.COURSE_DETAILS.replace('/:id', ''),
      element: <div>Course Details</div>, // Will be implemented
    },
    
    // Grades
    {
      path: ROUTES.GRADES.replace('/', ''),
      element: <div>Grades Page</div>, // Will be implemented
    },
    {
      path: ROUTES.GRADE_CREATE.replace('/', ''),
      element: <div>Create Grade</div>, // Will be implemented
    },
    
    // Attendance
    {
      path: ROUTES.ATTENDANCE.replace('/', ''),
      element: <div>Attendance Page</div>, // Will be implemented
    },
    {
      path: ROUTES.ATTENDANCE_CREATE.replace('/', ''),
      element: <div>Create Attendance</div>, // Will be implemented
    },
    
    // Schedule
    {
      path: ROUTES.SCHEDULE.replace('/', ''),
      element: <div>Schedule Page</div>, // Will be implemented
    },
    {
      path: ROUTES.SCHEDULE_CREATE.replace('/', ''),
      element: <div>Create Schedule</div>, // Will be implemented
    },
    
    // Finance
    {
      path: ROUTES.FINANCE.replace('/', ''),
      element: <div>Finance Page</div>, // Will be implemented
    },
    {
      path: 'finance/*',
      children: [
        {
          path: 'fees',
          element: <div>Fees Page</div>, // Will be implemented
        },
        {
          path: 'salaries',
          element: <div>Salaries Page</div>, // Will be implemented
        },
        {
          path: 'expenses',
          element: <div>Expenses Page</div>, // Will be implemented
        },
        {
          path: 'reports',
          element: <div>Finance Reports</div>, // Will be implemented
        },
      ],
    },
    
    // Library
    {
      path: ROUTES.LIBRARY.replace('/', ''),
      element: <div>Library Page</div>, // Will be implemented
    },
    {
      path: 'library/*',
      children: [
        {
          path: 'books',
          element: <div>Books Page</div>, // Will be implemented
        },
        {
          path: 'books/create',
          element: <div>Create Book</div>, // Will be implemented
        },
        {
          path: 'borrowed',
          element: <div>Borrowed Books</div>, // Will be implemented
        },
      ],
    },
    
    // Transport
    {
      path: ROUTES.TRANSPORT.replace('/', ''),
      element: <div>Transport Page</div>, // Will be implemented
    },
    {
      path: 'transport/*',
      children: [
        {
          path: 'buses',
          element: <div>Buses Page</div>, // Will be implemented
        },
        {
          path: 'routes',
          element: <div>Routes Page</div>, // Will be implemented
        },
      ],
    },
    
    // Communication
    {
      path: ROUTES.COMMUNICATION.replace('/', ''),
      element: <div>Communication Page</div>, // Will be implemented
    },
    {
      path: 'communication/*',
      children: [
        {
          path: 'announcements',
          element: <div>Announcements</div>, // Will be implemented
        },
        {
          path: 'announcements/create',
          element: <div>Create Announcement</div>, // Will be implemented
        },
        {
          path: 'messages',
          element: <div>Messages</div>, // Will be implemented
        },
      ],
    },
    
    // Reports
    {
      path: ROUTES.REPORTS.replace('/', ''),
      element: <div>Reports Page</div>, // Will be implemented
    },
    {
      path: 'reports/*',
      children: [
        {
          path: 'students',
          element: <div>Student Reports</div>, // Will be implemented
        },
        {
          path: 'teachers',
          element: <div>Teacher Reports</div>, // Will be implemented
        },
        {
          path: 'finance',
          element: <div>Finance Reports</div>, // Will be implemented
        },
      ],
    },
    
    // Admin
    {
      path: ROUTES.ADMIN.replace('/', ''),
      element: <div>Admin Dashboard</div>, // Will be implemented
    },
    {
      path: 'admin/*',
      children: [
        {
          path: 'users',
          element: <div>User Management</div>, // Will be implemented
        },
        {
          path: 'users/create',
          element: <div>Create User</div>, // Will be implemented
        },
        {
          path: 'roles',
          element: <div>Role Management</div>, // Will be implemented
        },
        {
          path: 'permissions',
          element: <div>Permission Management</div>, // Will be implemented
        },
        {
          path: 'logs',
          element: <div>System Logs</div>, // Will be implemented
        },
        {
          path: 'backup',
          element: <div>Backup & Restore</div>, // Will be implemented
        },
      ],
    },
    
    // Settings
    {
      path: ROUTES.SETTINGS.replace('/', ''),
      element: <div>Settings Page</div>, // Will be implemented
      children: [
        {
          index: true,
          element: <Navigate to="profile" replace />,
        },
        {
          path: 'profile',
          element: <div>Profile Settings</div>, // Will be implemented
        },
        {
          path: 'account',
          element: <div>Account Settings</div>, // Will be implemented
        },
        {
          path: 'notifications',
          element: <div>Notification Settings</div>, // Will be implemented
        },
        {
          path: 'security',
          element: <div>Security Settings</div>, // Will be implemented
        },
        {
          path: 'system',
          element: <div>System Settings</div>, // Will be implemented
        },
      ],
    },
    
    // Error pages
    {
      path: 'unauthorized',
      element: <div>401 - Unauthorized</div>,
    },
    {
      path: 'forbidden',
      element: <div>403 - Forbidden</div>,
    },
    {
      path: '500',
      element: <div>500 - Server Error</div>,
    },
    
    // Catch all - 404
    {
      path: '*',
      element: <div>404 - Page Not Found</div>,
    },
  ],
};

// Combine all routes
const router = createBrowserRouter([
  PublicRoutes,
  ProtectedRoutes,
]);

export default router;