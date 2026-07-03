import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Booking = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Watch start time to validate end time
  const startTime = watch('startTime');

  const onSubmit = (data) => {
    console.log('Booking Data:', data);
    setIsSubmitted(true);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20 max-w-6xl min-h-[80vh] bg-white">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Book the Studio</h1>
          <p className="text-gray-600 text-lg">Reserve your spot for high-quality recording.</p>
        </div>

        <div className="bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-[2rem] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side: Single Image */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <img 
              src="/my-studio-bg.png" 
              alt="Podcast Studio" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Optional Overlay for aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <h3 className="text-white text-2xl font-bold">Premium Recording Experience</h3>
            </div>
          </div>

          {/* Right Side: Booking Details / Form */}
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-12">
                <CheckCircle2 className="text-green-500 mb-6" size={80} />
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Booking Submitted Successfully!</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  We have received your booking request. Our team will contact you shortly to confirm your reservation.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-accent hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input 
                    type="text"
                    {...register("fullName", { required: "Full name is required" })}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName.message}</span>}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                  <input 
                    type="tel"
                    {...register("phone", { 
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter only numbers"
                      }
                    })}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="9876543210"
                  />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>

                {/* Email (Optional) */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Email (Optional)</label>
                  <input 
                    type="email"
                    {...register("email")}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Booking Date */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Booking Date *</label>
                  <input 
                    type="date"
                    min={getTodayDate()}
                    {...register("bookingDate", { required: "Date is required" })}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                  {errors.bookingDate && <span className="text-red-500 text-xs">{errors.bookingDate.message}</span>}
                </div>

                {/* Start Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Start Time *</label>
                  <input 
                    type="time"
                    {...register("startTime", { required: "Start time is required" })}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                  {errors.startTime && <span className="text-red-500 text-xs">{errors.startTime.message}</span>}
                </div>

                {/* End Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">End Time *</label>
                  <input 
                    type="time"
                    {...register("endTime", { 
                      required: "End time is required",
                      validate: (value) => {
                        if (!startTime) return true;
                        return value > startTime || "End time must be after start time";
                      }
                    })}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                  {errors.endTime && <span className="text-red-500 text-xs">{errors.endTime.message}</span>}
                </div>

                {/* Purpose */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Purpose *</label>
                  <select 
                    {...register("purpose", { required: "Please select a purpose" })}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                  >
                    <option value="">Select Purpose</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Interview">Interview</option>
                    <option value="YouTube Video">YouTube Video</option>
                    <option value="Business Meeting">Business Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.purpose && <span className="text-red-500 text-xs">{errors.purpose.message}</span>}
                </div>

                {/* Payment Method */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Payment Method *</label>
                  <select 
                    {...register("paymentMethod", { required: "Please select a payment method" })}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                  >
                    <option value="">Select Payment</option>
                    <option value="UPI">UPI / GPay / PhonePe</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Pay at Studio">Pay at Studio</option>
                  </select>
                  {errors.paymentMethod && <span className="text-red-500 text-xs">{errors.paymentMethod.message}</span>}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-2">
                  <button 
                    type="submit"
                    className="w-full bg-accent hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(255,106,0,0.3)]"
                  >
                    Book Now
                  </button>
                </div>
                
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Booking;
