import ReactDOM from 'react-dom';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { LocalizeProvider } from 'react-localize-redux';

import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css/main.scss';

//import EmailModal from './components/stock-list-management/StocklistManagement';
import ModalWrapper from './components/form-elements/ModalWrapper';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <LocalizeProvider store={store}>
        <ModalWrapper />
    </LocalizeProvider>
  </Provider>
  , document.getElementById('stock-list-email-modal'),
);
