import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/esm/Collapse';
import InputGroup from 'react-bootstrap/InputGroup';

const errMsg = "Oops, there's an unknown error... Please try again!";
const Create = () => {
    const [custom, setCustom] = useState(true);
    const [url, setUrl] = useState();
    const [customString, setCustomString] = useState();
    const [result, setResult] = useState({
        isSuccess: false,
        msg: errMsg,
        data: {},
    });
    // const [isSuccess, setIsSuccess] = useState(false);
    // const [msg, setMsg] = useState(errMsg);
    const [redirect, setRedirect] = useState(false);
    const createUrl = () => {
        let isSuccess, msg, data;
        console.log('creatingUrl');
        Axios.post('/api/url/create', {
            longUrl: url,
            customString: custom ? customString : '',
        })
            .then(response => {
                switch (response.status) {
                    case 200:
                        isSuccess = true;
                        msg =
                            'A short URL is successfully generated for this website!';
                        // data = response.data;
                        // data = JSON.stringify(response.data);
                        data = response.data;
                        break;
                    case 201:
                        isSuccess = true;
                        console.log(typeof response.data);
                        // const {longUrl, shortUrl, urlCode, date} = response.data;
                        // data = {longUrl, shortUrl, urlCode, date};
                        // data = JSON.stringify(response.data);
                        data = response.data;
                        msg =
                            'Someone has already created a short URL for this website!';
                        break;
                    default:
                        isSuccess = false;
                        msg = errMsg;
                        break;
                }
                console.log(response.status);
                console.log(response.data);
                // alert("Created!");
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            isSuccess = false;
                            console.log('401!');
                            msg =
                                "This website's URL is not valid! Please try again!";
                            break;
                        case 409:
                            isSuccess = false;
                            msg =
                                'Sorry, this short URL address has been taken! Please try again!';
                            break;
                        default:
                            isSuccess = false;
                            msg = errMsg;
                            break;
                    }
                }
                console.log(err.response);
            })
            .finally(() => {
                console.log(msg);
                setResult({ isSuccess, msg, data });
                setRedirect(true);
            });
    };

    if (redirect) {
        console.log(result);
        // return (<Result result={result}/>);
        return <Redirect to={{ pathname: '/result', state: result }} />;
    }
    return (
        <>
            <Container>
                <Form>
                    <Form.Group controlId="formLongUrl">
                        <Form.Label>Step 1: Enter website URL</Form.Label>
                        <FormControl
                            type="url"
                            placeholder="Example: https://www.google.com"
                            onChange={e => setUrl(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomString">
                        <p>Step 2:</p>
                        <Row className="ml-0 mb-2">
                            <Button
                                id="custom-btn"
                                className={'mr-2 ' + (custom ? '' : 'disabled')}
                                onClick={() => {
                                    setCustom(true);
                                }}
                                aria-controls="input-custom-string"
                                aria-expanded={custom}>
                                Customize
                            </Button>
                            <Button
                                id="auto-btn"
                                className={
                                    'mr-2 ' + (!custom ? '' : 'disabled')
                                }
                                onClick={() => setCustom(false)}>
                                Auto-generate
                            </Button>
                        </Row>
                        <Collapse in={custom}>
                            <div id="input-custom-string">
                                <Form.Label>
                                    Enter your custom label:
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="base-url">
                                            {window.location.origin + '/'}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="text"
                                        aria-describedby="base-url"
                                        onChange={e => {
                                            setCustomString(e.target.value);
                                            console.log(e.target.value);
                                        }}
                                        required
                                    />
                                </InputGroup>
                            </div>
                        </Collapse>
                        <Row className="mt-4">
                            <Button
                                className="m-auto btn-lg"
                                variant="primary"
                                onClick={() => createUrl()}>
                                Generate!
                            </Button>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};

export default Create;
