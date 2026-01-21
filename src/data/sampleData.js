// Sample/Mock data for development and testing

export const SAMPLE_STUDENTS = [
  {
    id: 'student-001',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.j@school.edu',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '2008-03-15',
    gender: 'female',
    grade: '8th',
    classId: 'class-001',
    className: '8A',
    parentId: 'parent-001',
    address: '123 Main St, Springfield, IL 62701',
    emergencyContact: '+1 (555) 987-6543',
    enrollmentDate: '2020-09-01',
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    notes: 'Excellent in mathematics and science',
  },
  {
    id: 'student-002',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.c@school.edu',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '2007-11-22',
    gender: 'male',
    grade: '9th',
    classId: 'class-002',
    className: '9B',
    parentId: 'parent-002',
    address: '456 Oak Ave, Springfield, IL 62702',
    emergencyContact: '+1 (555) 876-5432',
    enrollmentDate: '2019-09-01',
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    notes: 'Great leadership skills, captain of debate team',
  },
  {
    id: 'student-003',
    firstName: 'Sophia',
    lastName: 'Rodriguez',
    email: 'sophia.r@school.edu',
    phone: '+1 (555) 345-6789',
    dateOfBirth: '2008-07-08',
    gender: 'female',
    grade: '8th',
    classId: 'class-001',
    className: '8A',
    parentId: 'parent-003',
    address: '789 Pine St, Springfield, IL 62703',
    emergencyContact: '+1 (555) 765-4321',
    enrollmentDate: '2020-09-01',
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    notes: 'Outstanding in arts and literature',
  },
];

export const SAMPLE_TEACHERS = [
  {
    id: 'teacher-001',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.w@school.edu',
    phone: '+1 (555) 456-7890',
    dateOfBirth: '1985-05-20',
    gender: 'female',
    department: 'Mathematics',
    subjects: ['Algebra', 'Geometry', 'Calculus'],
    hireDate: '2015-08-15',
    qualification: 'M.Sc. Mathematics',
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    address: '321 Elm St, Springfield, IL 62704',
    emergencyContact: '+1 (555) 654-3210',
    notes: 'Head of Mathematics Department',
  },
  {
    id: 'teacher-002',
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.m@school.edu',
    phone: '+1 (555) 567-8901',
    dateOfBirth: '1982-09-12',
    gender: 'male',
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    hireDate: '2012-08-20',
    qualification: 'Ph.D. Physics',
    status: 'active',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    address: '654 Maple Ave, Springfield, IL 62705',
    emergencyContact: '+1 (555) 543-2109',
    notes: 'Coordinates science fair every year',
  },
];

export const SAMPLE_CLASSES = [
  {
    id: 'class-001',
    name: '8A',
    grade: '8th',
    teacherId: 'teacher-001',
    teacherName: 'Sarah Williams',
    room: 'Room 201',
    capacity: 30,
    studentsCount: 25,
    subjects: ['Mathematics', 'English', 'Science', 'History'],
    schedule: 'Monday-Friday, 8:00 AM - 3:00 PM',
    status: 'active',
  },
  {
    id: 'class-002',
    name: '9B',
    grade: '9th',
    teacherId: 'teacher-002',
    teacherName: 'David Martinez',
    room: 'Room 205',
    capacity: 28,
    studentsCount: 22,
    subjects: ['Physics', 'Chemistry', 'English', 'Mathematics'],
    schedule: 'Monday-Friday, 8:00 AM - 3:00 PM',
    status: 'active',
  },
];

export const SAMPLE_PARENTS = [
  {
    id: 'parent-001',
    firstName: 'John',
    lastName: 'Johnson',
    email: 'john.j@email.com',
    phone: '+1 (555) 111-2233',
    relationship: 'Father',
    studentIds: ['student-001'],
    address: '123 Main St, Springfield, IL 62701',
    emergencyContact: '+1 (555) 333-4455',
    status: 'active',
  },
  {
    id: 'parent-002',
    firstName: 'Lisa',
    lastName: 'Chen',
    email: 'lisa.c@email.com',
    phone: '+1 (555) 222-3344',
    relationship: 'Mother',
    studentIds: ['student-002'],
    address: '456 Oak Ave, Springfield, IL 62702',
    emergencyContact: '+1 (555) 444-5566',
    status: 'active',
  },
];

export const SAMPLE_COURSES = [
  {
    id: 'course-001',
    name: 'Algebra I',
    code: 'MATH-101',
    description: 'Introduction to algebraic concepts and problem solving',
    teacherId: 'teacher-001',
    teacherName: 'Sarah Williams',
    grade: '8th',
    credits: 1,
    duration: 'Full Year',
    maxStudents: 30,
    enrolledStudents: 25,
    status: 'active',
  },
  {
    id: 'course-002',
    name: 'Physics I',
    code: 'PHYS-101',
    description: 'Fundamentals of physics including motion, forces, and energy',
    teacherId: 'teacher-002',
    teacherName: 'David Martinez',
    grade: '9th',
    credits: 1,
    duration: 'Full Year',
    maxStudents: 28,
    enrolledStudents: 22,
    status: 'active',
  },
];

export const SAMPLE_GRADES = [
  {
    id: 'grade-001',
    studentId: 'student-001',
    studentName: 'Emma Johnson',
    courseId: 'course-001',
    courseName: 'Algebra I',
    grade: 'A',
    score: 92,
    semester: 'Fall 2024',
    date: '2024-12-15',
    teacherId: 'teacher-001',
    teacherName: 'Sarah Williams',
    comments: 'Excellent work throughout the semester',
  },
  {
    id: 'grade-002',
    studentId: 'student-002',
    studentName: 'Michael Chen',
    courseId: 'course-002',
    courseName: 'Physics I',
    grade: 'A-',
    score: 89,
    semester: 'Fall 2024',
    date: '2024-12-15',
    teacherId: 'teacher-002',
    teacherName: 'David Martinez',
    comments: 'Strong understanding of concepts',
  },
];

export const SAMPLE_ATTENDANCE = [
  {
    id: 'attendance-001',
    studentId: 'student-001',
    studentName: 'Emma Johnson',
    classId: 'class-001',
    date: '2024-12-16',
    status: 'present',
    checkedBy: 'teacher-001',
    checkedByName: 'Sarah Williams',
    notes: '',
  },
  {
    id: 'attendance-002',
    studentId: 'student-002',
    studentName: 'Michael Chen',
    classId: 'class-002',
    date: '2024-12-16',
    status: 'absent',
    checkedBy: 'teacher-002',
    checkedByName: 'David Martinez',
    notes: 'Excused absence - medical appointment',
  },
];

export const SAMPLE_SCHEDULE = [
  {
    id: 'schedule-001',
    classId: 'class-001',
    className: '8A',
    teacherId: 'teacher-001',
    teacherName: 'Sarah Williams',
    courseId: 'course-001',
    courseName: 'Algebra I',
    day: 'Monday',
    startTime: '08:00',
    endTime: '09:00',
    room: 'Room 201',
  },
  {
    id: 'schedule-002',
    classId: 'class-002',
    className: '9B',
    teacherId: 'teacher-002',
    teacherName: 'David Martinez',
    courseId: 'course-002',
    courseName: 'Physics I',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '11:00',
    room: 'Room 205',
  },
];

export const SAMPLE_EVENTS = [
  {
    id: 'event-001',
    title: 'Parent-Teacher Conference',
    description: 'Annual parent-teacher meeting to discuss student progress',
    date: '2024-12-20',
    time: '14:00',
    location: 'School Auditorium',
    type: 'conference',
    status: 'scheduled',
    createdBy: 'admin-001',
  },
  {
    id: 'event-002',
    title: 'Science Fair',
    description: 'Annual science fair showcasing student projects',
    date: '2025-01-15',
    time: '09:00',
    location: 'School Gymnasium',
    type: 'event',
    status: 'scheduled',
    createdBy: 'teacher-002',
  },
];

export const SAMPLE_NOTIFICATIONS = [
  {
    id: 'notif-001',
    title: 'New Grade Posted',
    message: 'A new grade has been posted for Algebra I',
    type: 'grade',
    recipientId: 'student-001',
    recipientType: 'student',
    isRead: false,
    createdAt: '2024-12-16T10:30:00Z',
  },
  {
    id: 'notif-002',
    title: 'Upcoming Event',
    message: 'Parent-Teacher Conference scheduled for Dec 20th',
    type: 'event',
    recipientId: 'parent-001',
    recipientType: 'parent',
    isRead: false,
    createdAt: '2024-12-16T09:00:00Z',
  },
];

// Mock API response helper
export const mockApiResponse = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
        message: 'Data fetched successfully',
        timestamp: new Date().toISOString(),
      });
    }, delay);
  });
};

// Mock API error helper
export const mockApiError = (message = 'An error occurred', delay = 500) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject({
        success: false,
        error: {
          message,
          code: 'API_ERROR',
        },
        timestamp: new Date().toISOString(),
      });
    }, delay);
  });
};