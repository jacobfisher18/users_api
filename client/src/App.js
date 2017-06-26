import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.handleGetSubmit = this.handleGetSubmit.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handlePutSubmit = this.handlePutSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
  }
  getInitialState() {
    return({
      users: []
    });
  }

  handlePostSubmit(e) {
      e.preventDefault();
      
      const postOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: this.refs.post_name.value,
              age: this.refs.post_age.value
          })
      };

      fetch('/api/users', postOptions).then(function(data) {
          return data.json();
      }).then({
          //success
      });
  }

  handleGetSubmit(e) {
    e.preventDefault();

    fetch('/api/users').then(function(data) {
        return data.json();
    }).then( json => {
        this.setState({
            users: json
        })
    });
  }

  handlePutSubmit(e) {
    e.preventDefault();

    const putOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: this.refs.put_name.value,
            age: this.refs.put_age.value
        })
    };

    fetch('/api/users/' + this.refs.put_id.value, putOptions).then(function(data) {
        return data.json();
    }).then({
        //success
    });
  }

  handleDeleteSubmit(e) {
    e.preventDefault();

    fetch('/api/users/' + this.refs.delete_id.value, {method: 'DELETE'}).then(function(data) {
        return data.json();
    }).then({
        //success
    });
  }

  render() {

    var users = this.state.users;
    users = users.map(function(user, index) {
      return (
      <tr key={index}>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td>{user.age}</td>
      </tr>
      );
    });

    return (
      <div id="users-container">

        <form id="get-form" onSubmit={this.handleGetSubmit}>
            <h3>GET</h3>
            <input type="submit" value="GET All Users"/>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                {users}
                </tbody>
            </table>
        </form>

        <form id="post-form" onSubmit={this.handlePostSubmit}>
            <h3>POST</h3>
            <input type="text" ref="post_name" placeholder="name"/>
            <input type="text" ref="post_age" placeholder="age"/>
            <input type="submit" value="Post New User"/>
        </form>

        <form id="put-form" onSubmit={this.handlePutSubmit}>
            <h3>PUT</h3>
            <input type="text" ref="put_id" placeholder="id"/>
            <input type="text" ref="put_name" placeholder="name (optional)"/>
            <input type="text" ref="put_age" placeholder="age (optional)"/>
            <input type="submit" value="Update User"/>
        </form>

        <form id="delete-form" onSubmit={this.handleDeleteSubmit}>
            <h3>DELETE</h3>
            <input type="text" ref="delete_id" placeholder="id"/>
            <input type="submit" value="Delete User with ID"/>
        </form>
    </div>
    );
  }
}

export default App;
