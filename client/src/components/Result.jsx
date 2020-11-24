import React, { useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../App.css';

const Result = props => {
    let location = useLocation();
    const[redirect, setRedirect] = useState(false);
    console.log(location);
    const { isSuccess, msg, data } = location.state || {};
    const {longUrl, shortUrl, urlCode, date} = data || {};
    if(redirect){
        return <Redirect to={'/' + urlCode + '/edit'}/>;
    }
    return(
        <>
            <Jumbotron className='text-center'>
                <h1>Custom URL Shortener</h1>
                <h4>Create your own branded URL!</h4>
            </Jumbotron>
            <div className={'m-5 ' + (isSuccess ? 'success': 'fail')} >
                <h3>{isSuccess ? 'Success!' : 'Failed...'}</h3>
                <p>{msg}</p>
                {
                    data && 
                    <div>
                        <p>Long URL: {longUrl}</p>
                        <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
                        <p>Created at: {date}</p>
                    </div>
                }
            </div>
            { isSuccess && data &&
                <div className="m-5">
                    <h5>Made a mistake? Go back and edit your URL!</h5>
                    <Button onClick={() => setRedirect(true)}>
                        Edit
                    </Button>
                </div>
            }
           
        </>
       
    );
};

export default Result;
