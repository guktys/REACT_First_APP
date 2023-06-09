import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
// Импортируйте файлы локализации
import translationEN from './locales/en.json';

i18n.init({
    interpolation: { escapeValue: false }, // Отключение автоэкранирования
    lng: 'en', // Установка языка по умолчанию
    resources: {
        en: {
            translation: translationEN,
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();