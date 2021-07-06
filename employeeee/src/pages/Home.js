import React, { Component } from 'react';
import Header from '../components/Header';
import API from "../utils/API";
import Wrapper from '../components/Wrapper';

class Home extends Component  {
  state = {
    users: [],
    search : ""
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
    this.setState({ search: event.target.value });
  }

  render() {
    let filteredUsers = this.state.users.filter(
      (users) => {
        return (users.name.last.toLowerCase()).indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

    return (
      <div>

        <Header>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Search by Last Name</span>
            </div>
            <input type="text" class="form-control" placeholder="Search by Last Name" aria-label="Search by Last Name" aria-describedby="basic-addon1" value={this.state.search} onChange={this.updateSearchbyName.bind(this)}/>
        </div>
        </Header>
        <Wrapper>
                {filteredUsers.map(user => {
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