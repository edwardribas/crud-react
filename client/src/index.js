import React from 'react';
import ReactDOM from 'react-dom/client';
import { Register } from './components/Register';
import { Employees } from './components/Employees';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './index.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Header/>
		<Routes>
			<Route path="/" element={<Register/>}/>
			<Route path="/employees" element={<Employees/>}/>
			<Route path="/*" element={<Navigate to="/" replace/>}/>
		</Routes>
		<Footer/>
	</BrowserRouter>
);
