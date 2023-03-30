import React, { Component } from 'react';

class Contador extends Component {
    constructor(props) {
        super(props);
        const contador = localStorage.getItem('contador');
        this.state = { contador: contador ? parseInt(contador) : 0 };
    }

    componentDidMount() {
        const { contador } = this.state;
        localStorage.setItem('contador', contador + 1);
        this.setState({ contador: contador + 1 });
    }


    render() {
        return (
            <>
                <h1>Número de visitantes: {this.state.contador}</h1>
            </>
        );
    }
}

export default Contador;
