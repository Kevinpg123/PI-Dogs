import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import Style from './NavBar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { handlePageNum } from '../../redux/action/action'


function NavBar() {
    const location = useLocation();



    return (
        <div className={Style.bigDiv}>
            <div className={Style.navDiv}>
                <Link to="/home">
                    <button className={Style.Button}>Home</button>
                </Link>
                <Link to="/form">
                    <button className={Style.Button}>Create</button>
                </Link>
                <Link to="/about">
                    <button className={Style.Button}>About</button>
                </Link>
            </div>
            <div className={Style.searchDiv}>
                {

                    location.pathname == "/home" && <SearchBar />

                }
            </div>
        </div>
    )
}

export default NavBar