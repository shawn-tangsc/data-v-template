import React from "react";
import './index.css';
import {Provider} from "react-redux";
import store from '@/store'
import {HashRouter} from 'react-router-dom'
import Router from '@/routes'
import AuthRouter from '@/routes/utils/authRouter'
const App = ()=>{
  return (
      <Provider store={store} >
        <HashRouter>
          <AuthRouter>
            <Router/>
          </AuthRouter>
        </HashRouter>
      </Provider>
  )
}

export default App;

