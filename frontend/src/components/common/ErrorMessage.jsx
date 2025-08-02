// src/components/common/ErrorMessage.jsx
import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry, type = 'error' }) => {
  return (
    <div className={`error-container ${type}`}>
      <div className="error-content">
        <div className="error-icon">
          {type === 'error' ? '⚠️' : type === 'warning' ? '⚡' : 'ℹ️'}
        </div>
        <div className="error-text">
          <h3>
            {type === 'error' ? 'Error' : 
             type === 'warning' ? 'Advertencia' : 'Información'}
          </h3>
          <p>{message}</p>
        </div>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;