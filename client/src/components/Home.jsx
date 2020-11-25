import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Create from './Create';

const Home = () => {
    return (
        <>
            <Jumbotron className="text-center">
                <h1>Custom URL Shortener</h1>
                <h4>Create your own branded URL!</h4>
            </Jumbotron>
            <Create />
        </>
    );
};

export default Home;
