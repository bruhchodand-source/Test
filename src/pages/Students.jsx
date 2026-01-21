import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye,
  ChevronLeft, ChevronRight, Download, Upload
} from 'lucide-react';
import { useApp } from '@context/AppContext';
import { useDocumentTitle } from '@hooks/useLocalStorage';
import { useListFilter } from '@hooks/useLocalStorage';
import { ROUTES } from '@constants/routes';
import { SAMPLE_STUDENTS } from '@data/sampleData';
import { formatDate, getInitials, truncateText } from '@utils/helpers';

const Students = () => {
  useDocumentTitle('Students');
  const { students, deleteStudent, setSuccess, setError } = useApp();
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const allStudents = students.length > 0 ? students : SAMPLE_STUDENTS;

  const { items: filteredStudents, searchTerm, setSearchTerm } = useListFilter(
    allStudents,
    { searchFields: ['firstName', 'lastName', 'email', 'grade', 'className'] }
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleDeleteStudent = useCallback((studentId) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      try {
        deleteStudent(studentId);
        setSuccess('Student deleted successfully');
      } catch (error) {
        setError('Failed to delete student');
      }
    }
  }, [deleteStudent, setSuccess, setError]);

  const handleSelectAll = useCallback((e) => {
    if (e.target.checked) {
      setSelectedStudents(currentStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  }, [currentStudents]);

  const handleSelectStudent = useCallback((studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedStudents.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedStudents.length} students?`)) {
      try {
        selectedStudents.forEach(id => deleteStudent(id));
        setSelectedStudents([]);
        setSuccess(`${selectedStudents.length} students deleted successfully`);
      } catch (error) {
        setError('Failed to delete some students');
      }
    }
  }, [selectedStudents, deleteStudent, setSuccess, setError]);

  const handleExport = useCallback(() => {
    const csv = [
      ['ID', 'First Name', 'Last Name', 'Email', 'Grade', 'Class', 'Date of Birth', 'Status'],
      ...filteredStudents.map(s => [
        s.id, s.firstName, s.lastName, s.email, s.grade, s.className, s.dateOfBirth, s.status
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    setSuccess('Students exported successfully');
  }, [filteredStudents, setSuccess]);

  const getStatusColor = (status) => {
    const colors = {
      active: 'status-active',
      inactive: 'status-inactive',
      suspended: 'status-pending',
    };
    return colors[status] || 'status-inactive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="section-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Students</h2>
            <p className="text-text-muted mt-1">
              Manage and track student information, grades, and attendance
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedStudents.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-3 py-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-colors text-sm font-medium"
              >
                <Trash2 className="inline w-4 h-4 mr-1" />
                Delete Selected ({selectedStudents.length})
              </button>
            )}
            <button
              onClick={handleExport}
              className="btn-glass"
            >
              <Download className="inline w-4 h-4 mr-1" />
              Export
            </button>
            <Link
              to={ROUTES.STUDENT_CREATE}
              className="btn-primary"
            >
              <Plus className="inline w-4 h-4 mr-1" />
              Add Student
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="section-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search students by name, email, grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-glass"
          >
            <Filter className="inline w-4 h-4 mr-1" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-dark-800 rounded-lg border border-dark-600">
            <p className="text-sm text-text-muted">Additional filters will be available here</p>
          </div>
        )}
      </div>

      {/* Students Table */}
      <div className="section-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === currentStudents.length && currentStudents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-dark-600 bg-dark-800 text-primary focus:ring-primary"
                  />
                </th>
                <th className="p-4 text-left text-sm font-medium text-text-secondary">Student</th>
                <th className="p-4 text-left text-sm font-medium text-text-secondary">Grade</th>
                <th className="p-4 text-left text-sm font-medium text-text-secondary">Class</th>
                <th className="p-4 text-left text-sm font-medium text-text-secondary">Date of Birth</th>
                <th className="p-4 text-left text-sm font-medium text-text-secondary">Contact</th>
                <th className="p-4 text-left text-sm font-medium text-text-secondary">Status</th>
                <th className="p-4 text-left text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-text-muted">
                    <div className="flex flex-col items-center">
                      <GraduationCap className="w-12 h-12 mb-4 text-text-muted" />
                      <p>No students found</p>
                      {searchTerm && (
                        <p className="text-sm mt-1">Try adjusting your search terms</p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                currentStudents.map((student) => (
                  <tr key={student.id} className="border-b border-dark-800 hover:bg-dark-800 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="rounded border-dark-600 bg-dark-800 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {student.photo ? (
                          <img
                            src={student.photo}
                            alt={`${student.firstName} ${student.lastName}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {getInitials(`${student.firstName} ${student.lastName}`)}
                            </span>
                          </div>
                        )}
                        <div>
                          <Link
                            to={`/students/${student.id}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {student.firstName} {student.lastName}
                          </Link>
                          <p className="text-xs text-text-muted">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{student.grade}</td>
                    <td className="p-4 text-sm">{student.className}</td>
                    <td className="p-4 text-sm">{formatDate(student.dateOfBirth)}</td>
                    <td className="p-4 text-sm">
                      <p>{truncateText(student.phone, 20)}</p>
                      <p className="text-xs text-text-muted">{truncateText(student.address, 25)}</p>
                    </td>
                    <td className="p-4">
                      <span className={`status-badge ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/students/${student.id}`}
                          className="p-1 hover:bg-dark-700 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-text-muted hover:text-text-primary" />
                        </Link>
                        <Link
                          to={`/students/${student.id}/edit`}
                          className="p-1 hover:bg-dark-700 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-text-muted hover:text-accent-cyan" />
                        </Link>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1 hover:bg-dark-700 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-text-muted hover:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredStudents.length > itemsPerPage && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-text-muted">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-dark-600 hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-dark-600 hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;