import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyCard from '../PropertyCard';

const mockProperty = {
  _id: '1',
  idOwner: 'owner1',
  name: 'Apartamento de prueba',
  address: 'Calle falsa 123',
  price: 150000,
  image: 'http://example.com/image.jpg',
};

const mockOnViewDetails = jest.fn();

describe('PropertyCard', () => {
  it('debería renderizar la información de la propiedad correctamente', () => {
    render(<PropertyCard {...mockProperty} onViewDetails={mockOnViewDetails} />);

    // Verificar que el nombre, la dirección y el precio se renderizan
    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProperty.price.toLocaleString('en-US')}`)).toBeInTheDocument();

    // Verificar que la imagen se renderiza si está presente
    expect(screen.getByAltText(mockProperty.name)).toBeInTheDocument();
  });

  it('debería renderizar sin la imagen si no se proporciona', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...propertyWithoutImage } = mockProperty;
    render(<PropertyCard {...propertyWithoutImage} onViewDetails={mockOnViewDetails} />);

    // Verificar que el nombre, la dirección y el precio se renderizan
    expect(screen.getByText(propertyWithoutImage.name)).toBeInTheDocument();
    expect(screen.getByText(propertyWithoutImage.address)).toBeInTheDocument();
    expect(screen.getByText(`$${propertyWithoutImage.price.toLocaleString('en-US')}`)).toBeInTheDocument();

    // Verificar que la imagen NO se renderiza
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('debería llamar a la función onViewDetails al hacer clic en "View Details"', () => {
    render(<PropertyCard {...mockProperty} onViewDetails={mockOnViewDetails} />);

    // Encontrar el botón "View Details" y simular un clic
    const viewDetailsButton = screen.getByText('View Details');
    fireEvent.click(viewDetailsButton);

    // Verificar que la función mock onViewDetails ha sido llamada
    expect(mockOnViewDetails).toHaveBeenCalledTimes(1);
  });
});