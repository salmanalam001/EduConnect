import React from 'react';
import { MessageSquare, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Connect</h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Chat with AI Assistant</h4>
              <p className="text-gray-600">Get instant answers to your questions 24/7</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Phone className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Call Us</h4>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Email</h4>
              <p className="text-gray-600">contact@edupathglobal.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Office Information</h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <MapPin className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Location</h4>
              <p className="text-gray-600">123 Education Street, Suite 100<br />San Francisco, CA 94105</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">Office Hours</h4>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}