import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';
import ResidentInfo from './ResidentInfo';

const SearchBar = () => {
    const [location, setLocation] = useState({})
    const [residents, setResidents] = useState([])
    const [places, setPlaces] = useState([])
    const [loading, SetLoading] = useState(true)

    //code for save the array of places
    useEffect(() => {
        let i = 1
        while (i <= 7) {

            axios.get(`https://rickandmortyapi.com/api/location?page=${i}`)
                .then((res) => {
                    res.data.results.forEach((e) => { places[e.id] = e })
                })
            i++
        }
        setPlaces(places)
    }, [])

    const changeLocation = function (ids) {
        let id = parseInt(ids)

        axios.get(`https://rickandmortyapi.com/api/location/${id}`)
            .then((res) => {
                setLocation(res.data)
                setResidents(res.data.residents)
                SetLoading(true)
            })
    }


    //code for show a random default location
    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/location/${Math.floor(Math.random() * 120 + 1)}`)
            .then((res) => {

                setLocation(res.data)
                setResidents(res.data.residents)
            })

    }, [])
    let [searchResults, setSearchResults] = useState([])
    let filterSearch = function (data) {

        searchResults = places.filter((e) => {
            return e.name.indexOf(data) !== -1
        })
        setSearchResults(searchResults)
    }
    let selectArray = []
    if (searchResults[0] === undefined) {
        selectArray = places
    } else {
        selectArray = searchResults
    }
    return (
        <div className="app">
            {loading ? (
            <>
                <div className='search'>
                    <h1>Rick and Morty App</h1>
                    <div className='filter'>
                        <input placeholder='Enter the location name' type="text" onChange={(e) => { filterSearch(e.target.value) }} />
                        <select name="locations" id="" onChange={((e) => { changeLocation(e.target.value) })}>
                            <option disabled="">Select the location</option>
                            {
                                selectArray.map((e) => {

                                    return (<option value={e.id} key={e.name}>{e.name}</option>)
                                })
                            }
                        </select>

                    </div>



                    <h2>Location: {location.name}</h2>
                    <ul>
                        <li>Type: <span>{location.type}</span></li>
                        <li>Dimension: <span>{location.dimension}</span></li>
                        <li>Population: <span>{location.residents?.length}</span></li>
                    </ul>
                </div>

                <h2>Residents</h2>
                <div className='totalCards'>
                    {residents.map((resident) => {
                        resident

                        return (<ResidentInfo link={resident} key={resident} />)
                    })}
                </div>
            </>):(<h2>Loading...</h2>)}
        </div>
    );
};

export default SearchBar;