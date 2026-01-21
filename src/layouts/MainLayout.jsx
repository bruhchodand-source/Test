import { useState, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Menu, X, 
  Home, Users, GraduationCap, UserCircle, School,
  BookOpen, Award, CalendarCheck, Calendar, DollarSign,
  Library, Bus, MessageSquare, BarChart3, Shield, Settings,
  Bell, Search, User, ChevronDown, LogOut
} from 'lucide-react';
import { useApp } from '@context/AppContext';
import { SIDEBAR_NAVIGATION_BY_ROLE, USER_ROLES } from '@constants/roles';
import { ROUTES } from '@constants/routes';

// Icon mapping for sidebar
const ICON_MAP = {
  LayoutDashboard: Home,
  GraduationCap: GraduationCap,
  Users: Users,
  UserCircle: UserCircle,
  School: School,
  BookOpen: BookOpen,
  Award: Award,
  CalendarCheck: CalendarCheck,
  Calendar: Calendar,
  DollarSign: DollarSign,
  Library: Library,
  Bus: Bus,
  MessageSquare: MessageSquare,
  BarChart3: BarChart3,
  Shield: Shield,
  Settings: Settings,
};

export const MainLayout = () => {
  const location = useLocation();
  const { currentUser, sidebarOpen: sidebarOpenState, notifications, markNotificationAsRead } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const userRole = currentUser?.role || USER_ROLES.ADMIN;
  const sidebarItems = SIDEBAR_NAVIGATION_BY_ROLE[userRole] || [];
  
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(prev => !prev);
  }, []);

  const toggleProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(prev => !prev);
  }, []);

  const handleNotificationClick = useCallback((notificationId) => {
    markNotificationAsRead(notificationId);
  }, [markNotificationAsRead]);

  const getPageTitle = useCallback(() => {
    const path = location.pathname;
    
    // Special cases for dynamic routes
    if (path.includes('/students/') && path.includes('/edit')) return 'Edit Student';
    if (path.includes('/students/')) return 'Student Details';
    if (path === '/students/create') return 'Create Student';
    
    if (path.includes('/teachers/') && path.includes('/edit')) return 'Edit Teacher';
    if (path.includes('/teachers/')) return 'Teacher Details';
    if (path === '/teachers/create') return 'Create Teacher';
    
    if (path.includes('/classes/') && path.includes('/edit')) return 'Edit Class';
    if (path.includes('/classes/')) return 'Class Details';
    if (path === '/classes/create') return 'Create Class';
    
    // Standard routes
    const routeTitles = {
      [ROUTES.DASHBOARD]: 'Dashboard',
      [ROUTES.STUDENTS]: 'Students',
      [ROUTES.TEACHERS]: 'Teachers',
      [ROUTES.PARENTS]: 'Parents',
      [ROUTES.CLASSES]: 'Classes',
      [ROUTES.COURSES]: 'Courses',
      [ROUTES.GRADES]: 'Grades',
      [ROUTES.ATTENDANCE]: 'Attendance',
      [ROUTES.SCHEDULE]: 'Schedule',
      [ROUTES.FINANCE]: 'Finance',
      [ROUTES.LIBRARY]: 'Library',
      [ROUTES.TRANSPORT]: 'Transport',
      [ROUTES.COMMUNICATION]: 'Communication',
      [ROUTES.REPORTS]: 'Reports',
      [ROUTES.SETTINGS]: 'Settings',
      [ROUTES.ADMIN]: 'Admin Panel',
    };

    return routeTitles[path] || 'School Management';
  }, [location.pathname]);

  const ActiveIcon = ({ iconName, className }) => {
    const IconComponent = ICON_MAP[iconName] || Home;
    return <IconComponent className={className} />;
  };

  return (
    <div className="min-h-screen bg-dark-900 text-text-primary">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-dark-800 border-b border-dark-700 z-30">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left side - Mobile menu button and search */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMobileSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="hidden md:flex items-center bg-dark-700 rounded-lg px-3 py-2 w-64">
              <Search className="w-4 h-4 text-text-muted mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm flex-1 placeholder-text-muted"
              />
            </div>
          </div>

          {/* Middle - Page title */}
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>

          {/* Right side - Notifications and profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-dark-700 transition-colors relative">
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  {currentUser?.name || 'Admin User'}
                </span>
                <ChevronDown className="w-4 h-4 hidden md:block" />
              </button>

              {/* Dropdown menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to={ROUTES.SETTINGS_PROFILE}
                    className="block px-4 py-2 text-sm hover:bg-dark-700 transition-colors"
                    onClick={toggleProfileDropdown}
                  >
                    Profile
                  </Link>
                  <Link
                    to={ROUTES.SETTINGS_ACCOUNT}
                    className="block px-4 py-2 text-sm hover:bg-dark-700 transition-colors"
                    onClick={toggleProfileDropdown}
                  >
                    Account Settings
                  </Link>
                  <div className="border-t border-dark-700 my-2"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-dark-700 transition-colors text-red-400">
                    <LogOut className="inline w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 bottom-0 w-64 bg-dark-800 border-r border-dark-700 
        transition-transform duration-300 z-20 overflow-y-auto
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <nav className="p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const IconComponent = ICON_MAP[item.icon] || Home;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                      ${isActive 
                        ? 'bg-primary text-white' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                      }
                    `}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
          <div className="flex items-center gap-3 p-3 glass-card">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {currentUser?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser?.name}</p>
              <p className="text-xs text-text-muted capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-16 lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};