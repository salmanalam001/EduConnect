import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  university: string;
  program: string;
  image: string;
  quote: string;
  country: string;
}

export default function TestimonialCard({
  name,
  university,
  program,
  image,
  quote,
  country
}: TestimonialCardProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2">
                <Quote className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <p className="text-xl md:text-2xl text-gray-800 italic mb-6">
              "{quote}"
            </p>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
              <p className="text-indigo-600 font-medium">{program}</p>
              <p className="text-gray-600">{university}</p>
              <p className="text-gray-500 text-sm">{country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}