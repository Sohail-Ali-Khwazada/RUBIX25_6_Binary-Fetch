import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy product data for comparison
  const dummyProduct = {
    product_name: "Dummy Product",
    ecoscore_score: 50, // Eco Score for the dummy product
    categories:['milk','cheese']
  };

  const searchTerms = dummyProduct.categories; // Multiple search terms
  const query = searchTerms.join(" "); // Combine terms with spaces for API
  const apiUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`;

  // Fetch data from the Open Food Facts API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const productsData = data.products || [];

        // Filter products with better ecoscore than dummyProduct
        const filtered = productsData.filter(
          (product) =>
            product.ecoscore_score !== undefined &&
            product.ecoscore_score >= dummyProduct.ecoscore_score
        );

        setProducts(productsData);
        setFilteredProducts(filtered);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-bold mt-10">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-bold text-red-600 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Alternatives with Better Eco Scores
      </h1>
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Dummy Product: {dummyProduct.product_name} (Eco Score:{" "}
          {dummyProduct.ecoscore_score})
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
              >
                <Product product={product} />
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-bold text-gray-600 col-span-full">
              No alternatives with better Eco Scores found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Product = ({ product }) => {
  // Function to remove "en:" from categories
  const cleanCategories = (categories) => {
    return categories.map((category) => category.replace("en:", ""));
  };

  return (
    <div className="w-full">
      {/* Image Section */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-md">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name || "Product Image"}
            className="h-full object-contain"
          />
        ) : (
          <span className="text-gray-500">No Image Available</span>
        )}
      </div>

      {/* Product Details */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {product.product_name_en || product.product_name_es||product.product_name || "Unknown Product"}
      </h2>
      <div className="text-gray-600 text-sm space-y-2">
        <p>
          <strong>Eco Score:</strong> {product["ecoscore_score"] || "None"}
        </p>
        <p>
          <strong>Code:</strong> {product.code || "N/A"}
        </p>
        <p>
          <strong>Brand:</strong> {product.brands || "N/A"}
        </p>
        <p>
          <strong>Categories:</strong>{" "}
          {product.categories_tags
            ? cleanCategories(product.categories_tags).join(", ")
            : "N/A"}
        </p>
        <p>
          <strong>Allergens:</strong>{" "}
          {product.allergens_tags
            ? cleanCategories(product.allergens_tags).join(", ")
            : "None"}
        </p>
        <p className="flex justify-between">
          <p><strong>Nutrition Score:</strong>{""}
          {product.nutriscore_score|| "N/A"}</p>
          <p><strong>Nutrition Grade:</strong>{" "}
          {product.nutrition_grades?.toUpperCase() || "N/A"}</p>
        </p>
        <p>
          <strong>Carbon Foot Print:</strong>{" "}
          {product.nutriments["carbon-footprint_100g"] ||
            product.nutriments["carbon-footprint-from-known-ingredients_product"] ||
            "None"}
        </p>
      </div>
    </div>
  );
};

export default ProductList;
