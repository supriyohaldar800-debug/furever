import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VetCard from '../components/Vet/VetCard';
import AppointmentModal from '../components/Vet/AppointmentModal';
import { getVets } from '../api/petCareApi';

const Vet = () => {
  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const data = await getVets();
        setVets(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load veterinarian data');
        setLoading(false);
      }
    };
    fetchVets();
  }, []);

  const handleBookAppointment = (vet) => {
    setSelectedVet(vet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVet(null);
  };

  const handleConfirmAppointment = (appointmentData) => {
    // Here you would typically send the appointment data to your Appwrite backend
    console.log('Booking appointment with:', selectedVet, appointmentData);
    // After successful booking, close the modal
    setIsModalOpen(false);
    setSelectedVet(null);
  };

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
          Veterinary Services
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Connect with experienced veterinarians for consultations and appointments. Ensure your pet gets the best care possible.
        </motion.p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {vets.map((vet) => (
          <VetCard
            key={vet.$id}
            vet={vet}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </motion.div>

      {isModalOpen && selectedVet && (
        <AppointmentModal
          vet={selectedVet}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAppointment}
        />
      )}
    </motion.div>
  );
};

export default Vet;