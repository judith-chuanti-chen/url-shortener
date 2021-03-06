import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import Wrapper from './Wrapper';
import LoadSpinner from './LoadSpinner';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const List = () => {
    const [list, setList] = useState([]);
    const [redirect, setRedirect] = useState();
    const [loading, setLoading] = useState(true);
    const getAll = () => {
        Axios.get('/api/url/all')
            .then(response => {
                setList(response.data);
            })
            .catch(err => {
                console.log(err);
                setRedirect({ path: '/unknown-error' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleEdit = urlCode => {
        setRedirect({ path: '/url/' + urlCode + '/edit' });
    };
    useEffect(() => {
        getAll();
    }, []);

    if (loading) {
        return <LoadSpinner />;
    }
    if (redirect) {
        const { path, result } = redirect;
        return <Redirect to={{ pathname: path, state: result }} />;
    }

    return (
        <>
            <Wrapper>
                <div className="row py-5">
                    <div className="col-lg-10 mx-auto">
                        <div className="card rounded shadow border-0">
                            <div className="card-body bg-white rounded">
                                <div className="table-responsive">
                                    <table
                                        id="example"
                                        className="table table-striped table-bordered">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Long URL</th>
                                                <th>Short URL</th>
                                                <th>Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.map(url => {
                                                // console.log(Date.parse(url.date));
                                                const date = new Date(url.date);
                                                return (
                                                    <tr key={url.urlCode}>
                                                        <td>{url.longUrl}</td>
                                                        <td>
                                                            <a
                                                                href={
                                                                    url.shortUrl
                                                                }>
                                                                {url.shortUrl}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            {date.toUTCString()}
                                                        </td>
                                                        <td>
                                                            <Row className="flex align-content-center ml-2 mr-2">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            url.urlCode
                                                                        )
                                                                    }>
                                                                    Edit
                                                                </Button>
                                                            </Row>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default List;
