import React, { Component } from 'react'
import '../../static/css/cats.css'
import Header from './Header'


class Cats extends Component {
    constructor() {
        super()
        
        this.InputChange = this.InputChange.bind(this)
        this.CountryChange = this.CountryChange.bind(this)

        this.state = {
            query:"",
            country:"",
            cats: [],
            property:"name"
        }
    }

    componentDidMount() {
        fetch('/api/cats')
        .then(res => res.json())
        .then(cats=> this.setState({cats}))
    }

    InputChange = event =>  {
        this.setState({query: event.target.value.substr(0,30)})
    }

    CountryChange = event => {
        this.setState({country: event.target.value})
    }

    render() {
        let filteredCats = this.state.cats.filter(
            (cat) => {
                return cat.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1 
            }
        )
        if(this.state.country !== ""){
            filteredCats = filteredCats.filter(
                (cat) => {
                    return cat.origin === this.state.country
            })
        }

        //SORT CATS ALPHABETICALLY BY NAME
       filteredCats.sort(dynamicSort())

        return (
            <div>
                <Header actions={{
                    InputChange: this.InputChange,
                    CountryChange: this.CountryChange
                    }}
                />
                {/* Display cat results on screen */}
                <div className="allCats">
                    <div>
                        <h2>Cat Breed</h2>
                    </div>
                    <div>
                        <h2>Description</h2>
                    </div>
                    <div className="spacingS">
                        <h2>Temperament</h2>
                    </div>
                    <div>
                        <h2>Origin</h2>
                    </div>
                </div>
                <div className="containerGrid">
                {filteredCats.map(cat => 
                    <div className="allCats Cards" key={cat._id}>
                        <div>
                            <h3 className="breedName">{cat.name}</h3>
                        </div>
                        <div>
                            <p className="catDescription">{cat.description}</p> 
                        </div>
                        <div className="traitsDiv">
                            {cat.temperament.map(trait =>
                            <p key={trait} className="traits">{trait},</p>
                            )}
                            </div>
                        <div>
                            <img className="originFlag" src={`${require('../../static/flags/'+`${cat.origin}.svg`)}`} alt='flag.svg'/>
                            {cat.origin}
                        </div>
                    </div>
                    
                )
                    
                }
                </div>
            </div>
        );
    }
}

export default Cats

function dynamicSort() {
    return function(a, b) {
        return a["name"].localeCompare(b["name"])
    }
}