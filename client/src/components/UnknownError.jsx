import React from 'react';
import Result from './Result';

const UnknownError = () => {
    const errMsg = "Oops, there's an unknown error... Please try again!";
    const result = { isSuccess: false, msg: errMsg };

    return <Result result={result} />;
};
export default UnknownError;
