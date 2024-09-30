import { Form, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { parse, format } from 'date-fns';
import helper from '../utils/api_helper';

const Create = ({ genres, handleCreate }) => {
  const [show, setShow] = useState(false);
  const validationSchema = yup.object({
    code: yup
      .string()
      .lowercase()
      .matches(/^prod-[0-9]{4}$/, 'format: prod-0001')
      .required('code field is required'),
    name: yup
      .string()
      .max(100, ({ max }) => `less than ${max}`)
      .required('name field is required'),
    date: yup
      .date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, 'dd/MM/yyyy', new Date());
        return result;
      })
      .max(format(Date.now(), 'dd/MM/yyyy'), ({ max }) => `less than ${max}`)
      .required('date field is required'),
    quantity: yup
      .number()
      .integer('must be an integer')
      .min(0, ({ min }) => `greater than ${min}`)
      .required('quantity is required'),
    price: yup
      .number()
      .min(0, ({ min }) => `greater than ${min}`)
      .required('required'),
  });

  const addForm = useFormik({
    initialValues: {
      code: '',
      name: '',
      genreId: 1,
      price: 0,
      quantity: 0,
      date: '',
      description: '',
    },
    onSubmit: values => {
      helper.createProducts(values).then(() => {
        handleCreate();
        handleClose();
      });
    },
    validationSchema,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant='outline-primary' onClick={handleShow}>
        Add new
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addForm.handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type='text'
                name='code'
                value={addForm.values.code}
                placeholder='format: prod-0001'
                {...addForm.getFieldProps('code')}
              />
              {addForm.touched.code && addForm.errors.code ? (
                <p>{addForm.errors.code}</p>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={addForm.values.name}
                {...addForm.getFieldProps('name')}
              />
              {addForm.touched.name && addForm.errors.name ? (
                <p>{addForm.errors.name}</p>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Genre</Form.Label>
              <Form.Select
                name='genreId'
                onChange={addForm.handleChange}
                value={addForm.values.genreId}
              >
                {genres.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                min='0'
                name='price'
                value={addForm.values.price}
                {...addForm.getFieldProps('price')}
              />
              {addForm.touched.price && addForm.errors.price ? (
                <p>{addForm.errors.price}</p>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>quantity</Form.Label>
              <Form.Control
                type='number'
                min='0'
                name='quantity'
                value={addForm.values.quantity}
                {...addForm.getFieldProps('quantity')}
              />
              {addForm.touched.quantity && addForm.errors.quantity ? (
                <p>{addForm.errors.quantity}</p>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Import date</Form.Label>
              <Form.Control
                type='text'
                name='date'
                placeholder='dd/MM/yyyy'
                value={addForm.values.date}
                {...addForm.getFieldProps('date')}
              />
              {addForm.touched.date && addForm.errors.date ? (
                <p>{addForm.errors.date}</p>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Descripion</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='description'
                value={addForm.values.description}
                {...addForm.getFieldProps('description')}
              />
              {addForm.touched.description && addForm.errors.description ? (
                <p>{addForm.errors.description}</p>
              ) : null}
            </Form.Group>
            <Button variant='primary' type='submit'>
              Add new
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
};

export default Create;
