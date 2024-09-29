import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../store/productSlice';

const useFilteredProducts = () => {
    const { products, total, isLoading } = useSelector(state => state.products);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const limit = 10;

    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        dispatch(fetchProducts({
            category,
            page,
            limit,
            search,
        }));
        window.scrollTo(0, 0);
    }, [dispatch, category, page, search]);

    const setPage = (newPage) => {
      console.log("new paege", newPage)
      searchParams.set('page', newPage.toString());
      if(newPage==1){
        console.log(searchParams.toString())
        searchParams.delete('page')
      }
      navigate(`${location.pathname}?${searchParams.toString()}`);
      window.scrollTo(0, 0);
    };
    return { 
        products,
        total, 
        isLoading, 
        page, 
        setPage,
        totalPages: Math.ceil(total / limit)
    };
}

export default useFilteredProducts;

