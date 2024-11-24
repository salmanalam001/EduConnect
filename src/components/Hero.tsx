import React from 'react';
import { Globe2, BookOpen, Users } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-100 via-white to-purple-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Journey to</span>
            <span className="block text-indigo-600">Global Education</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Personalized study abroad guidance powered by AI. Get matched with your perfect university and program.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                Start Your Journey
              </button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Globe2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Global Reach</h3>
            <p className="mt-2 text-gray-500">Access to top universities across 50+ countries worldwide.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">AI-Powered Matching</h3>
            <p className="mt-2 text-gray-500">Smart recommendations based on your profile and preferences.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Expert Guidance</h3>
            <p className="mt-2 text-gray-500">Personalized support from experienced counselors.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
}