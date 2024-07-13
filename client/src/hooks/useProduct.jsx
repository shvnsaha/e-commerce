import { useQuery } from '@tanstack/react-query';
import { getAllProduct } from '../api/products';

const useProduct = () => {
   
    const {refetch ,data: product = [],isLoading } =useQuery({
        queryKey : ['products'],
        queryFn : async () =>{
            return await getAllProduct();
        }
    })

    return [product,refetch,isLoading];
};

export default useProduct;