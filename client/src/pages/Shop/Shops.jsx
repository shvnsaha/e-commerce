import { useEffect, useState } from "react";
import { getAllProduct } from "../../api/products";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from 'query-string'
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";
 



const Shops = () => {
    const [products, setProducts] = useState([]);
    // const [selectedBrand, setSelectedBrand] = useState('All Brands');
    // const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [loading, setLoading] = useState(false);

     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage] = useState(8);

    // let currentPage = 1;
    // let itemsPerPage = 4;

    // query
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    let currentQuery = {}
    let filter;


    const category = params.get('category') ? params.get('category') : 'All Categories'
    const brand = params.get('brand') ? params.get('brand') : 'All Brands'
    const name = params.get('name') ? params.get('name') : '';
    const sort = params.get('sort') ? params.get('sort') : 'Default';





    useEffect(() => {
        setLoading(true)
        getAllProduct()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [])

    if (loading) return <Loader></Loader>

    const uniqueBrands = [...new Set(products.map(product => product?.brand_name))];
    const uniqueCategories = [...new Set(products.map(product => product?.category))];


    const handleBrandChange = (event) => {
        // setSelectedBrand(event.target.value);
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, brand: event.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

        navigate(url)
        setCurrentPage(1);

    };

    const handleCategoryChange = (event) => {
        // setSelectedCategory(event.target.value);
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, category: event.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

        navigate(url)
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, name: e.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

        navigate(url)
        setCurrentPage(1);


    }

     // sorting
     const handleSorting = (event) => {
        // setSortOption(option);
    
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, sort: event.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

        navigate(url)
        setCurrentPage(1);     
        
    }

    const filteredProducts = products.filter(product => {
        return (
            (brand === 'All Brands' || product?.brand_name === brand) &&
            (category === 'All Categories' || product.category === category)
        );
    });

   
        if (name === ''){
            filter = filteredProducts
        
        }

        else {
            filter = filteredProducts.filter(item => item?.name.toLowerCase().includes(name.toLowerCase()))
            
           
        }

       
        switch (sort) {
           
            case "A-Z":
                filter.sort((a, b) => a.name.localeCompare(b.name))
                break;

            case "Z-A":
                filter.sort((a, b) => b.name.localeCompare(a.name))
                break;

            case "Low to High":
                filter.sort((a, b) => a.price - b.price)
                break;

            case "High to Low":
                filter.sort((a, b) => b.price - a.price)
                break;

            default:
                break;
        }

       

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);
        const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return (
        <div>
            <Helmet>
                <title>E-Shop | Buy Your Products</title>
            </Helmet>
            {/* banner */}
            <div className="banner h-52 bg-blend-overlay mb-12" data-aos='fade-down' data-aos-delay='400'>
                <h2 className=' text-2xl text-center ml-2 sm:ml-0 lg:text-5xl font-bold   text-[#0B0B0B] pt-10' data-aos='fade-down' data-aos-delay='400'  >Find Your Desired Product</h2>
                <div className='flex  justify-center pt-8' data-aos='fade-down' data-aos-delay='400' >
                    <input onChange={handleSearch} defaultValue={name}
                        id="search" type="text" placeholder='Search Here' className='w-[30%] h-[50px] p-3 rounded-full border-2 border-[#DEDEDE]' />

                </div>


            </div>


            <div className="flex flex-col px-6 gap-2 md:flex-row md:justify-between md:items-center" data-aos='fade-down' data-aos-delay='400'>

                {/* Brand and Category */}
                <div className="flex flex-col gap-2 md:gap-10 md:flex-row">
                    <div className='flex gap-2 rounded-sm'>
                        <label className="text-lg font-semibold">
                            Brand:
                        </label>
                        <select className=" text-blue-800 px-2 py-1 rounded-lg"
                            value={brand} onChange={handleBrandChange}>
                            <option value="All Brands">All Brands</option>
                            {uniqueBrands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>


                    <div className='flex gap-2 rounded-sm'>
                        <label className="text-lg font-semibold">
                            Category:
                        </label>
                        <select className=" text-blue-800 px-2 py-1 rounded-lg"
                            value={category} onChange={handleCategoryChange}>
                            <option value="All Categories">All Categories</option>
                            {uniqueCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                </div>


                {/* sorting */}
                <div>
                    <div className='rounded-sm'>


                        {/* sorting option */}
                        <select name='sort' id='sort'
                            onChange={handleSorting}
                             value={sort}
                            className=' text-blue-800 px-2 py-1 rounded-lg'
                        >
                            <option value="Default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="Low to High">Low to High</option>
                            <option value="High to Low">High to Low</option>
                        </select>
                    </div>
                </div>
            </div>


            <div className=' text-center mt-6 shadow-xl rounded-lg pb-3' data-aos='fade-down' data-aos-delay='400'>
                <h1 className="font-bold text-purple-900 md:text-2xl text-xl">{brand}/{category}</h1>
            </div>

              {/* product */}

              <div className='grid px-6 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4' data-aos='fade-down' data-aos-delay='400'>
                {
                    currentItems.map((product) => <Card key={product._id} product={product}></Card>)
                }
            </div>



            {/* pagination */}
            <div className='flex justify-center my-8' data-aos='fade-up' data-aos-delay='400'>
                {
                    Array.from({ length: Math.ceil(filter.length / itemsPerPage) }).map((_, index) => (
                        <button key={index + 1} onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green-400" : "bg-gray-200"}`}>{index + 1}</button>
                    ))
                }
            </div>


        </div>
    );
};

export default Shops;