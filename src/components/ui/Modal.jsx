import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeOnEscape, onClose, isMounted]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  }, [closeOnOverlayClick, onClose]);

  if (!isMounted) return null;
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const modalClasses = [
    'bg-dark-800 rounded-lg shadow-xl overflow-hidden',
    'border border-dark-600',
    'transform transition-all duration-200',
    'w-full',
    sizeClasses[size],
    className,
  ].join(' ');

  const overlayClasses = [
    'fixed inset-0 z-50 overflow-y-auto',
    'bg-black bg-opacity-50 backdrop-blur-sm',
    'flex items-center justify-center p-4',
    overlayClassName,
  ].join(' ');

  return createPortal(
    <div
      className={overlayClasses}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={modalClasses}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-dark-700">
            <div className="flex-1">
              {title && (
                <h3
                  id="modal-title"
                  className="text-lg font-semibold text-text-primary"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="text-sm text-text-muted mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-dark-700 rounded-lg transition-colors ml-4"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-text-muted hover:text-text-primary" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-0">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full']),
  closeOnOverlayClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
};

// Confirm Modal
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  ...props
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const confirmButtonVariant = variant === 'danger' ? 'danger' : 
                               variant === 'success' ? 'success' : 
                               variant === 'warning' ? 'warning' : 'primary';

  const footer = (
    <div className="flex items-center justify-end gap-3">
      <Button variant="ghost" onClick={onClose}>
        {cancelText}
      </Button>
      <Button
        variant={confirmButtonVariant}
        onClick={handleConfirm}
      >
        {confirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="sm"
      {...props}
    >
      <p className="text-text-primary">{message}</p>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  ...Modal.propTypes,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  variant: PropTypes.oneOf(['danger', 'success', 'warning']),
};

// Info Modal
export const InfoModal = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'OK',
  ...props
}) => {
  const footer = (
    <div className="flex items-center justify-end">
      <Button variant="primary" onClick={onClose}>
        {confirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="sm"
      {...props}
    >
      <p className="text-text-primary">{message}</p>
    </Modal>
  );
};

InfoModal.propTypes = {
  ...Modal.propTypes,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
};

// Form Modal
export const FormModal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isSubmitting = false,
  ...props
}) => {
  const footer = (
    <div className="flex items-center justify-end gap-3">
      <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
        {cancelText}
      </Button>
      <Button
        variant="primary"
        type="submit"
        loading={isSubmitting}
        onClick={onSubmit}
      >
        {submitText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      {...props}
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        {children}
      </form>
    </Modal>
  );
};

FormModal.propTypes = {
  ...Modal.propTypes,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  isSubmitting: PropTypes.bool,
};

export default Modal;