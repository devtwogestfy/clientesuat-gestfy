import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function ColorsTimeline({ notas }) {
  // Divide las notas en un array de líneas usando el salto de línea como separador
  // eslint-disable-next-line react/prop-types
  const lines = notas.split('<br />');

  return (
    <Timeline position="alternate">
      {lines.map((line, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            {/* Agrega un conector solo si no es el último elemento */}
            {index < lines.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            {/* Renderiza el contenido de la línea, asegurándote de mostrar HTML correctamente */}
            <Typography dangerouslySetInnerHTML={{ __html: line }} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
