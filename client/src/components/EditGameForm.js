import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function EditGameForm({ gameId, onClose, onEdit }) {
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    rating: Yup.string().required('Rating is required'),
    price: Yup.string().required('Price is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      rating: '',
      price: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onEdit(gameId, values);
      onClose();
    },
  });

  return (
    <div>
      <h2>Edit Game</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </label>
        {formik.touched.title && formik.errors.title ? (
          <div style={{ color: 'red' }}>{formik.errors.title}</div>
        ) : null}
        <br />
        <label>
          Rating:
          <input
            type="text"
            name="rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
          />
        </label>
        {formik.touched.rating && formik.errors.rating ? (
          <div style={{ color: 'red' }}>{formik.errors.rating}</div>
        ) : null}
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </label>
        {formik.touched.price && formik.errors.price ? (
          <div style={{ color: 'red' }}>{formik.errors.price}</div>
        ) : null}
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditGameForm;