import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { InputField, ActionButton, ToggleButton } from './ReusableComponents';
import { useDarkMode } from './DarkModeContext';
import axios from 'axios';

const MedicationForm = () => {
  const { darkMode } = useDarkMode();


  const initialFormData = {
    name: '',
    dosage: '',
    via: '',
    adult: '',
    ped: '',
    gpo90: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [suggestions, setSuggestions] = useState([]);
  const [allMedications, setAllMedications] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://backend-7he7.onrender.com/names');
      const data = response.data;
      setAllMedications(data);
    } catch (error) {
      console.error('Error al obtener datos del servidor:', error);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
    
  //   if (name === 'name') {
  //     setSuggestions(getSuggestions(value));
  //   }
  // };

  const handleToggleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      gpo90: prevData.gpo90 === false ? true : false,
    }));
  };

  const handleNameChange = (event, { newValue }) => {
    setFormData((prevData) => ({
      ...prevData,
      name: newValue,
    }));
  }
  const handleDosisChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      dosage: value,
    }));
  };
  
  const handleViaChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      via: value,
    }));
  };
  
  const handleDosisAdultoChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      adult: value,
    }));
  };
  
  const handleDosisPediatricaChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      ped: value,
    }));
  };


  const handleSuggestionSelected = async (event, { suggestionValue }) => {
    if (suggestionValue) {
      // Actualizar el estado del formulario con el valor de la sugerencia seleccionada
      setFormData((prevData) => ({
        ...prevData,
        name: suggestionValue,
      }));
      // Ejecutar handleRetrieve automáticamente después de seleccionar una sugerencia
      await handleRetrieve();
    }
  };


  
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const filteredMedications = inputLength === 0 ? [] : allMedications.filter(medication =>
      medication.toLowerCase().includes(inputValue)
    );
    return filteredMedications.slice(0, 5); // Devuelve solo las primeras tres sugerencias
  };

  const inputProps = {
    placeholder: 'Ingrese el nombre del medicamento',
    value: formData.name,
    onChange: handleNameChange,
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  const handleRetrieve = async () => {
    try {
      const name = formData.name; 
      const encodedSuggestion = encodeURIComponent(name)
        .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
      const url = `https://backend-7he7.onrender.com/med/${encodedSuggestion}`;
      const response = await axios.get(url);
      const responseData = response.data;
      const isGpo90 = responseData.gpo90 === 'true' ? true : false;
      setFormData((prevData) => ({
        ...prevData,
        dosage: responseData.dosage || '',
        via: responseData.via || '',
        adult: responseData.adult || '',
        ped: responseData.ped || '',
        gpo90: isGpo90,
      }));
    } catch (error) {
      console.error('Error al obtener datos del servidor:', error);
    }
  };
  
  const handleUpdate = async () => {
    try {
      const name = formData.name;
      const encodedSuggestion = encodeURIComponent(name)
        .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
      const url = `https://backend-7he7.onrender.com/med/${encodedSuggestion}`;
  
      // Realizar una solicitud PUT para actualizar el registro
      await axios.put(url, formData);
      alert('Datos actualizados exitosamente.');
    } catch (error) {
      console.error('Error al actualizar/crear datos:', error);
    }
  };
  
  
  const handleDelete = async () => {
    try {
      const name = formData.name;
      const encodedSuggestion = encodeURIComponent(name)
        .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
      const url = `https://backend-7he7.onrender.com/med/${encodedSuggestion}`;
  
      // Realizar una solicitud DELETE sin verificar si existe el recurso
      await axios.delete(url);
      await fetchData();
      alert('Datos eliminados exitosamente.');
      setFormData(initialFormData);
    } catch (error) {
      // Manejar errores de manera adecuada
      console.error('Error al eliminar datos:', error);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
  };
  
  const handleAdd = async () => {
    try {
      // Realizar una solicitud POST para agregar un nuevo registro
      await axios.post('https://backend-7he7.onrender.com/med', formData);
      await fetchData();
      setFormData(initialFormData);
      alert('Datos agregados exitosamente.');
    } catch (error) {
      alert('Error al crear datos:', error);
    }
  };
  
  const handleAction = (action) => {
    switch (action) {
      case 'retrieve':
        handleRetrieve();
        break;
      case 'update':
        handleUpdate();
        break;
      case 'delete':
        handleDelete();
        break;
      case 'add':
        handleAdd();
        break;
      case 'clear':
        handleClear();
        break;
      default:
        break;
    }
  };

  return (
    <div className={`mt-10 min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`max-w-md w-full p-6 shadow-md rounded-md ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {/* <h2 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>Actualizar datos</h2> */}
        <div className="mb-4 relative">
          <label htmlFor="nombre" className={`block text-sm font-bold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Nombre
          </label>    
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={renderSuggestion}
            inputProps={{
              ...inputProps,
              id: 'name',
              name: 'name',
              className: `w-full p-2 border rounded-md ${darkMode ? 'text-white' : 'text-black'} bg-transparent focus:outline-none focus:ring focus:border-blue-300`,
              style: { borderColor: darkMode ? '#718096' : '#CBD5E0', color: darkMode ? 'white' : 'black' }
            }}
            onSuggestionSelected={handleSuggestionSelected}
            theme={{
              container: 'react-autosuggest__container',
              suggestionsContainer: `absolute w-full bg-${darkMode ? 'gray-800' : 'white'} ${darkMode ? 'text-white' : 'text-black'}`, // Aquí está la corrección
              suggestionsList: 'react-autosuggest__suggestions-list',
              suggestion: 'react-autosuggest__suggestion',
              suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
            }}
          />
        </div>
        <InputField
          label="Dosis"
          id="dosis"
          type="text"
          placeholder="Ingrese la dosis"
          value={formData.dosage}
          onChange={handleDosisChange}
        />

        <InputField
          label="Vía"
          id="via"
          type="text"
          placeholder="Ingrese la vía"
          value={formData.via}
          onChange={handleViaChange}
        />

        <InputField
          label="Dosis Adulto"
          id="dosisAdulto"
          type="text"
          placeholder="Ingrese la dosis para adultos"
          value={formData.adult}
          onChange={handleDosisAdultoChange}
        />

        <InputField
          label="Dosis Pediátrica"
          id="dosisPediatrica"
          type="text"
          placeholder="Ingrese la dosis pediátrica"
          value={formData.ped}
          onChange={handleDosisPediatricaChange}
        />
  
        <div className="flex justify-between items-center mb-4">
          <ToggleButton
            label="Grupo 90"
            onClick={handleToggleChange}
            isActive={formData.gpo90 === true}
          />
        </div>
  
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex gap-4">
            <ActionButton
              label="Buscar"
              onClick={() => handleAction('retrieve')}
            />
            <ActionButton
              label="Actualizar"
              onClick={() => handleAction('update')}
            />
            <ActionButton
              label="Eliminar"
              onClick={() => handleAction('delete')}
            />
          </div>
          <div className="flex gap-4">
            <ActionButton
              label="Agregar"
              onClick={() => handleAction('add')}
            />
            <ActionButton
              label="Limpiar"
              onClick={() => handleAction('clear')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicationForm;
