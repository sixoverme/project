import React from 'react';
import { ArrowLeft, MapPin, Clock, User, DollarSign, FileText } from 'lucide-react';
import type { Job, Client } from '../../interfaces';

interface JobDetailPageProps {
  job: Job;
  client: Client;
  onBack: () => void;
}

export function JobDetailPage({ job, client, onBack }: JobDetailPageProps) {
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Job Details</h1>
      </div>

      {/* Job Summary Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{job.type}</h2>
            <p className="text-gray-600 mt-1">{new Date(job.date).toLocaleDateString()}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            job.status === 'Completed' ? 'bg-green-100 text-green-800' :
            job.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
            job.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {job.status}
          </span>
        </div>

        <div className="space-y-4">
          {/* Client Info */}
          <div className="flex items-center text-gray-600">
            <User className="h-5 w-5 mr-2" />
            <span>{client.name}</span>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{client.address}</span>
          </div>
          
          {/* Duration */}
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>2 hours</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-5 w-5 mr-2" />
            <span>${job.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">Payment Status</h3>
              <p className="text-gray-600 mt-1">
                {job.paymentStatus === 'Paid' ? `Paid on ${job.paymentDate}` : 
                 job.paymentStatus === 'Pending' ? 'Payment pending' : 
                 'Not paid'}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              job.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
              job.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {job.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {job.notes && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
          <p className="text-gray-600">{job.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-end space-x-4">
          <button className="text-gray-600 flex items-center hover:text-gray-800">
            <FileText className="h-5 w-5 mr-2" />
            Generate Invoice
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
}
