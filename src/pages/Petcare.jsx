import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getPetCategories } from '../api/petCareApi';

const PetCare = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getPetCategories();
        setCategories(data);
        console.log(data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load pet categories');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (index) => {
    const myroutes = ['cat','dog','rabbit','bird'];
    navigate(`/care/${myroutes[index]}`); // Navigate to care guide, e.g., /care/cat
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 flex-grow text-center"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 flex-grow text-center"
      >
        <h3 className="text-xl text-red-500">{error}</h3>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 flex-grow"
    >
      <div className="text-center mb-12">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-indigo-800 mb-4"
        >
          Pet Care Guide
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Everything you need to know to keep your furry, feathered, or scaly friends happy and healthy.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.$id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl overflow-hidden shadow-lg cursor-pointer ${category.color} transition-all`}
            onClick={() => handleCategorySelect(index)}
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
    </motion.div>
  );
};

export default PetCare;