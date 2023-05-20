// App.js

import React, {Component} from "react";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.js';

class App extends Component {

    componentDidMount() {


    }

    render() {

        return (
            <>
                <div>
                    <Header />
                </div>

            </>
        );
    }
}

export default App;
