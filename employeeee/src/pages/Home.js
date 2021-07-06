import React, { Component } from 'react';
import Header from '../components/Header';
import API from "../utils/API";
import Wrapper from '../components/Wrapper';
import "./index.css";

class Home extends Component  {
  state = {
    users: [],
    searchByName : "",
    searchByCity : "",
  }
  
    componentDidMount() {
        API.getEmployees()
        .then(res => {
            console.log(res.data.results);
            this.setState({
                users: res.data.results
            });
        })
        .catch(err => console.log(err));
    }

  updateSearchbyName = (event) => {
    this.setState({ searchByName: event.target.value });
    let filteredUsers = this.state.users.filter(
        (users) => {
          return (users.name.last.toLowerCase()).indexOf(this.state.searchByName.toLowerCase()  ) !== -1;
        }
      );
    this.setState({users: filteredUsers})
  }

  updateSearchbyCity = (event) => {
    this.setState({ searchByCity: event.target.value });
    let filteredUsers = this.state.users.filter(
        (users) => {
          return (users.location.city.toLowerCase()).indexOf(this.state.searchByCity.toLowerCase()  ) !== -1;
        }
      );
    this.setState({users: filteredUsers})
  }

  resetKey = () => {
    window.location.reload()
  }

  render() {

    return (
      <div>

        <Header>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Search by Last Name</span>
            </div>

            <input type="text" className="form-control" placeholder="Search by Last Name" aria-label="Search by Last Name" aria-describedby="basic-addon1" value={this.state.searchByName} onChange={this.updateSearchbyName.bind(this)}/>
        </div>

        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Search by City Name</span>
            </div>
            <input type="text" className="form-control" placeholder="Search by City Name" aria-label="Search by City Name" aria-describedby="basic-addon1" value={this.state.searchByCity} onChange={this.updateSearchbyCity.bind(this)}/>
        </div>
        <button type="button" className="btn btn-light" onClick={this.resetKey}>Reset Search</button>

        </Header>
        <Wrapper>
                {this.state.users.map(user => {
                return (
                    <div class="card" style={{width: "18rem"}}>
                    <img src={user.picture.large} class="card-img-top" alt="person"/>
                    <div class="card-body">
                        <h5 class="card-title">{user.name.first} {user.name.last}</h5>
                        <p class="card-text">{user.location.city}, {user.location.country}</p>
                    </div>
                    </div>
                );
                })}
        </Wrapper>
        
      </div>
    );
  }
}

export default Home;