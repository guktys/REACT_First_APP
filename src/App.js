import React from "react";
import logo from './logo.svg';
import './App.css';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.js';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {/* другой код */}
            </div>
        );
    }
}

export default App;
