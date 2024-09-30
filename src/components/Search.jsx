import { Form, Button, Col, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import helper from '../utils/api_helper';

const Search = ({ handleSearch, genres }) => {
  const searchForm = useFormik({
    initialValues: { name: '', genreId: 0 },
    onSubmit: values => {
      helper.searchProducts(values).then(res => handleSearch(res.data));
    },
  });
  return (
    <Form onSubmit={searchForm.handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              type='text'
              name='name'
              value={searchForm.values.name}
              placeholder='name'
              {...searchForm.getFieldProps('name')}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Select
              name='genreId'
              onChange={searchForm.handleChange}
              value={searchForm.values.genreId}
            >
              <option value={0}>Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Button type='submit'>Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
