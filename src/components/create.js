import React from 'react';
import { Link } from 'react-router-dom';
 
class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', age: '', city: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
	  const state = this.state
	  state[event.target.name] = event.target.value
	  this.setState(state);
  }
  handleSubmit(event) {
	  event.preventDefault();
	  fetch('http://localhost/backend/index.php/webrestcontroller/add_person', {
			method: 'POST',
			body: JSON.stringify({
				name: this.state.name,
				age: this.state.age,
                city: this.state.city
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
				if(response.status === 200) {
					alert("Data berhasil ditambah");
				}
			});
  }
  render() {
    return (
		<div id="container">
		  <Link to="/">List data</Link>
			  <p/>
			  <form onSubmit={this.handleSubmit}>
				<p>
					<label>Name</label>
					<input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
				</p>
				<p>
					<label>Age</label>
					<input type="text" name="age" value={this.state.age} onChange={this.handleChange} placeholder="Age" />
				</p>
                <p>
					<label>City</label>
					<input type="text" name="city" value={this.state.city} onChange={this.handleChange} placeholder="City" />
				</p>
				<p>
					<input type="submit" value="Tambah" />
				</p>
			  </form>
		   </div>
    );
  }
}
 
export default Create;