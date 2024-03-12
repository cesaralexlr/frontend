import React from 'react';
import { useDarkMode } from './DarkModeContext';

const PrivacyDisclosure = () => {
    const { darkMode } = useDarkMode();
  
    return (
        <div className={`privacy-disclosure ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} font-poppins flex items-center justify-center h-full`}>
            <p className="text-justify w-3/4 mx-auto px-4">
             <b>El uso de nuestro sitio web está sujeto a los siguientes términos y condiciones:</b>
                <br/>
                <br/>
                El contenido de este sitio web se proporciona únicamente con fines informativos. No garantizamos la exactitud, integridad o actualidad de la información presentada en este sitio.
                No nos hacemos responsables de cualquier daño o perjuicio que pueda surgir del uso de este sitio web.
                Este sitio web puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido o las prácticas de privacidad de estos sitios y no nos hacemos responsables de ellos.
                Nos reservamos el derecho de modificar, actualizar o eliminar cualquier contenido o funcionalidad de este sitio web sin previo aviso.
                <br/>
                <br/>
                El uso de este sitio web es responsabilidad del usuario. Todo el contenido de este sitio web está protegido por derechos de autor y no puede ser reproducido sin nuestro permiso explícito.
            </p>
        </div>
    );
};

export default PrivacyDisclosure;