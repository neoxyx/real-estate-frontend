'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from './components/PropertyCard';

interface Property {
  _id: string;
  idOwner: string;
  name: string;
  addressProperty: string;
  priceProperty: number;
  image?: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    minPrice: '',
    maxPrice: '',
  });

  const fetchProperties = async () => {
    try {
      const params = {
        name: filters.name || undefined,
        address: filters.address || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
      };

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/Property`, { params });
      setProperties(res.data);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Real Estate Listings</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          placeholder="Name"
          className="border p-2 rounded"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          placeholder="Address"
          className="border p-2 rounded"
          value={filters.address}
          onChange={(e) => setFilters({ ...filters, address: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-8"
        onClick={fetchProperties}
      >
        Apply Filters
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            _id={property._id}
            idOwner={property.idOwner}
            name={property.name}
            address={property.addressProperty}
            price={property.priceProperty}
            image={property.image}
            onViewDetails={() => alert(`Details of ${property.name}`)}
          />
        ))}
      </div>
    </main>
  );
}
