import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import App from './App';
import rootReducer from './store/reducer';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import 'assets/scss/style.scss';
import reportWebVitals from 'reportWebVitals';
import Spanish from './lang/es_ES.json';
import English from './lang/en_EN.json';
import GetCustomization from 'services/customizeService';
import CircularWithValueLabel from 'views/utilities/CircularProgressWithLabel';

const container = document.getElementById('root');
const root = createRoot(container);
const store = configureStore({ reducer: rootReducer });

const fetchCustomizationData = async () => {
  try {
    const customizationService = await GetCustomization();
    localStorage.setItem('user', JSON.stringify(customizationService));
    return customizationService;
  } catch (error) {
    console.error('Error fetching customization data:', error);
    return { language: 'es-ES' };
  }
};

const isValidLocale = (locale) => {
  try {
    Intl.NumberFormat.supportedLocalesOf(locale);
    return true;
  } catch {
    return false;
  }
};

const AppWrapper = () => {
  const [customization, setCustomization] = useState(null);

  useEffect(() => {
    const initializeCustomization = async () => {
      localStorage.removeItem('user');
      const data = await fetchCustomizationData();
      setCustomization(data);
    };

    initializeCustomization();
  }, []);

  if (!customization) {
    return (
      <div className="center-spinner">
        <CircularWithValueLabel color="secondary" />
      </div>
    );
  }

  const locale = customization.language;

  const normalizedLocale = locale.replace('_', '-');
  const finalLocale = isValidLocale(normalizedLocale) ? normalizedLocale : 'es-ES';

  let lang;
  if (finalLocale.startsWith('en')) {
    lang = English;
  } else if (finalLocale.startsWith('es')) {
    lang = Spanish;
  } else {
    lang = Spanish;
  }

  return (
    <Provider store={store}>
      <IntlProvider locale={finalLocale} messages={lang}>
        <App />
      </IntlProvider>
    </Provider>
  );
};

root.render(<AppWrapper />);

reportWebVitals();
