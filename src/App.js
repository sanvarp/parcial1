import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import CarsTable from './components/CarsTable';
import './App.css';

import { IntlProvider } from 'react-intl';
import localeEsMessages from './locales/es';
import localeEnMessages from './locales/en';

function App() {
  const language = navigator.language.split(/[-_]/)[0]; // Simplified, 'en' default not needed due to fallback below

  

  const messages = language === "es" ? localeEsMessages : localeEnMessages;
  

  return (
    <IntlProvider locale={language} messages={messages}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/carstable" element={<CarsTable />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
