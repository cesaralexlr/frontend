import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { useDarkMode } from './DarkModeContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToggleButton } from './ReusableComponents';

const Search = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allSuggestions, setAllSuggestions] = useState([]); 
  const { darkMode } = useDarkMode();
  const [pedModeActivated, setPedModeActivated] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-7he7.onrender.com/names'); 
        setAllSuggestions(response.data);
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      }
    };
    fetchData(); 
  }, []); 


  const changePedMode = () => {
    setPedModeActivated(!pedModeActivated); 
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : allSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue)
    ).slice(0, 5);
  };

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = async (_, { suggestion }) => {
    try {
      if (!suggestion) {
        console.error('Sugerencia no definida');
        return;
      }
      const encodedSuggestion = encodeURIComponent(suggestion)
        .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16));
      const url = `https://backend-7he7.onrender.com/med/${encodedSuggestion}`;
      const response = await axios.get(url);
      let gpo90 = response.data.gpo90 !== undefined && response.data.gpo90 ? '\tGRUPO 90' : '\t';
      
      // Determina qué campo utilizar en base al modo activado
      const fieldToUse = pedModeActivated ? response.data.ped : response.data.adult;
      
      let responseData = `${response.data.name}\t${response.data.dosage}\t${response.data.via}\t${gpo90}\t${fieldToUse}`;
  
      navigator.clipboard.writeText(responseData);
      console.log('Datos copiados al portapapeles:', responseData);
      setValue('');
    } catch (error) {
      console.error('Error al obtener datos del servidor:', error);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && suggestions.length === 1) {
      onSuggestionSelected(event, { suggestion: suggestions[0] });
    }
  };

  const renderSuggestion = (suggestion) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className={`p-2 border-b ${darkMode ? 'text-white' : 'text-black'}`}
    >
      {suggestion}
    </motion.div>
  );

  const inputProps = {
    placeholder: pedModeActivated ? 'Ahora solo buscaré dosis pediátricas' : 'Si está en Timsa, está bien', // Cambiar el placeholder
    value,
    onChange,
    onKeyDown,
    className: `p-2 border border-${darkMode ? 'gray-700' : 'gray-300'} rounded-md w-96 bg-${darkMode ? 'gray-800 text-white' : 'white'}`,
  };

  
  const hoverBgColor = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300';
   
  return (  
    <div className= {`min-h-screen flex flex-col items-center justify-center bg-${darkMode ? 'gray-900' : 'white'}`}>
      <div className="absolute top-1/8 right-20 m-4">
      <ToggleButton label="Pediatrico" onClick={changePedMode} isActive={pedModeActivated} />
      </div>
      <div className="w-full flex justify-center">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={onSuggestionSelected}
          theme={{
            container: 'react-autosuggest__container',
            suggestionsContainer: `absolute w-96 bg-${darkMode ? 'gray-800' : 'gray-100'} ${darkMode ? 'text-white' : 'text-black'}`,
            suggestionsList: 'react-autosuggest__suggestions-list',
            suggestion: `react-autosuggest__suggestion ${hoverBgColor}`,
            suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
          }}
        />
      </div>
    </div>
  );
  
};

export default Search;

