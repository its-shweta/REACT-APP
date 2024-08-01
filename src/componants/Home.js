import { useEffect, useState } from "react";
import './Home.scss';



const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [countries, setCountries] = useState([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/users`)
            .then(res => res.json())
            .then(d => {
                setData(d.users);
                setFilteredData(d.users); 

               
                const uniqueCountries = [...new Set(d.users.map(user => user.address.country))];
                setCountries(['All', ...uniqueCountries]);

                const uniqueGenders = [...new Set(d.users.map(user => user.gender))];
                setGenders(['All', ...uniqueGenders]);
            })
            .catch(err => console.error(err));
    }, []);

    const filterByCountry = (country) => {
        const newData = data;
        const result = country === 'All' ? newData : newData.filter(item => item.address.country === country);
        setFilteredData(result);
    };

    const filterByGender = (gender) => {
        const newData = data;
        const result = gender === 'All' ? newData : newData.filter(item => item.gender === gender);
        setFilteredData(result);
    };

    useEffect(() => {
        filterData();
    }, [selectedCountry, selectedGender]);

    const filterData = () => {
        let result = data;

        if (selectedCountry !== 'All') {
            result = result.filter(user => user.address.country === selectedCountry);
        }

        if (selectedGender !== 'All') {
            result = result.filter(user => user.gender === selectedGender);
        }

        setFilteredData(result);
    };

    const handleCountryChange = (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        filterByCountry(country);
    };

    const handleGenderChange = (event) => {
        const gender = event.target.value;
        setSelectedGender(gender);
        filterByGender(gender);
    };

    return (
        
        <div className="Navbar">
            <div className="header">
                <h1>Employees</h1>
                <div className="filter-container">
                    <button className="filter-btn">
                        <i className="fa fa-filter" style={{ color: '#531809' }}></i>
                    </button>
                    <select 
                        value={selectedCountry}   onChange={handleCountryChange}   className="filter-select-data"
                    >
                        <option value="All">Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                    <select     value={selectedGender}   onChange={handleGenderChange}       className="filter-select-data"
                    >
                        <option value="All">Select Gender</option>
                        {genders.map((gender, index) => (
                            <option key={index} value={gender}>{gender}</option>
                        ))}
                    </select>
                </div>
            </div>
            
                <div className="navbar">
                    
                    <div>ID <i className="fa-solid fa-arrow-up fa-xs arrow-icon"></i><i className="fa-solid fa-arrow-down fa-xs arrow-icon"></i></div>
                    <div>Image</div>
                    <div>Full Name <i className="fa-solid fa-arrow-up fa-xs arrow-icon"></i><i className="fa-solid fa-arrow-down fa-xs arrow-icon"></i></div>
                    <div>Demography</div>
                    <div>Designation</div>
                    <div>Location</div>
                </div>
                <div className="employeedata">
                <section >

                    {filteredData.map((item) => {
                        const age = new Date().getFullYear() - new Date(item.dateOfBirth).getFullYear();
                        const genderInitial = item.gender.charAt(0).toUpperCase(); 
                        return (
                            <div key={item.id} className="emp-data"> 
                              <div>0{item.id}</div>
                                <img 
                                    src={item.image} 
                                    alt={`${item.firstName} ${item.lastName}`} 
                                    className="Emp-image"
                                />
                                
                                <div>{item.firstName} {item.maidenName} {item.lastName}</div>
                                <div>{genderInitial} / {item.age}</div> 
                                <div>{item.company.title}</div>
                                <div>{item.address.city}, {item.address.state}</div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </div>

    );
}

export default Home;
