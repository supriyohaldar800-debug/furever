import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPetCategories } from '../../api/petCareApi';

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getPetCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load pet categories');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSelect = (category) => {
    navigate(`/care/${category.name}`); // Navigate to care page for the selected pet type
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Care Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.$id} // Use Appwrite's document ID
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl overflow-hidden shadow-lg cursor-pointer ${category.color} transition-all`}
            onClick={() => handleSelect(category)}
          >
            <div className="h-48 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className={`text-2xl font-bold mb-2 ${category.textColor}`}>
                {category.name}
              </h3>
              <p className="text-gray-600">
                Learn about proper care for your {category.name.toLowerCase()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;