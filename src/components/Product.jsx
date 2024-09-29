import React from 'react';
import useFilteredProducts from "../hooks/useProducts";

const Product = () => {
  const { products, isLoading, page, setPage, totalPages } = useFilteredProducts();
  // console.log()
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if(!totalPages || page>totalPages){
    return (
      <div className="flex justify-center items-center h-64">
      No Products
    </div>
    )
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-600">Rating: {product.rating}/5</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
