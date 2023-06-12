import React, { useEffect } from 'react';
import logo from './logo.svg';
import './Styles/sb-admin-2.min.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams  } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './pages/DefaultLayout/DefaultLayout';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from './firebase-config/firebase';

function App() {
  useEffect(() => {
    document.title = 'CMS Ticket Sale'
  }, [])
  return (
    <div className='App' id="wrapper">
       <Router>
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            {publicRoutes.map((route, index) => {
              const Layout = DefaultLayout;
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            })}
          </Routes>
      </Router>
    </div>
  );
}

export default App;
