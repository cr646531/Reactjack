const LOAD_CARDS = 'LOAD_CARDS';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import axios from 'axios';