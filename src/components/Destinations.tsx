import React from 'react';
import DestinationCard from './DestinationCard';

export default function Destinations() {
  const destinations = [
    {
      country: "United States",
      image: "https://images.unsplash.com/photo-1544535830-9df3f56fff6a?auto=format&fit=crop&q=80&w=800",
      universities: 4500,
      intlStudents: "1M+",
      topUniversities: ["MIT", "Stanford", "Harvard"],
      description: "World-class education with diverse opportunities and cutting-edge research facilities."
    },
    {
      country: "United Kingdom",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
      universities: 130,
      intlStudents: "600K+",
      topUniversities: ["Oxford", "Cambridge", "Imperial"],
      description: "Rich academic heritage combined with modern innovation and multicultural environment."
    },
    {
      country: "Canada",
      image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=800",
      universities: 96,
      intlStudents: "500K+",
      topUniversities: ["Toronto", "UBC", "McGill"],
      description: "High quality of life with excellent post-study work opportunities and welcoming culture."
    },
    {
      country: "Australia",
      image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800",
      universities: 43,
      intlStudents: "750K+",
      topUniversities: ["Melbourne", "Sydney", "ANU"],
      description: "World-class education in a beautiful setting with great weather and lifestyle."
    }
  ];

  return (
    <section id="destinations" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Destinations
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Explore top study destinations and find your perfect fit
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} {...destination} />
          ))}
        </div>
      </div>
    </section>
  );
}