import React from 'react';
import { useDarkMode } from './DarkModeContext';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

import { ActionButton } from './ReusableComponents';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate(); // Usa useNavigate para la navegación

  const handleEdit = () => {
    navigate('/medication');
  };

  return (
    <nav className={`bg-gray-800 p-4 grid grid-cols-8 items-center fixed w-full ${darkMode ? 'text-white' : 'text-black'}`}>
      {/* Sección 1: Icono */}
      <div className="col-span-1">
        <Link to="/search" className="text-white text-2xl font-bold">Buscador 3.0</Link>
      </div>

      {/* Secciones 2-6: Espacio en blanco */}
      <div className="col-span-5"></div>

      {/* Sección 7: ActionButton */}
      <div className="col-span-1 flex items-center justify-end">
        <ActionButton label="Editar" onClick={handleEdit} className="text-sm p-2" />
      </div>

      {/* Sección 8: Botón */}
      <div className="col-span-1 flex items-center justify-center">
        <button
          className="text-white text-lg focus:outline-none"
          onClick={toggleDarkMode}
        >
          {darkMode ? '🌞' : '🌜'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
