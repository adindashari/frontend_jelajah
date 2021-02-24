import React from 'react';
import { Link, withRouter } from 'react-router-dom';
 
class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: '', name: '', age: '', city: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
	fetch('http://localhost/backend/index.php/webrestcontroller/person?id=' + this.props.match.params.id)
		.then(response => {
			return response.json();
		}).then(result => {
			console.log(result);
			this.setState({
				id:result.id,
				name:result.name,
				age:result.age,
                city:result.city
			});
		});
  }
  handleChange(event) {
	  const state = this.state
	  state[event.target.name] = event.target.value
	  this.setState(state);
  }
  handleSubmit(event) {
	  event.preventDefault();
	  fetch('http://localhost/backend/index.php/webrestcontroller/update_person', {
			method: 'PUT',
			body: JSON.stringify({
				id:this.state.id,
				name: this.state.name,
				age: this.state.age,
                city: this.state.city
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
				if(response.status === 200) {
					alert("Berhasil diubah!");
				}
			});
  }
  
  render() {
    return (
			<div id="container">
			  <Link to="/">List Data</Link>
				  <p/>
				  <form onSubmit={this.handleSubmit}>
					<input type="hidden" name="id" value={this.state.id}/>
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
							<input type="submit" value="Ubah" />
						</p>
				  </form>
			   </div>
    );
  }
}
 
export default Update;