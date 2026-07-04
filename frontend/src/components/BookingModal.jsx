import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, X } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Watch start time to validate end time
  const startTime = watch('startTime');

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: data.fullName,
          phone: data.phone,
          email: 'test@example.com',
          booking_date: data.bookingDate,
          start_time: data.startTime,
          end_time: data.endTime,
          duration: 'Custom'
        })
      });
      
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || 'Failed to book slot');
        return;
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend');
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    reset();
    onClose();
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={handleClose}></div>

      {/* Modal Content */}
      <div className="modal-container">
        
        {/* Close Button */}
        <button onClick={handleClose} className="modal-close-btn">
          <X size={24} />
        </button>

        {/* Left Side: Image */}
        <div className="modal-left">
          <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Camera Studio" />
          <div className="modal-left-overlay">
            <h3>Book the Studio</h3>
            <p>Reserve your premium recording spot today.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="modal-right">
          {isSubmitted ? (
            <div className="modal-success">
              <CheckCircle2 color="#10b981" size={64} style={{marginBottom: '1rem'}} />
              <h2>Booking Request Sent!</h2>
              <p>We'll contact you shortly to confirm your reservation.</p>
              <button onClick={handleClose} className="submit-btn">
                Done
              </button>
            </div>
          ) : (
            <>
              <h2 className="modal-title-mobile">Book the Studio</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
                
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text"
                    {...register("fullName", { required: "Required" })}
                    className="form-input"
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input 
                    type="tel"
                    {...register("phone", { required: "Required" })}
                    className="form-input"
                  />
                  {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Booking Date *</label>
                  <input 
                    type="date"
                    min={getTodayDate()}
                    {...register("bookingDate", { required: "Required" })}
                    className="form-input"
                  />
                  {errors.bookingDate && <span className="form-error">{errors.bookingDate.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Start Time *</label>
                  <input 
                    type="time"
                    {...register("startTime", { required: "Required" })}
                    className="form-input"
                  />
                  {errors.startTime && <span className="form-error">{errors.startTime.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">End Time *</label>
                  <input 
                    type="time"
                    {...register("endTime", { 
                      required: "Required",
                      validate: (value) => {
                        if (!startTime) return true;
                        return value > startTime || "Must be after start time";
                      }
                    })}
                    className="form-input"
                  />
                  {errors.endTime && <span className="form-error">{errors.endTime.message}</span>}
                </div>



                <button type="submit" className="submit-btn">
                  Confirm Booking Request
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
