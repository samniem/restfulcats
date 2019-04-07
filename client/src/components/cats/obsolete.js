import React, { Component } from 'react'
import './cats.css'

class Cats extends Component {
    constructor() {
        super()
        this.state = {
            query:"",
            cats: '',
            filteredCats: []
        }
    }

    componentDidMount() {
        fetch('/api/cats')
        .then(res => res.json())
        .then(filteredCats=> this.setState({filteredCats}))
    }

    InputChange = event =>  {
        console.log(this.state.filteredCats)
        const query = event.target.value
        this.setState(previousState => {
            const filteredCats = previousState.filteredCats.filter(element => {
                return element.name.toLowerCase().includes(query.toLowerCase())
            })
            return{
                query,
                filteredCats
            }
        })
    }

    render() {
        return (
        <div>
            <div className="searchForm">
                <form>
                    <input 
                        placeholder="Search for a breed.."
                        value={this.state.query}
                        onChange={this.InputChange}
                    />
                </form>
            </div>
            <div className="searchForm">
                   <form>
                    <select onChange={this.InputChange} placeholder="Country">
                        <option value="">Country</option>
                        <option value="United States">United States</option>
                        <option value="France">France</option>
                    </select> 
                </form>
            </div>

            <div className="allCats">
                <div>
                    <h2>Cat Breed</h2>
                </div>
                <div>
                    <h2>Description</h2>
                </div>
                <div>
                    <h2>Traits</h2>
                </div>
            </div>

            {this.state.filteredCats.map(cat => 
                <div className="allCats" key={cat._id}>
                    <div>
                        <h3>{cat.name}</h3>
                        <p>Origin: {cat.origin}</p>
                    </div>
                    <div>
                        <p className="catDescription">{cat.description}</p> 
                    </div>
                    <div className="traitsDiv">
                    {cat.temperament.map(trait =>
                        <p key={trait} className="traits">{trait},</p>
                    )}
                    </div>
                </div>)
            }

        </div>
        );
    }
}

export default Cats
