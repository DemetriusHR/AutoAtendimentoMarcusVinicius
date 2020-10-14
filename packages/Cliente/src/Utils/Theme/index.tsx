import React from 'react';
import { ThemeProvider } from 'styled-components';

import ModaisProvider from '../../Context/Modais';

const theme = {
  primaryColor:
    '#FFC94A',
  infoColor:
    '#00bac4',
  warningColor:
    '#EFBD1A',
  errorColor:
    '#F95555',
  sucessColor:
    '#48EBA4',
  textNotFoundColor:
    '#9F9E9E',
  textSize:
    '14px',
  backgroundBody:
    '#484848',
  headerColor:
    '#242424',
  textColor:
    '#707070',
  cardColor:
    '#fff',
};

const Theme: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <ThemeProvider
    theme={
      theme
    }
  >
    <React.StrictMode>
      <ModaisProvider>
        {
          children
        }
      </ModaisProvider>
    </React.StrictMode>
  </ThemeProvider>
);

Theme.defaultProps = {
  children: (
    <div />
  ),
};

export { theme };
export default Theme;
