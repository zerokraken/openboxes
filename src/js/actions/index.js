import { addTranslationForLanguage } from 'react-localize-redux';

import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  FETCH_USERS,
  FETCH_REASONCODES,
  FETCH_SESSION_INFO,
  CHANGE_CURRENT_LOCATION,
  TRANSLATIONS_FETCHED,
  CHANGE_CURRENT_LOCALE,
  FETCH_INDICATORS,
  ADD_TO_INDICATORS,
  REMOVE_FROM_INDICATORS,
  REORDER_INDICATORS,
} from './types';
import apiClient, { parseResponse } from '../utils/apiClient';

export function showSpinner() {
  return {
    type: SHOW_SPINNER,
    payload: true,
  };
}

export function hideSpinner() {
  return {
    type: HIDE_SPINNER,
    payload: false,
  };
}

export function fetchReasonCodes() {
  const url = '/openboxes/api/reasonCodes';
  const request = apiClient.get(url);

  return {
    type: FETCH_REASONCODES,
    payload: request,
  };
}

export function fetchUsers() {
  const url = '/openboxes/api/generic/person';
  const request = apiClient.get(url);

  return {
    type: FETCH_USERS,
    payload: request,
  };
}

export function fetchSessionInfo() {
  const url = '/openboxes/api/getAppContext';
  const request = apiClient.get(url);

  return {
    type: FETCH_SESSION_INFO,
    payload: request,
  };
}

export function changeCurrentLocation(location) {
  return (dispatch) => {
    const url = `/openboxes/api/chooseLocation/${location.id}`;

    apiClient.put(url).then(() => {
      dispatch({
        type: CHANGE_CURRENT_LOCATION,
        payload: location,
      });
    });
  };
}

export function fetchTranslations(lang, prefix) {
  return (dispatch) => {
    const url = `/openboxes/api/localizations?lang=${lang ||
      ''}&prefix=react.${prefix || ''}`;

    apiClient.get(url).then((response) => {
      const { messages, currentLocale } = parseResponse(response.data);

      dispatch(addTranslationForLanguage(messages, currentLocale));

      dispatch({
        type: TRANSLATIONS_FETCHED,
        payload: prefix,
      });
    });
  };
}

export function changeCurrentLocale(locale) {
  return (dispatch) => {
    const url = `/openboxes/api/chooseLocale/${locale}`;

    apiClient.put(url).then(() => {
      dispatch({
        type: CHANGE_CURRENT_LOCALE,
        payload: locale,
      });
    });
  };
}

// New Dashboard

function fetchIndicator(id, dispatch, params = null) {
  const archived = 0;

  const types = ['line', 'bar', 'horizontalBar', 'bar', 'bar', 'numbers'];
  const methods = [
    'getExpirationSummary',
    'getFillRate',
    'getInventorySummary',
    'getSentStockMovements',
    'getReceivedStockMovements',
    'getOutgoingStock'
  ];
  const titles = [
    'Expiration Summary',
    'Fill Rate',
    'Inventory Summary',
    'Sent Stock Movements',
    'Stock Movements Received',
    'Outgoing Stock Movements'
  ];
  const urls = [
    null, null, null, null, null, null
  ];

  const url = `/openboxes/apitablero/${methods[id]}?${params}`;

  dispatch({
    type: FETCH_INDICATORS,
    payload: {
      id,
      title: titles[id],
      type: 'loading',
      data: [],
      link: urls[id],
      archived,
    },
  });

  apiClient.get(url).then((res) => {
    dispatch({
      type: FETCH_INDICATORS,
      payload: {
        id,
        title: titles[id],
        type: types[id],
        data: res.data,
        link: urls[id],
        archived,
      },
    });
  }, () => {
    dispatch({
      type: FETCH_INDICATORS,
      payload: {
        id,
        title: titles[id],
        type: 'error',
        data: [],
        link: urls[id],
        archived,
      },
    });
  });
}

export function reloadIndicator(id, params) {
  return (dispatch) => {
    fetchIndicator(id, dispatch, params);
  };
}

export function fetchIndicators() {
  return (dispatch) => {
    for (let i = 0; i < 6; i++) {
      fetchIndicator(i, dispatch, null);
    }
  };
}

export function addToIndicators(index) {
  return {
    type: ADD_TO_INDICATORS,
    payload: { index },
  };
}

export function reorderIndicators({ oldIndex, newIndex }, e) {
  if (e.target.id === 'archive') {
    return {
      type: REMOVE_FROM_INDICATORS,
      payload: { index: oldIndex },
    };
  }
  return {
    type: REORDER_INDICATORS,
    payload: { oldIndex, newIndex },
  };
}
