import React, { Component } from 'react';
import { connect } from 'react-redux';


class App extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PETS'
        })
    }

    render() {
        return (

            <div>
                <h1>PETS</h1>
                <h2>Add Pet</h2>
                <input type="text" placeholder="name" />
                <input type="text" placeholder="breed" />
                <input type="text" placeholder="color" />
                <button>Submit</button>
                <table>
                    <thead>
                        <tr>
                            <th>Pet Name</th>
                            <th>Pet Breed</th>
                            <th>Pet Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.petsReducer.map((pet) => {
                            return (
                                <tr key={pet.id}>
                                    <td>{pet.name}</td>
                                    <td>{pet.breed}</td>
                                    <td>{pet.color}</td>
                                    <td><button>delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>



        )
    }
}


const mapReduxStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapReduxStateToProps)(App);