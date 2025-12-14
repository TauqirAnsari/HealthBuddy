import React from 'react'
import {Header, Footer} from './components/Index';
import AllRoutes from './routes/AllRoutes'

function App() {
  return (
    <>
      <Header/>
      <main>
        <AllRoutes/>
      </main>
      <Footer/>
    </>
  );
}

export default App