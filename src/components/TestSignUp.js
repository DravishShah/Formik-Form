import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Required")
      .max(15, "Must be 15 characters or less"),
    lastName: Yup.string()
      .required("Required")
      .max(20, "Must be 20 characters or less"),
    email: Yup.string().email("Invalid email address").required("Required"),
    state: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          className="w-full border p-2 rounded-md"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="lastName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          className="w-full border p-2 rounded-md"
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full border p-2 rounded-md"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="state"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          State
        </label>
        <select
          id="state"
          name="state"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.state}
          className="w-full border p-2 rounded-md"
        >
          <option value="" label="Select a state" />
          <option value="Maharashtra" label="Maharashtra" />
          <option value="Goa" label="Goa" />
          <option value="Gujarat" label="Gujarat" />
          <option value="Bihar" label="Bihar" />
        </select>
        {formik.touched.state && formik.errors.state ? (
          <div className="text-red-500 text-sm">{formik.errors.state}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
