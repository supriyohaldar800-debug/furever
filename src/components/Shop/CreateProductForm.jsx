import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createProduct } from '../../api/petCareApi';

const CreateProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    // Validation
    if (!formData.name || !formData.category || !formData.price) {
      setError('Name, category, and price are required');
      setLoading(false);
      return;
    }
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      setError('Price must be a positive number');
      setLoading(false);
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      image: formData.image || '',
    };

    console.log('Submitting product data:', productData);

    try {
      await createProduct(productData);
      setSuccess('Product created successfully!');
      setFormData({
        name: '',
        category: '',
        price: '',
        image: '',
      });
      setTimeout(() => navigate('/shop'), 2000);
    } catch (err) {
      console.error('Error in handleSubmit:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.response?.data?.code,
        details: err.response?.data?.message,
      });
      setError(`Failed to create product: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 flex-grow"
    >
      <button
        onClick={() => navigate('/shop')}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Shop
      </button>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-indigo-800 mb-6 text-center"
      >
        Create New Product
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-8 shadow-md border-l-4 border-indigo-500 max-w-lg mx-auto"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-md"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-green-100 text-green-700 rounded-md"
          >
            {success}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateProductForm;