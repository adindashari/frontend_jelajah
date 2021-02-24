import React from 'react';
import { Link } from 'react-router-dom';
 
class Persons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {persons: []};
		this.headers = [
			{ key: 'id', label: 'id'},
			{ key: 'name', label: 'name' },
			{ key: 'age', label: 'age' },
            { key: 'city', label: 'city' }
		];
		this.deleteperson = this.deleteperson.bind(this);
	}
	
	componentDidMount() {
		fetch('http://localhost/backend/index.php/webrestcontroller/persons')
			.then(response => {
				return response.json();
			}).then(result => {
				console.log(result);
				this.setState({
					persons:result
				});
			});
	}
	
	deleteperson(id) {
		if(window.confirm("Yakin menghapus data?")) {
			fetch('http://localhost/backend/index.php/webrestcontroller/delete_person/' + id, {
	                method : 'DELETE'
				}).then(response => { 
					if(response.status === 200) {
						alert("data berhasil terhapus!");
                            fetch('http://localhost/backend/index.php/webrestcontroller/persons')
						.then(response => {
							return response.json();
						}).then(result => {
							console.log(result);
							this.setState({
								persons:result
							});
						});
					} 
			 });
		}
	}
	
	render() {
		return (
			<div id="container">
				<Link to="/create">Tambah Data</Link>
				<p/>
				<table>
					<thead>
						<tr>
						{
							this.headers.map(function(h) {
								return (
									<th key = {h.key}>{h.label}</th>
								)
							})
						}
						  <th>Aksi</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.persons.map(function(item, key) {
							return (
								<tr key = {key}>
								  <td>{item.id}</td>
								  <td>{item.name}</td>
								  <td>{item.age}</td>
                                  <td>{item.city}</td>
								  <td>
										<Link to={`/update/${item.id}`}>Ubah</Link>
										 
										<a href="javascript:void(0);" onClick={this.deleteperson.bind(this, item.id)}>Hapus</a>
								  </td>
								</tr>
											)
							}.bind(this))
						}
					</tbody>
				</table>
			</div>
		)
	}
}
 
export default Persons;