import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import store from './store/store';
import store from './store';
import App from './components/App';

import test_store from './test_store';
import TestApp from './test_components/TestApp';

const root = document.getElementById('root');

// render(
//     <Provider store={ store } >
//         <App />
//     </Provider>, root
// );

render(
    <Provider store={ test_store }>
        <TestApp />
    </Provider>, root
)