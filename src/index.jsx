import { createRoot } from 'react-dom/client';

// third party
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// project imports
import App from './App';
import reducer from './store/reducer';

// google-fonts
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

// style + assets
import 'assets/scss/style.scss';
import reportWebVitals from 'reportWebVitals';
import {IntlProvider} from 'react-intl';
import Spanish from './lang/es_ES.json';
import English from './lang/en_EN.json';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
const store = configureStore({ reducer });
const locale = navigator.language;

let lang;
if (locale==="en") {
   lang = English;
} else {
    lang = Spanish;
}
// ==============================|| REACT DOM RENDER  ||============================== //

root.render(
  <Provider store={store}>
    <IntlProvider locale ={locale} messages={Spanish}>
      <App />
    </IntlProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();
