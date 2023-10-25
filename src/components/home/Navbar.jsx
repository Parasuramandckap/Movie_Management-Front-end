

import logo from "../../assets/images/Home_page_logo.png"
import "../../assets/CSS/Home.css"
const Navbar = () => {
 
  return (
    <div className="navbar">
    <div className="left-side">
        <div className="logo">
            <img src={logo} alt="Logo" />
        </div>
    </div>
    <div className="middle">
        <div className="categories">
        <ul className="categories">
            {/* <li id="Home-icon" onClick={() => handleMenuItemClick('home')} className={activeItem === 'home' ? 'active' : ''}><i className="fa-solid fa-house"></i><a className={activeItem === 'home' ? 'active' : ''} onClick={() => handleMenuItemClick('home')}>Home</a></li> */}
            {/* <li id="Movie-icon" onClick={() => handleMenuItemClick('movie')} className={activeItem === 'movie' ? 'active' : ''} ><i className="fa-solid fa-film"></i><a onClick={() => handleMenuItemClick('movie')} className={activeItem === 'movie' ? 'active' : ''} >Movie</a></li> */}
        </ul>
        </div>
  
    </div>
    <div class="right-side">
        <div className="add-movie">
            <button className="btn btn-primary">Add Movie</button>
        </div>
        <div class="profile">
        <i class="fa-solid fa-user"></i>
        </div>
        <div class="search">
            <input className="search-bar" type="search" />
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
        </div>
    </div>
</div>
  );
};

export default Navbar;
