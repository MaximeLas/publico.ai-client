import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import './ScheduleDemo.css';

const ScheduleDemo: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    const USER_ID = process.env.REACT_APP_USER_ID;
    const SERVICE_ID = 'service_zk3ndcg';
    const TEMPLATE_ID = 'template_f0yiw19';

    // Send the email
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: data.name,
        email: data.email,
        organization_name: data.organizationName || 'Not provided.',
        program_details: data.programDetails || 'Not provided.'
    }, USER_ID)
    .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsSubmitted(true);
    }, (error) => {
        console.log('FAILED...', error);
        setFormMessage('Failed to send your request. Please try again later.');
    });
  };

  return (
    <div className="schedule-demo-container">
        <h1>Schedule a Demo</h1>
        {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    Name
                </label>
                <input id="name" {...register('name')} required />

                 <label htmlFor="email">
                    Email
                </label>
                <input id="email" type="email" {...register('email')} required />

                <label htmlFor="organizationName">
                    Organization Name (optional)
                </label>
                <input id="organizationName" {...register('organizationName')} />

                <label htmlFor="programDetails">
                    Anything we should know about your program or grantwriting needs? (optional)
                </label>
                <textarea id="programDetails" {...register('programDetails')} />

                <input type="submit" value="Submit" />
            </form>
        ) : (
            <p className="form-response-message">
                Thank you for submitting your request! We will be in touch soon.
            </p>
        )}
      {formMessage && <p className="form-response-message">{formMessage}</p>}
    </div>
  );
};

export default ScheduleDemo;
