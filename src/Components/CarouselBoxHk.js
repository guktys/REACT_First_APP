import {Carousel} from "react-bootstrap";
import MushroomsImg from '../assets/pexels-valeria-november-16146373.jpg';
import OceanImg from '../assets/pexels-valeria-november-16074293.jpg';
import FieldImg from '../assets/pexels-cottonbro-studio-3585017.jpg';
import {Component} from "react";

class CarouselBoxHk extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={OceanImg}
                        alt="Ocean"/>
                    <Carousel.Caption>
                        <h3>Ocean image</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, est?</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={MushroomsImg}
                        alt="Mushrooms"/>
                    <Carousel.Caption>
                        <h3>Mushrooms image</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem, est?</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default CarouselBoxHk;

