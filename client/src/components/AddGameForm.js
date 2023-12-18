import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

function AddGameForm() {
  const history = useHistory();

  const validationSchema = Yup.object({
    newTitle: Yup.string().required('Game Title is required'),
    newImage: Yup.string().required('Image URL is required'),
    newRating: Yup.string().required('Rating is required'),
    newPrice: Yup.string().required('Price is required'),
  });

  const formik = useFormik({
    initialValues: {
      newTitle: '',
      newImage: '',
      newRating: '',
      newPrice: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newGame = {
        title: values.newTitle,
        image: values.newImage,
        rating: values.newRating,
        price: values.newPrice,
      };

      fetch('http://localhost:5555/addgame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      })
        .then((resp) => resp.json())
        .then((respData) => {
          console.log(respData);
          history.push('/games');
        })
        .catch((error) => {
          console.error('Error adding game', error);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.errors.newTitle && formik.touched.newTitle && (
        <p style={{ color: 'red' }}>{formik.errors.newTitle}</p>
      )}
      <input
        value={formik.values.newTitle}
        onChange={formik.handleChange}
        placeholder='Enter Game Title'
        type='text'
        name='newTitle'
      />

      {formik.errors.newImage && formik.touched.newImage && (
        <p style={{ color: 'red' }}>{formik.errors.newImage}</p>
      )}
      <input
        value={formik.values.newImage}
        onChange={formik.handleChange}
        placeholder='Enter Image URL'
        type='text'
        name='newImage'
      />

      {formik.errors.newRating && formik.touched.newRating && (
        <p style={{ color: 'red' }}>{formik.errors.newRating}</p>
      )}
      <input
        value={formik.values.newRating}
        onChange={formik.handleChange}
        placeholder='Enter Rating'
        type='text'
        name='newRating'
      />

      {formik.errors.newPrice && formik.touched.newPrice && (
        <p style={{ color: 'red' }}>{formik.errors.newPrice}</p>
      )}
      <input
        value={formik.values.newPrice}
        onChange={formik.handleChange}
        placeholder='Enter Price'
        type='text'
        name='newPrice'
      />

      <button type='submit'>Add Game</button>
    </form>
  );
}

export default AddGameForm;