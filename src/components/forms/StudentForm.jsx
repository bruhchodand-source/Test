import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, X, User, Mail, Phone, MapPin, Calendar, UserCircle,
  BookOpen, Home, Contact, Shield
} from 'lucide-react';
import { useApp } from '@context/AppContext';
import { useDocumentTitle } from '@hooks/useLocalStorage';
import { useFormState } from '@hooks/useLocalStorage';
import { ROUTES } from '@constants/routes';
import { SAMPLE_CLASSES, SAMPLE_PARENTS } from '@data/sampleData';
import { generateId } from '@utils/helpers';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  useDocumentTitle(isEditMode ? 'Edit Student' : 'Create Student');
  
  const { 
    students, 
    classes, 
    parents, 
    addStudent, 
    updateStudent, 
    getStudentById,
    setLoading,
    setSuccess,
    setError 
  } = useApp();

  const student = isEditMode ? getStudentById(id) : null;

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    classId: '',
    parentId: '',
    address: '',
    emergencyContact: '',
    status: 'active',
    notes: '',
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    isSubmitting,
    setSubmitting,
  } = useFormState(student || initialValues);

  const allClasses = classes.length > 0 ? classes : SAMPLE_CLASSES;
  const allParents = parents.length > 0 ? parents : SAMPLE_PARENTS;

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'grade', 'classId', 'parentId'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!values[field]?.trim()) {
        setFieldError(field, 'This field is required');
        isValid = false;
      }
    });
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email && !emailRegex.test(values.email)) {
      setFieldError('email', 'Invalid email format');
      isValid = false;
    }
    
    if (!isValid) return;

    setSubmitting(true);
    setLoading(true);

    try {
      const selectedClass = allClasses.find(cls => cls.id === values.classId);
      const selectedParent = allParents.find(parent => parent.id === values.parentId);
      
      const studentData = {
        ...values,
        id: isEditMode ? id : generateId(),
        className: selectedClass?.name || '',
        parentName: selectedParent ? `${selectedParent.firstName} ${selectedParent.lastName}` : '',
        enrollmentDate: student?.enrollmentDate || new Date().toISOString().split('T')[0],
      };

      if (isEditMode) {
        updateStudent(studentData);
        setSuccess('Student updated successfully');
      } else {
        addStudent(studentData);
        setSuccess('Student created successfully');
      }
      
      setTimeout(() => {
        navigate(ROUTES.STUDENTS);
      }, 1000);
    } catch (error) {
      setError(isEditMode ? 'Failed to update student' : 'Failed to create student');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  }, [values, isEditMode, id, setSubmitting, setLoading, setSuccess, setError, updateStudent, addStudent, navigate, allClasses, allParents, student, setFieldError]);

  const handleCancel = useCallback(() => {
    navigate(ROUTES.STUDENTS);
  }, [navigate]);

  const sectionTabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'academic', label: 'Academic', icon: BookOpen },
    { id: 'guardian', label: 'Guardian', icon: Home },
    { id: 'emergency', label: 'Emergency', icon: Shield },
  ];

  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="section-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {isEditMode ? 'Edit Student' : 'Create New Student'}
            </h2>
            <p className="text-text-muted mt-1">
              {isEditMode 
                ? `Update information for ${student?.firstName} ${student?.lastName}`
                : 'Add a new student to the school management system'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="btn-glass"
            >
              <X className="inline w-4 h-4 mr-1" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary"
            >
              <Save className="inline w-4 h-4 mr-1" />
              {isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update' : 'Create')}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-700">
        {sectionTabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 -mb-px border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === 'basic' && (
          <div className="section-card space-y-6">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    className={`form-input pl-10 ${errors.firstName && touched.firstName ? 'border-red-500' : ''}`}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && touched.firstName && (
                  <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    className={`form-input pl-10 ${errors.lastName && touched.lastName ? 'border-red-500' : ''}`}
                    placeholder="Enter last name"
                  />
                </div>
                {errors.lastName && touched.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    className={`form-input pl-10 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    placeholder="student@school.edu"
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    className="form-input pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    onChange={handleChange('dateOfBirth')}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange('gender')}
                  className="form-select"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <textarea
                  name="address"
                  value={values.address}
                  onChange={handleChange('address')}
                  rows="3"
                  className="form-textarea pl-10"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="section-card space-y-6">
            <h3 className="text-lg font-semibold">Academic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Grade Level *</label>
                <select
                  name="grade"
                  value={values.grade}
                  onChange={handleChange('grade')}
                  className={`form-select ${errors.grade && touched.grade ? 'border-red-500' : ''}`}
                >
                  <option value="">Select grade</option>
                  {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                    <option key={grade} value={`${grade}th`}>{grade}th Grade</option>
                  ))}
                </select>
                {errors.grade && touched.grade && (
                  <p className="text-red-400 text-xs mt-1">{errors.grade}</p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Class Assignment *</label>
                <select
                  name="classId"
                  value={values.classId}
                  onChange={handleChange('classId')}
                  className={`form-select ${errors.classId && touched.classId ? 'border-red-500' : ''}`}
                >
                  <option value="">Select class</option>
                  {allClasses.map(cls => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.teacherName})
                    </option>
                  ))}
                </select>
                {errors.classId && touched.classId && (
                  <p className="text-red-400 text-xs mt-1">{errors.classId}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={values.notes}
                onChange={handleChange('notes')}
                rows="4"
                className="form-textarea"
                placeholder="Additional notes about the student (achievements, behavior, special requirements, etc.)"
              />
            </div>
          </div>
        )}

        {activeTab === 'guardian' && (
          <div className="section-card space-y-6">
            <h3 className="text-lg font-semibold">Guardian Information *</h3>
            
            <div className="form-group">
              <label className="form-label">Primary Guardian</label>
              <select
                name="parentId"
                value={values.parentId}
                onChange={handleChange('parentId')}
                className={`form-select ${errors.parentId && touched.parentId ? 'border-red-500' : ''}`}
              >
                <option value="">Select guardian</option>
                {allParents.map(parent => (
                  <option key={parent.id} value={parent.id}>
                    {parent.firstName} {parent.lastName} ({parent.relationship}) - {parent.email}
                  </option>
                ))}
              </select>
              {errors.parentId && touched.parentId && (
                <p className="text-red-400 text-xs mt-1">{errors.parentId}</p>
              )}
            </div>

            <div className="p-4 bg-dark-800 rounded-lg border border-dark-600">
              <p className="text-sm text-text-muted">
                Guardian not in the list? <Link to="/parents/create" className="text-primary hover:underline">Create a new guardian</Link> first.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="section-card space-y-6">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            
            <div className="form-group">
              <label className="form-label">Emergency Contact</label>
              <div className="relative">
                <Contact className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  name="emergencyContact"
                  value={values.emergencyContact}
                  onChange={handleChange('emergencyContact')}
                  className="form-input pl-10"
                  placeholder="Name and phone number"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Student Status</label>
              <select
                name="status"
                value={values.status}
                onChange={handleChange('status')}
                className="form-select"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="graduated">Graduated</option>
                <option value="transferred">Transferred</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentForm;