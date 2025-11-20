import React from 'react'
import PremiumTable from './Layouts/TABLE_DATA'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import AddForm from './Layouts/AddForm';
import Single_View from './Layouts/Single_View';

const App = () => {
  return (
    <>
      <Router>
        {/* Navbar */}
        <Routes>
          <Route path='/' element={<PremiumTable/>} />
          <Route path='/singleView/:empId' element={<Single_View/>}/>
          <Route path='/addform' element={<AddForm/>} />
          <Route path='/addform/:empId' element={<AddForm/>} />

        </Routes>
        {/* Footer */}
      </Router>
    </>
  )
}

export default App