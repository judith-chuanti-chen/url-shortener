import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { PropTypes } from 'prop-types';
const Wrapper = props => {
    return (
        <Container fluid className="p-0">
            {props.children}
        </Container>
    );
};

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Wrapper;
