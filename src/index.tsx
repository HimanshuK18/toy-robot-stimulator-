import React from 'react';
import ReactDOM from 'react-dom/client';
import { RobotPositionProvider } from './state/robotState';
import './index.css';
import OfflineModal from './components/offLine/offLine';
import FetchDogs from './components/fetchExample/fetchDogs';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <><RobotPositionProvider>
    <App />
  </RobotPositionProvider>
  <FetchDogs></FetchDogs>
    <OfflineModal />
  </>

)
