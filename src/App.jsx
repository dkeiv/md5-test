import { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import './App.css';

import helper from './utils/api_helper';
import Search from './components/Search';
import Create from './components/Create';
import List from './components/List';

function App() {
  const [genres, setGenres] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    helper.fetchAllGenres().then(res => setGenres(res.data));
  }, []);
  useEffect(() => {
    helper.fetchAllProducts().then(res => setProducts(res.data));
  }, []);

  const handleCreate = () =>
    helper.fetchAllProducts().then(res => setProducts(res.data));
  const handleSearch = searchResult => setProducts(searchResult);

  return (
    <Container className='w-75'>
      <Row>
        <Col sm={8}>
          <Search genres={genres} handleSearch={handleSearch} />
        </Col>
        <Col sm={4}>
          <Create genres={genres} handleCreate={handleCreate} />
        </Col>
      </Row>
      {products.length > 0 ? (
        <List list={products} genres={genres} />
      ) : (
        <p>No data</p>
      )}
    </Container>
  );
}

export default App;
