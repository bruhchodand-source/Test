import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import { SAMPLE_STUDENTS, SAMPLE_TEACHERS, SAMPLE_CLASSES, SAMPLE_PARENTS } from '@data/sampleData';

// ==================== TYPES ====================

const APP_ACTIONS = {
  // Students
  SET_STUDENTS: 'SET_STUDENTS',
  ADD_STUDENT: 'ADD_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  
  // Teachers
  SET_TEACHERS: 'SET_TEACHERS',
  ADD_TEACHER: 'ADD_TEACHER',
  UPDATE_TEACHER: 'UPDATE_TEACHER',
  DELETE_TEACHER: 'DELETE_TEACHER',
  
  // Classes
  SET_CLASSES: 'SET_CLASSES',
  ADD_CLASS: 'ADD_CLASS',
  UPDATE_CLASS: 'UPDATE_CLASS',
  DELETE_CLASS: 'DELETE_CLASS',
  
  // Parents
  SET_PARENTS: 'SET_PARENTS',
  ADD_PARENT: 'ADD_PARENT',
  UPDATE_PARENT: 'UPDATE_PARENT',
  DELETE_PARENT: 'DELETE_PARENT',
  
  // UI State
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  
  // Notifications
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  MARK_NOTIFICATION_AS_READ: 'MARK_NOTIFICATION_AS_READ',
};

// ==================== INITIAL STATE ====================

const initialState = {
  // Data
  students: [],
  teachers: [],
  classes: [],
  parents: [],
  courses: [],
  grades: [],
  attendance: [],
  schedule: [],
  events: [],
  notifications: [],
  
  // UI State
  loading: false,
  error: null,
  success: null,
  sidebarOpen: true,
  
  // Auth (will be replaced with proper auth later)
  currentUser: {
    id: 'user-001',
    name: 'Admin User',
    email: 'admin@school.edu',
    role: 'admin',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
};

// ==================== REDUCER ====================

const appReducer = (state, action) => {
  switch (action.type) {
    // Students
    case APP_ACTIONS.SET_STUDENTS:
      return { ...state, students: action.payload };
    
    case APP_ACTIONS.ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    
    case APP_ACTIONS.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? { ...student, ...action.payload } : student
        ),
      };
    
    case APP_ACTIONS.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload),
      };
    
    // Teachers
    case APP_ACTIONS.SET_TEACHERS:
      return { ...state, teachers: action.payload };
    
    case APP_ACTIONS.ADD_TEACHER:
      return { ...state, teachers: [...state.teachers, action.payload] };
    
    case APP_ACTIONS.UPDATE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.map(teacher =>
          teacher.id === action.payload.id ? { ...teacher, ...action.payload } : teacher
        ),
      };
    
    case APP_ACTIONS.DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(teacher => teacher.id !== action.payload),
      };
    
    // Classes
    case APP_ACTIONS.SET_CLASSES:
      return { ...state, classes: action.payload };
    
    case APP_ACTIONS.ADD_CLASS:
      return { ...state, classes: [...state.classes, action.payload] };
    
    case APP_ACTIONS.UPDATE_CLASS:
      return {
        ...state,
        classes: state.classes.map(cls =>
          cls.id === action.payload.id ? { ...cls, ...action.payload } : cls
        ),
      };
    
    case APP_ACTIONS.DELETE_CLASS:
      return {
        ...state,
        classes: state.classes.filter(cls => cls.id !== action.payload),
      };
    
    // Parents
    case APP_ACTIONS.SET_PARENTS:
      return { ...state, parents: action.payload };
    
    case APP_ACTIONS.ADD_PARENT:
      return { ...state, parents: [...state.parents, action.payload] };
    
    case APP_ACTIONS.UPDATE_PARENT:
      return {
        ...state,
        parents: state.parents.map(parent =>
          parent.id === action.payload.id ? { ...parent, ...action.payload } : parent
        ),
      };
    
    case APP_ACTIONS.DELETE_PARENT:
      return {
        ...state,
        parents: state.parents.filter(parent => parent.id !== action.payload),
      };
    
    // UI State
    case APP_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case APP_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, success: null };
    
    case APP_ACTIONS.SET_SUCCESS:
      return { ...state, success: action.payload, error: null };
    
    case APP_ACTIONS.CLEAR_MESSAGES:
      return { ...state, error: null, success: null };
    
    // Notifications
    case APP_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now().toString() }],
      };
    
    case APP_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    
    case APP_ACTIONS.MARK_NOTIFICATION_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, isRead: true } : n
        ),
      };
    
    default:
      return state;
  }
};

// ==================== CONTEXT ====================

const AppContext = createContext(null);

// ==================== PROVIDER ====================

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ==================== ACTIONS ====================

  // Students
  const setStudents = useCallback((students) => {
    dispatch({ type: APP_ACTIONS.SET_STUDENTS, payload: students });
  }, []);

  const addStudent = useCallback((student) => {
    dispatch({ type: APP_ACTIONS.ADD_STUDENT, payload: student });
  }, []);

  const updateStudent = useCallback((student) => {
    dispatch({ type: APP_ACTIONS.UPDATE_STUDENT, payload: student });
  }, []);

  const deleteStudent = useCallback((studentId) => {
    dispatch({ type: APP_ACTIONS.DELETE_STUDENT, payload: studentId });
  }, []);

  const getStudentById = useCallback((studentId) => {
    return state.students.find(student => student.id === studentId);
  }, [state.students]);

  const getStudentsByClass = useCallback((classId) => {
    return state.students.filter(student => student.classId === classId);
  }, [state.students]);

  // Teachers
  const setTeachers = useCallback((teachers) => {
    dispatch({ type: APP_ACTIONS.SET_TEACHERS, payload: teachers });
  }, []);

  const addTeacher = useCallback((teacher) => {
    dispatch({ type: APP_ACTIONS.ADD_TEACHER, payload: teacher });
  }, []);

  const updateTeacher = useCallback((teacher) => {
    dispatch({ type: APP_ACTIONS.UPDATE_TEACHER, payload: teacher });
  }, []);

  const deleteTeacher = useCallback((teacherId) => {
    dispatch({ type: APP_ACTIONS.DELETE_TEACHER, payload: teacherId });
  }, []);

  const getTeacherById = useCallback((teacherId) => {
    return state.teachers.find(teacher => teacher.id === teacherId);
  }, [state.teachers]);

  // Classes
  const setClasses = useCallback((classes) => {
    dispatch({ type: APP_ACTIONS.SET_CLASSES, payload: classes });
  }, []);

  const addClass = useCallback((cls) => {
    dispatch({ type: APP_ACTIONS.ADD_CLASS, payload: cls });
  }, []);

  const updateClass = useCallback((cls) => {
    dispatch({ type: APP_ACTIONS.UPDATE_CLASS, payload: cls });
  }, []);

  const deleteClass = useCallback((classId) => {
    dispatch({ type: APP_ACTIONS.DELETE_CLASS, payload: classId });
  }, []);

  const getClassById = useCallback((classId) => {
    return state.classes.find(cls => cls.id === classId);
  }, [state.classes]);

  // Parents
  const setParents = useCallback((parents) => {
    dispatch({ type: APP_ACTIONS.SET_PARENTS, payload: parents });
  }, []);

  const addParent = useCallback((parent) => {
    dispatch({ type: APP_ACTIONS.ADD_PARENT, payload: parent });
  }, []);

  const updateParent = useCallback((parent) => {
    dispatch({ type: APP_ACTIONS.UPDATE_PARENT, payload: parent });
  }, []);

  const deleteParent = useCallback((parentId) => {
    dispatch({ type: APP_ACTIONS.DELETE_PARENT, payload: parentId });
  }, []);

  const getParentById = useCallback((parentId) => {
    return state.parents.find(parent => parent.id === parentId);
  }, [state.parents]);

  // UI State
  const setLoading = useCallback((loading) => {
    dispatch({ type: APP_ACTIONS.SET_LOADING, payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: APP_ACTIONS.SET_ERROR, payload: error });
    
    // Auto-clear error after 5 seconds
    setTimeout(() => {
      dispatch({ type: APP_ACTIONS.CLEAR_MESSAGES });
    }, 5000);
  }, []);

  const setSuccess = useCallback((success) => {
    dispatch({ type: APP_ACTIONS.SET_SUCCESS, payload: success });
    
    // Auto-clear success after 3 seconds
    setTimeout(() => {
      dispatch({ type: APP_ACTIONS.CLEAR_MESSAGES });
    }, 3000);
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: APP_ACTIONS.CLEAR_MESSAGES });
  }, []);

  // Notifications
  const addNotification = useCallback((notification) => {
    dispatch({ type: APP_ACTIONS.ADD_NOTIFICATION, payload: notification });
  }, []);

  const removeNotification = useCallback((notificationId) => {
    dispatch({ type: APP_ACTIONS.REMOVE_NOTIFICATION, payload: notificationId });
  }, []);

  const markNotificationAsRead = useCallback((notificationId) => {
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_AS_READ, payload: notificationId });
  }, []);

  // ==================== API SIMULATION ====================

  // Simulate loading initial data
  const initializeData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStudents(SAMPLE_STUDENTS);
      setTeachers(SAMPLE_TEACHERS);
      setClasses(SAMPLE_CLASSES);
      setParents(SAMPLE_PARENTS);
      
      setSuccess('Data loaded successfully');
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [setStudents, setTeachers, setClasses, setParents, setLoading, setSuccess, setError]);

  // ==================== MEMOIZED VALUES ====================

  const value = useMemo(() => ({
    // State
    ...state,
    
    // Student actions
    setStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    getStudentsByClass,
    
    // Teacher actions
    setTeachers,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getTeacherById,
    
    // Class actions
    setClasses,
    addClass,
    updateClass,
    deleteClass,
    getClassById,
    
    // Parent actions
    setParents,
    addParent,
    updateParent,
    deleteParent,
    getParentById,
    
    // UI actions
    setLoading,
    setError,
    setSuccess,
    clearMessages,
    
    // Notification actions
    addNotification,
    removeNotification,
    markNotificationAsRead,
    
    // Init
    initializeData,
  }), [state, setStudents, addStudent, updateStudent, deleteStudent, getStudentById, getStudentsByClass,
      setTeachers, addTeacher, updateTeacher, deleteTeacher, getTeacherById,
      setClasses, addClass, updateClass, deleteClass, getClassById,
      setParents, addParent, updateParent, deleteParent, getParentById,
      setLoading, setError, setSuccess, clearMessages,
      addNotification, removeNotification, markNotificationAsRead,
      initializeData]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ==================== HOOK ====================

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};