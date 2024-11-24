import React from 'react';
import { Sparkles, GraduationCap, FileCheck, Calendar, MessageSquare, Plane } from 'lucide-react';
import ServiceCard from './ServiceCard';
import AiPreview from './AiPreview';

export default function Services() {
  const services = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Matching",
      description: "Get personalized university and course recommendations based on your profile, preferences, and goals."
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Application Support",
      description: "End-to-end assistance with university applications, from documentation to submission."
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Visa Guidance",
      description: "Expert support for student visa applications, including documentation and interview preparation."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance through our AI chatbot and dedicated counselors."
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Career Planning",
      description: "Strategic guidance for aligning your study choices with your career aspirations."
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Pre-Departure Support",
      description: "Comprehensive preparation for your journey, from accommodation to cultural orientation."
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive support for your international education journey
          </p>
        </div>

        <div className="mt-20">
          <AiPreview />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}