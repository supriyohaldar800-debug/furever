import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPetCareInfo } from '../../api/petCareApi';

const CareDetails = () => {
  const { petType, section } = useParams(); // e.g., /care/bird/diet
  const navigate = useNavigate();
  const [careInfo, setCareInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const validSections = ['diet', 'accommodation', 'basicCare', 'commonDiseases'];

  useEffect(() => {
    let isMounted = true;

    const fetchCareInfo = async () => {
      try {
        console.log(`Fetching care info for petType: ${petType}, section: ${section}`);
        if (!petType || !section) {
          throw new Error('petType or section parameter is missing');
        }
        if (!validSections.includes(section)) {
          throw new Error(`Invalid section: ${section}. Valid sections are: ${validSections.join(', ')}`);
        }
        const data = await getPetCareInfo(petType);
        console.log(data);
        
        console.log('Fetched care info:', data);
        if (isMounted) {
          if (data) {
            setCareInfo({
              id: petType,
              name: petType.charAt(0).toUpperCase() + petType.slice(1),
              ...data,
            });
            setLoading(false);
          } else {
            setError('Care information not found for this pet type');
            setLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error in fetchCareInfo:', err);
          setError(`Failed to load care information: ${err.message}`);
          setLoading(false);
        }
      }
    };

    fetchCareInfo();

    return () => {
      isMounted = false; // Cleanup to prevent state updates on unmounted component
    };
  }, [petType, section]);

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

  if (error || !careInfo || !careInfo[section]) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 flex-grow text-center"
      >
        <h3 className="text-xl text-red-500">{error || `Section "${section}" not found for ${petType}`}</h3>
        <button
          onClick={() => navigate(`/care/${petType}`)}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all"
        >
          Back to Care Guide
        </button>
        <button
          onClick={() => navigate('/')}
          className="mt-2 px-6 py-2 bg-gray-500 text-white rounded-full font-medium hover:bg-gray-600 transition-all"
        >
          Back to Home
        </button>
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
      <button
        onClick={() => navigate(`/care/${petType}`)}
        className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to {careInfo.name} Care Guide
      </button>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-indigo-800 mb-6 text-center"
      >
        {careInfo.name} - {section.replace('basicCare', 'Basic Care').replace('commonDiseases', 'Common Diseases')}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-8 shadow-md border-l-4 border-indigo-500"
      >
        <p className="text-gray-600 leading-relaxed">{careInfo[section]}</p>
      </motion.div>
    </motion.div>
  );
};

export default CareDetails;