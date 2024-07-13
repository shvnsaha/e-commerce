import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { TbFidgetSpinner } from "react-icons/tb";
import { getMonthlyData } from "../../../api/dashboard";

const MonthlyStat = () => {
  const [loading,setLoading] = useState(false)
  const months = [
    { number: 0, name: "January" },
    { number: 1, name: "February" },
    { number: 2, name: "March" },
    { number: 3, name: "April" },
    { number: 4, name: "May" },
    { number: 5, name: "June" },
    { number: 6, name: "July" },
    { number: 7, name: "August" },
    { number: 8, name: "September" },
    { number: 9, name: "Octobor" },
    { number: 10, name: "November" },
    { number: 11, name: "December" },
  ];

 

  const handleSubmit = async(e)=>{
    e.preventDefault();
   const form = e.target;
   const month = form.month.value;
  try{
    setLoading(true);
    const data = await getMonthlyData(month)
    console.log(data);
  }catch(err){
    console.log(err)
  }finally{
    setLoading(false)
  }
  }
  return (
    <>
      <Helmet>
        <title>E Shop | MonthlyStat</title>
      </Helmet>
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col lg:flex-row px-10 justify-center gap-10 items-center text-gray-800 rounded-xl bg-gray-50">
        <div className="bg-gray-200 p-5 w-1/2 text-center rounded-md">
          <h2 className="font-semibold pb-3">Add Brand</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-1 text-sm">
              <label htmlFor="brand_name" className="block text-gray-600">
                Brand Name
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="month"
              >
                {months.map((item) => (
                  <option value={item.number} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <button
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? (
            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
          ) : (
            'Save & Continue'
          )}
        </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MonthlyStat;
