import React from 'react';
import './EstadoProyecto.css';

const EstadoProyecto = ({ estado }) => {
  const getEstadoConfig = (estado) => {
    const estados = {
      'EN PROCESO': {
        clase: 'status-en-proceso',
        texto: 'EN PROCESO'
      },
      'PARA APROBAR': {
        clase: 'status-para-aprobar',
        texto: 'PARA APROBAR'
      },
      'ESPERANDO RESULTADO': {
        clase: 'status-esperando-resultado',
        texto: 'ESPERANDO RESULTADO'
      },
      'PAUSADO': {
        clase: 'status-pausado',
        texto: 'PAUSADO'
      },
      'FINALIZADO': {
        clase: 'status-finalizado',
        texto: 'FINALIZADO'
      },
      'RECHAZADO': {
        clase: 'status-rechazado',
        texto: 'RECHAZADO'
      },
      'CANCELADO': {
        clase: 'status-cancelado',
        texto: 'CANCELADO'
      }
    };

    return estados[estado] || {
      clase: 'status-pausado',
      texto: estado
    };
  };

  const config = getEstadoConfig(estado);

  return (
    <span className={`status-pill ${config.clase}`}>
      {config.texto}
    </span>
  );
};

export default EstadoProyecto;

