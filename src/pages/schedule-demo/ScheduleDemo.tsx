// pages/schedule-demo/ScheduleDemo.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import './ScheduleDemo.css'; // Create and import your CSS file for styling

const ScheduleDemo: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    // Here you would handle the form submission.
    // For example, sending the data to your backend or an email service
    console.log(data);
    reset(); // Reset the form after submission
  };

  return (
    <div className="schedule-demo-container">
      <h1>Schedule a Demo</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} required />

        <label htmlFor="phone">Phone Number (optional)</label>
        <input id="phone" type="tel" {...register('phone')} />

        {/* If you want to allow users to suggest a date/time for the demo: */}
        <label htmlFor="datetime">Preferred Date and Time (optional)</label>
        <input id="datetime" type="datetime-local" {...register('datetime')} />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ScheduleDemo;
