import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPetCareInfo } from '../../api/petCareApi';

const CareSection = () => {
  const { petType } = useParams(); // e.g., 'cat' from /care/cat
  const navigate = useNavigate();
  const [careInfo, setCareInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sections = ['diet', 'accommodation', 'basicCare', 'commonDiseases'];

  useEffect(() => {
    const fetchCareInfo = async () => {
      try {
        console.log(`Fetching care info for petType: ${petType}`);
        const data = await getPetCareInfo(petType);
        console.log('Fetched data:', data);
        if (data) {
          setCareInfo({
            id: petType,
            name: petType.charAt(0).toUpperCase() + petType.slice(1),
            ...data,
          });
          setLoading(false);
        } else {
          console.warn(`No care info found for petType: ${petType}`);
          setError('Care information not found');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching care info:', err.message, err);
        setError('Failed to load care information: ' + err.message);
        setLoading(false);
      }
    };
    if (petType) {
      fetchCareInfo();
    } else {
      console.error('petType is undefined');
      setError('Invalid pet type');
      setLoading(false);
    }
  }, [petType]);

  const handleSelect = (section) => {
    console.log(`Navigating to /care/${petType}/${section}`);
    navigate(`/care/${petType}/${section}`);
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

  if (error || !careInfo) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 flex-grow text-center"
      >
        <h3 className="text-xl text-red-500">{error || 'Care information not found'}</h3>
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
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-800">
        {careInfo.name} Care Guide
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {sections.map((section, index) => (
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md cursor-pointer border-l-4 border-indigo-500"
            onClick={() => handleSelect(section)}
          >
            <h3 className="text-xl font-semibold mb-3 capitalize text-indigo-700">
              {section.replace('basicCare', 'Basic Care').replace('commonDiseases', 'Common Diseases')}
            </h3>
            <p className="text-gray-600 mb-4">
              Learn about the {section.replace('basicCare', 'basic care').replace('commonDiseases', 'common diseases')} requirements for your {careInfo.name.toLowerCase()}
            </p>
            <div className="text-indigo-600 font-medium flex items-center">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CareSection;