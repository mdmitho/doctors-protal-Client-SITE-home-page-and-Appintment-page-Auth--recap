import React from 'react';

const AppointmentService = ({ service, setTreatment }) => {
  const { name, slots } = service;
  return (
    <div>
      <div class="card lg:max-w-lg bg-base-100 shadow-xl m-2 mt-8">
        <div class="card-body text-center">
          <h2 class="text-xl font-bold text-secondary">{name}</h2>
          <p>
            {slots.length > 0 ? (
              <span>{slots[0]}</span>
            ) : (
              <span className="text-red-500">Try Another date.</span>
            )}
          </p>
          <p>
            {slots.length} {slots.length > 1 ? "spaces" : "space"} Available
          </p>
          <div class="card-actions justify-center">
            <label
              disabled={slots.length === 0}
              onClick={() => setTreatment(service)}
              for="Booking-modal"
              class="btn btn-sm btn-secondary text-white bg-gradient-to-r from-secondary to primary"
            >
              Book appointment
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentService;