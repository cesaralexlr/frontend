import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'framer-motion';

export const InputField = ({ label, id, name, type, placeholder, value, onChange }) => {
    const { darkMode } = useDarkMode();
  
    const borderColor = darkMode ? '#718096' : '#CBD5E0';
    const textColor = darkMode ? 'white' : 'black';
    const backgroundColor = darkMode ? 'transparent ' : 'white';
  
    return (
      <div className="mb-4">
        <label htmlFor={id} className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          className={`w-full p-2 border rounded-md ${darkMode ? 'text-white' : 'text-black'}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ backgroundColor, color: textColor, borderColor }}
        />
      </div>
    );
  };
  
  export const ActionButton = ({ label, onClick }) => {
    const { darkMode } = useDarkMode();
  
    const buttonColor = darkMode ? 'bg-blue-900' : 'bg-blue-500';
    const textColor = darkMode ? 'text-white' : 'text-white';
    const hoverColor = darkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-600';
    const focusColor = darkMode ? 'focus:border-blue-300' : 'focus:border-blue-300';
  
    return (
      <motion.button
        whileHover={{ scale: 1.1 }} // Animación de escala al pasar el ratón
        whileTap={{ scale: 0.9 }}   // Animación de escala al hacer clic
        className={`w-1/3 p-2 rounded-md min-w-[150px] focus:outline-none focus:ring ${buttonColor} ${textColor} ${hoverColor} ${focusColor}`}
        onClick={onClick}
      >
        {label}
      </motion.button>
    );
  };

    export const ToggleButton = ({ label, onClick, isActive }) => {
      const { darkMode } = useDarkMode();
    
      const trackColor = isActive ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300';
      const thumbColor = darkMode ? 'bg-white' : 'bg-gray-500';
    
      return (
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.1 }} // Animación de escala al pasar el ratón
        >
          <span className={`text-sm mr-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{label}</span>
          <motion.button
            whileTap={{ scale: 0.9 }} // Animación de escala al hacer clic
            className={`relative inline-flex items-center h-6 rounded-full w-12 min-w-[48px] ${trackColor} focus:outline-none`}
            onClick={onClick}
          >
            <motion.span
              className={`absolute left-1/2 transform -translate-x-1/2 ${trackColor} rounded-full h-4 w-12`}
              transition={{ duration: 0.2 }} // Duración de la animación de la línea de seguimiento
            />
            <motion.span
              className={`absolute left-0 top-0 w-6 h-6 rounded-full transform transition-transform ${isActive ? 'translate-x-6' : 'translate-x-0'} ${thumbColor}`}
              transition={{ duration: 0.2 }} // Duración de la animación del pulgar
            />
            <span className={`sr-only ${darkMode ? 'text-white' : 'text-gray-700'}`}>{label}</span>
          </motion.button>
        </motion.div>
      );
    };

