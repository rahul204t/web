import React, { Component } from "react";
import axios from "axios";


class UserList extends Component {
  state = {
    users: [],
    searchTerm: "",
  };

  componentDidMount() {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then(response => {
        this.setState({ users: response.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSearch = event => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const filteredUsers = this.state.users.filter(user => {
      return user.first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    });

    return (
      <div>
        <input
          type="text"
          placeholder="Search by first name"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
        />
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id} >
              <img src={user.avatar} style={{display:"flex"}} />
              {user.first_name} 
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
