import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDoList from './ToDoList';
import Calculadora from "./Calculadora"

import './ToDoList.css';
import BlogDeNotas from './BlogDeNotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlogDeNotas/>
    <ToDoList/>
      </React.StrictMode>
);


