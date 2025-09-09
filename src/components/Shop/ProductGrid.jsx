import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/petCareApi';
import ProductCard from './ProductCard';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // Fetch all or by category
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">Loading products...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-red-500">{error}</h3>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">No products found in this category.</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.$id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;