import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/categorySlice";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Cat() {
  const { category } = useSelector((state) => state.category);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get current URL info
  const [selectedCategory, setSelectedCategory] = useState(new URLSearchParams(location.search).get('category') || "All");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle category change and update URL query
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);

    // Update the URL without reloading the page
    if (selectedValue === "All") {
      // Remove the query param if 'All' is selected
      navigate(location.pathname);
    } else {
      // Add query param for the selected category
      navigate(`${location.pathname}?category=${selectedValue}`);
    }
  };

  // if (isLoading) return <div>Loading</div>;

  return (
    <div>
      <select 
  value={selectedCategory} 
  onChange={handleCategoryChange}
  className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
>
        <option value="All">All</option>
        {category.map((cat) => (
          <option key={cat} value={cat}>
            {cat.split('-').join(' ').charAt(0).toUpperCase() + cat.split('-').join(' ').slice(1)} 
          </option>
        ))}
      </select>
    </div>
  );
}
