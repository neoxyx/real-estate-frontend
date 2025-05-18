'use client';

import React from 'react';

interface PropertyCardProps {
  _id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image?: string;
  onViewDetails?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ name, address, price, image, onViewDetails }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col">
      {image && <img src={image} alt={name} className="w-full h-48 object-cover rounded mb-2" />}
      <h2 className="text-xl font-bold">{name}</h2>
      <p>{address}</p>
      <p className="text-green-600 font-semibold">${price.toLocaleString('en-US')}</p>
      <button onClick={onViewDetails} className="mt-auto text-blue-500 hover:underline">
        View Details
      </button>
    </div>
  );
};

export default PropertyCard;
