import { motion } from 'framer-motion';

const VetCard = ({ vet, onBookAppointment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={vet.image} 
          alt={vet.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl">{vet.name}</h3>
            <p className="text-indigo-600">{vet.specialty}</p>
          </div>
          <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            {vet.rating}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600"><span className="font-semibold">Experience:</span> {vet.experience}</p>
        </div>
        
        <div className="flex items-center mb-6">
          {vet.available ? (
            <div className="flex items-center text-green-600">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Available now
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
              Not available
            </div>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onBookAppointment(vet)}
          disabled={!vet.available}
          className={`w-full py-3 rounded-lg font-medium ${
            vet.available 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          {vet.available ? 'Book Appointment' : 'Not Available'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VetCard;