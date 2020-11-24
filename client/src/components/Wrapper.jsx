import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

const Wrapper = props =>{
    return(
        <Container fluid className="p-0">
            {props.children}
        </Container>
    )
}
export default Wrapper;