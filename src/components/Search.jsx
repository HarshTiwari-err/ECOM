import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchQuery = new URLSearchParams(location.search).get('search') || '';
  const [searchQueryState, setSearchQuery] = useState(searchQuery);
  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery])
  const handleSubmit = (e) => {
    console.log("hell")
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    console.log("er,",queryParams.get('page'))
    queryParams.delete('page')
    if (searchQueryState) {
      queryParams.set('search', searchQueryState);
    } else {
      queryParams.delete('search');
    }

    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <form className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2" onSubmit={handleSubmit}>
      <input 
        type="search" 
        name="search" 
        className="flex-grow w-full sm:w-auto border border-gray-300 px-3 py-2 rounded-md sm:rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
        value={searchQueryState} 
        onChange={e => setSearchQuery(e.target.value)} 
        placeholder="Search products..."
      />
      <button 
        type="submit" 
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md sm:rounded-r-md transition duration-150 ease-in-out"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
