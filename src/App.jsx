import Cat from './components/Category';
import Product from './components/Product';
import Search from './components/Search';

function App() {
  return (
    <div className='overflow-x-hidden'>
      
    <div className='min-h-screen w-[100vw] bg-gray-100 p-10'>

      <div className='flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0 sm:space-x-4'>
        <Cat />
      <Search />
      </div>

      <div className='flex justify-center mt-5'>
        <Product />
      </div>

    </div>
    </div>
  );
}

export default App;


// Limitations:
// No search by category in dummy json
// This could be resolved by creating own backend
// cache, we can use tanstack query for this
// Search can be more dynamic 
// UI can be improved by using Design System
