import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './store/reducer';
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
import { IntlProvider } from 'react-intl';
import Spanish from './lang/es_ES.json';
import English from './lang/en_EN.json';
import GetCustomization from 'services/customizeService';

const container = document.getElementById('root');
const root = createRoot(container);
const store = configureStore({ reducer });

const fetchCustomizationData = async () => {
  try {
    const customizationService = await GetCustomization();
    localStorage.setItem('user', JSON.stringify(customizationService));
    return customizationService;
  } catch (error) {
    console.error('Error fetching customization data:', error);
    return { language: navigator.language };
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

const renderApp = async () => {
  await fetchCustomizationData();
  const customization = JSON.parse(localStorage.getItem('user'));
  const locale = customization.language || navigator.language;

  const normalizedLocale = locale.replace('_', '-'); // Ensure locale format is like "en-US"
  const finalLocale = isValidLocale(normalizedLocale) ? normalizedLocale : 'es-ES'; // Default to Spanish if invalid

  let lang;
  if (finalLocale.startsWith('en')) {
    lang = English;
  } else if (finalLocale.startsWith('es')) {
    lang = Spanish;
  } else {
    lang = Spanish; // Default to Spanish if the locale is not explicitly handled
  }

  root.render(
    <Provider store={store}>
      <IntlProvider locale={finalLocale} messages={lang}>
        <App />
      </IntlProvider>
    </Provider>
  );
};

renderApp();

reportWebVitals();
