import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import { submitContactForm } from '../../lib/api';
import type { ContactFormData } from './types';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start your journey with personalized guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}