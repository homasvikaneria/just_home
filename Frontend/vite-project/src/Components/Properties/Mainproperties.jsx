import React from 'react';
import './mainproperties.css'; // Import the CSS file for styling
// import Mainnavbar  from './Mainnav/Mainnavbar'; // Import the main navigation component
import Mainnavbar from '../Mainnav/Mainnavbar'; // Import the main navigation component
import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';
import card4 from '../../assets/card4.png';
import card5 from '../../assets/card5.png';
import card6 from '../../assets/card6.png';
// import greenbgc from '../../assets/greenbgc.png';
import searchbutton from '../../assets/searchbutton.png';



const App = () => {
  return (
    <div>
      <Mainnavbar />
      <div className="App">
        {/* <header className="header">
        <h1>JustHome</h1>
      </header> */}

        <section className="city-properties">
          <h1 className='heading1'>Find Properties in These Cities</h1>
          <p className='just_below'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className='city-cards-line1'>
            <div className='card1'>
              <img src={card1} alt="" />
            </div>
            <div className='card2'>
              <img src={card2} alt="" />
            </div>
            <div className='card3'>
              <img src={card3} alt="" />
            </div>
          </div>
          <div className='city-cards-line2'>

            <div className='card4'>
              <img src={card4} alt="" />
            </div>
            <div className='card5'>
              <img src={card5} alt="" />
            </div>
            <div className='card6'>
              <img src={card6} alt="" />
            </div>
          </div>
        </section>

        <section className="search-section">
          {/* <div className='greenbgc'><img className='greenbgc' src={greenbgc} alt="" />
          </div> */}
          <h2 className='heading2'>Believe in finding it</h2>
          <p className='for-sale-for-rent'>Search properties for sale and to rent  </p>
          <div className="searchbar">
            <input className="search" type="text" placeholder="What type of property you are looking for" />
            <button className="searchbtn">
              <img src={searchbutton} alt="Search" />
            </button>
          </div>

        </section>

        <section className="top-picks">
          <h2>Top Picks</h2>

        </section>

        <section className="agent-section">
          <h2>Become a Real Estate Agent</h2>
          <p>Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas in morbi. Leo diam diam.</p>
          <button>Register Now →</button>
        </section>


      </div >
    </div >
  );
}

export default App;