// Utility functions for the School Management System

/**
 * Format a date to a human-readable string
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', defaultOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Format a time to a human-readable string
 * @param {string|Date} time - Time to format
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
  try {
    const timeObj = time instanceof Date ? time : new Date(time);
    return timeObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid Time';
  }
};

/**
 * Format a full datetime string
 * @param {string|Date} datetime - DateTime to format
 * @returns {string} Formatted datetime string
 */
export const formatDateTime = (datetime) => {
  return `${formatDate(datetime)} at ${formatTime(datetime)}`;
};

/**
 * Calculate age from birth date
 * @param {string|Date} birthDate - Birth date
 * @returns {number} Age in years
 */
export const calculateAge = (birthDate) => {
  try {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    console.error('Error calculating age:', error);
    return 0;
  }
};

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + suffix;
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const isValid = password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
  
  return {
    isValid,
    requirements: {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    },
  };
};

/**
 * Convert file size to human-readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Human-readable file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  
  return function() {
    const args = arguments;
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Get initials from full name
 * @param {string} fullName - Full name
 * @returns {string} Initials
 */
export const getInitials = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return '?';
  
  const names = fullName.trim().split(' ');
  const firstName = names[0] || '';
  const lastName = names.length > 1 ? names[names.length - 1] : '';
  
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || firstName.charAt(0).toUpperCase() || '?';
};

/**
 * Capitalize first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export const capitalizeWords = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
};

/**
 * Convert array to object with specified key
 * @param {Array} array - Array to convert
 * @param {string} key - Key to use for object keys
 * @returns {Object} Converted object
 */
export const arrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} Is empty
 */
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
};

/**
 * Shuffle array randomly
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get percentage from value and total
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Percentage string
 */
export const getPercentage = (value, total, decimals = 1) => {
  if (total === 0) return '0%';
  return ((value / total) * 100).toFixed(decimals) + '%';
};

/**
 * Get status color class
 * @param {string} status - Status value
 * @returns {string} Status class
 */
export const getStatusColor = (status) => {
  const statusColors = {
    active: 'text-accent-emerald',
    inactive: 'text-red-400',
    pending: 'text-yellow-400',
    approved: 'text-accent-emerald',
    rejected: 'text-red-400',
    completed: 'text-accent-emerald',
    cancelled: 'text-red-400',
    draft: 'text-text-muted',
  };
  
  return statusColors[status.toLowerCase()] || 'text-text-secondary';
};

/**
 * Local storage helpers
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};