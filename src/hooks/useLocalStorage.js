import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook to use localStorage with React useState
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @param {Object} options - Configuration options
 * @returns {Array} [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    onError = (error) => console.error(`localStorage error for key "${key}":`, error),
    syncAcrossTabs = true,
  } = options;

  // Get initial value from localStorage or use initialValue
  const getInitialValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return deserialize(item);
      }
      
      // If initialValue is a function, call it
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      onError(error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  }, [key, initialValue, deserialize, onError]);

  const [storedValue, setStoredValue] = useState(getInitialValue);

  // Set value in localStorage and state
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, serialize(valueToStore));
      } catch (error) {
        onError(error);
      }
    },
    [key, storedValue, serialize, onError]
  );

  // Remove value from localStorage and state
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      onError(error);
    }
  }, [key, initialValue, onError]);

  // Listen for storage changes across tabs
  useEffect(() => {
    if (!syncAcrossTabs) return;

    const handleStorageChange = (e) => {
      if (e.key === key) {
        if (e.newValue) {
          try {
            setStoredValue(deserialize(e.newValue));
          } catch (error) {
            onError(error);
          }
        } else {
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, deserialize, syncAcrossTabs, onError]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing theme (light/dark)
 */
export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
};

/**
 * Hook for managing authentication state
 */
export const useAuth = () => {
  const [auth, setAuth, removeAuth] = useLocalStorage('auth', null);
  
  const login = useCallback((authData) => {
    setAuth(authData);
  }, [setAuth]);
  
  const logout = useCallback(() => {
    removeAuth();
  }, [removeAuth]);
  
  const isAuthenticated = Boolean(auth && auth.token);
  
  const updateUser = useCallback((userData) => {
    setAuth(prev => ({ ...prev, user: { ...prev.user, ...userData } }));
  }, [setAuth]);
  
  return { auth, login, logout, isAuthenticated, updateUser };
};

/**
 * Hook for managing form state
 */
export const useFormState = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const handleBlur = useCallback((field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
  }, []);

  const setFieldValue = useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback((field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialState]);

  const setSubmitting = useCallback((submitting) => {
    setIsSubmitting(submitting);
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    resetForm,
    setSubmitting,
  };
};

/**
 * Hook for managing API call state
 */
export const useApi = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
};

/**
 * Hook for debouncing a value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for managing document title
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title ? `${title} | School Management` : originalTitle;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

/**
 * Hook for managing list filtering and sorting
 */
export const useListFilter = (items, { searchFields = [], defaultSort = null } = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(defaultSort?.field || '');
  const [sortDirection, setSortDirection] = useState(defaultSort?.direction || 'asc');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    
    const searchLower = searchTerm.toLowerCase();
    return items.filter(item => 
      searchFields.some(field => 
        String(getNestedValue(item, field)).toLowerCase().includes(searchLower)
      )
    );
  }, [items, searchTerm, searchFields]);

  const sortedItems = useMemo(() => {
    if (!sortField) return filteredItems;
    
    return [...filteredItems].sort((a, b) => {
      const aValue = getNestedValue(a, sortField);
      const bValue = getNestedValue(b, sortField);
      
      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredItems, sortField, sortDirection]);

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  return {
    items: sortedItems,
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
  };
};

// Helper function to get nested object values
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}