import React from 'react';
import ReactDOM from 'react-dom/client';
import { RobotPositionProvider } from './state/robotState';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <RobotPositionProvider>
      <App />
    </RobotPositionProvider>
)
