import React, { useEffect, useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { productsService } from "../services/products";
import { useDebounce } from "../hooks/useDebounce";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsService.getAllProducts(100), // Fetch all for client-side filtering
          productsService.getCategories(),
        ]);
        setAllProducts(productsData.products);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load products. Please check your connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter Logic that will give use filtered data from search, and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [allProducts, debouncedSearch, selectedCategory, priceRange]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [debouncedSearch, selectedCategory, priceRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-20 z-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center border-t border-gray-100 pt-6">
          <div className="flex-1 w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug || cat} value={cat.slug || cat}>
                  {cat.name || cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price: ${priceRange.max}
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: Number(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="self-end pb-1">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setPriceRange({ min: 0, max: 2000 });
              }}
              className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 bg-white"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 bg-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
