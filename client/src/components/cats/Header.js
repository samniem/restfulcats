import React, { Component } from 'react'
import '../../static/css/Header.css'

import CatLogo from '../../static/logo/telicat_logo.png'

class Header extends Component {
    render(){
        return(
            <div>
                <header className="App-header">
                <img id="catLogo" src={CatLogo} alt="catlogo.png"/>
                    <h1>RESTful Cats</h1>
                    <div className="searchContainer">
                        <div className="searchForm">
                            Search By Breed
                            <form>
                                <input 
                                    value={this.props.query}
                                    onChange={this.props.actions.InputChange}
                                />
                            </form>
                        </div>
                        <div className="searchForm">
                            Search By Origin
                            <form>
                                <select>
                                    <optgroup>
                                    <option onClick={this.props.actions.CountryChange} value="">Any</option>
                                    <option onTouchStart={this.props.actions.CountryChange} onClick={this.props.actions.CountryChange} value="France">France</option>
                                    <option onTouchStart={this.props.actions.CountryChange} onClick={this.props.actions.CountryChange} value="Japan">Japan</option>
                                    <option onClick={this.props.actions.CountryChange} value="Singapore">Singapore</option>
                                    <option onClick={this.props.actions.CountryChange} value="Somalia">Somalia</option>
                                    <option onClick={this.props.actions.CountryChange} value="Turkey">Turkey</option>
                                    <option onClick={this.props.actions.CountryChange} value="United Kingdom">United Kingdom</option>
                                    <option onClick={this.props.actions.CountryChange} value="United States">United States</option>
                                    </optgroup>
                                </select> 
                            </form>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header