import React from 'react'
import InputGroup from './InputGroup';
import './Home.css';
import Skyneb from '../assets/skyneb2.png';

export default function Home() {
    return (
        <section className="home" style={{ backgroundImage: `url(${Skyneb})` }}>
            <div className="container" >
                <div className="row">
                    <div className="col-skyneb">
                        <div className="upper">
                            <h3 className="title">
                                About SkyNeb FX Broker
                            </h3>
                            <p className="about-parag">
                                It is a long established fact that a reader will be distracted
                                by the readeble content of a page when looking at its layout.
                                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                                as opposed to using 'Content here, content here', making it look like readable English.
                        </p>
                            <button className="read-more">
                                Read More
                        </button>
                        </div>
                        <div className="below">
                            <h3 className="title">
                                Open Demo Account
                        </h3>
                            <InputGroup />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
