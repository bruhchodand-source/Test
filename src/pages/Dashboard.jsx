import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, GraduationCap, UserCircle, School, BookOpen, Award,
  TrendingUp, Calendar, Bell, Activity, Clock, Target, CalendarCheck
} from 'lucide-react';
import { useApp } from '@context/AppContext';
import { useDocumentTitle } from '@hooks/useLocalStorage';
import { ROUTES } from '@constants/routes';
import { SAMPLE_STUDENTS, SAMPLE_TEACHERS, SAMPLE_CLASSES } from '@data/sampleData';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="glass-card p-6 hover-lift">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-text-muted">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <div className="flex items-center mt-2">
          <TrendingUp className={`w-4 h-4 mr-1 ${change > 0 ? 'text-accent-emerald' : 'text-red-400'}`} />
          <span className={`text-xs ${change > 0 ? 'text-accent-emerald' : 'text-red-400'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-xs text-text-muted ml-2">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const RecentActivityItem = ({ icon: Icon, title, description, time, color }) => (
  <div className="flex items-start gap-3 p-3 hover:bg-dark-800 rounded-lg transition-colors">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-text-muted">{description}</p>
    </div>
    <span className="text-xs text-text-muted">{time}</span>
  </div>
);

const Dashboard = () => {
  useDocumentTitle('Dashboard');
  const { students, teachers, classes, initializeData } = useApp();

  useEffect(() => {
    // Initialize with sample data if not already loaded
    if (students.length === 0) {
      initializeData();
    }
  }, [students.length, initializeData]);

  const stats = [
    {
      title: 'Total Students',
      value: students.length || SAMPLE_STUDENTS.length,
      change: 12.5,
      icon: GraduationCap,
      color: 'bg-primary',
    },
    {
      title: 'Total Teachers',
      value: teachers.length || SAMPLE_TEACHERS.length,
      change: 8.2,
      icon: Users,
      color: 'bg-secondary',
    },
    {
      title: 'Active Classes',
      value: classes.length || SAMPLE_CLASSES.length,
      change: 3.1,
      icon: School,
      color: 'bg-accent-emerald',
    },
    {
      title: 'Courses Offered',
      value: 24,
      change: 5.7,
      icon: BookOpen,
      color: 'bg-accent-cyan',
    },
  ];

  const recentActivities = [
    {
      icon: Award,
      title: 'New Grade Posted',
      description: 'Emma Johnson received A in Mathematics',
      time: '2h ago',
      color: 'bg-primary',
    },
    {
      icon: Users,
      title: 'New Student Enrolled',
      description: 'Michael Chen joined Grade 9B',
      time: '4h ago',
      color: 'bg-secondary',
    },
    {
      icon: Calendar,
      title: 'Event Scheduled',
      description: 'Parent-Teacher Conference on Dec 20th',
      time: '6h ago',
      color: 'bg-accent-emerald',
    },
    {
      icon: Bell,
      title: 'Announcement',
      description: 'Winter break starts from Dec 23rd',
      time: '8h ago',
      color: 'bg-accent-cyan',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Science Fair',
      date: 'Tomorrow',
      time: '09:00 AM',
      type: 'academic',
    },
    {
      title: 'Math Competition',
      date: 'Dec 18',
      time: '10:00 AM',
      type: 'academic',
    },
    {
      title: 'Sports Day',
      date: 'Dec 22',
      time: '08:00 AM',
      type: 'sports',
    },
  ];

  const quickActions = [
    { title: 'Add Student', icon: GraduationCap, path: ROUTES.STUDENT_CREATE, color: 'bg-primary' },
    { title: 'Add Teacher', icon: Users, path: ROUTES.TEACHER_CREATE, color: 'bg-secondary' },
    { title: 'Create Class', icon: School, path: ROUTES.CLASS_CREATE, color: 'bg-accent-emerald' },
    { title: 'Take Attendance', icon: CalendarCheck, path: ROUTES.ATTENDANCE_CREATE, color: 'bg-accent-cyan' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="section-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, <span className="text-gradient">{currentUser?.name || 'Admin'}</span>!
            </h2>
            <p className="text-text-muted mt-1">Here's what's happening at your school today.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-text-muted" />
            <span className="text-text-muted">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid-responsive">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="section-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
          <Activity className="w-5 h-5 text-accent-cyan" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="glass-card p-4 hover-lift transition-all duration-200 group"
              >
                <div className={`${action.color} bg-opacity-10 p-3 rounded-lg w-fit group-hover:bg-opacity-20 transition-colors`}>
                  <IconComponent className={`w-6 h-6 ${action.color.replace('bg-', 'text-')}`} />
                </div>
                <p className="mt-3 font-medium text-sm">{action.title}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="section-card">
          <div className="flex items-center justify-between mb-4 page-header">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Bell className="w-5 h-5 text-accent-emerald" />
          </div>
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <RecentActivityItem key={index} {...activity} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              to={ROUTES.COMMUNICATION}
              className="text-sm text-primary hover:text-primary-light transition-colors"
            >
              View all activities →
            </Link>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="section-card">
          <div className="flex items-center justify-between mb-4 page-header">
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
            <Calendar className="w-5 h-5 text-accent-cyan" />
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 hover:bg-dark-800 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg ${
                  event.type === 'academic' ? 'bg-primary text-white' : 
                  event.type === 'sports' ? 'bg-accent-emerald text-white' : 
                  'bg-secondary text-white'
                }`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-text-muted">{event.date} • {event.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              to={ROUTES.SCHEDULE}
              className="text-sm text-primary hover:text-primary-light transition-colors"
            >
              View calendar →
            </Link>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="section-card">
        <div className="flex items-center justify-between mb-4 page-header">
          <h3 className="text-lg font-semibold">System Status</h3>
          <Target className="w-5 h-5 text-secondary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">Database</span>
              <span className="px-2 py-1 bg-accent-emerald bg-opacity-20 text-accent-emerald rounded-full text-xs font-medium">Healthy</span>
            </div>
            <p className="text-xs text-text-muted">Last backup: 2 hours ago</p>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">System</span>
              <span className="px-2 py-1 bg-accent-emerald bg-opacity-20 text-accent-emerald rounded-full text-xs font-medium">Online</span>
            </div>
            <p className="text-xs text-text-muted">Uptime: 99.9%</p>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-muted">Security</span>
              <span className="px-2 py-1 bg-accent-emerald bg-opacity-20 text-accent-emerald rounded-full text-xs font-medium">Secure</span>
            </div>
            <p className="text-xs text-text-muted">SSL active</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-dark-700">
        <p className="text-sm text-text-muted">
          © 2024 School Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;