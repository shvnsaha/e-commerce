import React, { useEffect, useState } from "react";
import { getDashboardData, getMonthlyData } from "../../../api/dashboard";
import { FaUserFriends } from "react-icons/fa";
import Loader from "../../../components/Loader/Loader";
import Chart from "../../../components/Chart/Chart";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiRefundFill } from "react-icons/ri";
import { LuSmartphone } from "react-icons/lu";
import { Helmet } from "react-helmet";
import * as XLSX from "xlsx";
import { TbCurrencyTaka } from "react-icons/tb";

export const Dashboard = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = parseInt(new Date().getFullYear());

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

  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const year = [];
  for (let i = 2020; i <= currentYear; i++) year.push(i.toString());

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getDashboardData(selectedYear);
      setDashboardData(data);
      setLoading(false);
    }

    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    async function fetchData2() {
      setLoading(true);
      const data = await getMonthlyData(selectedYear, selectedMonth);
      setMonthlyData(data);
      setLoading(false);
    }

    fetchData2();
  }, [selectedYear, selectedMonth]);

 let totalPrice =0 ;
  const finalData = monthlyData.map((item)=>{
    totalPrice+=item?.cartTotal;
    const date =  `${new Date(item?.date).getDate()}/${new Date(item?.date).getMonth()+1}/${new Date(item?.date).getFullYear()}`
     const itemProduct = item?.itemName.map((value,index)=> `${value} -  ${item?.itemQuantity[index]}`).join(","); 
     return {
        Date: date,
        Name:item?.name,
        Email:item?.email,
        Product:itemProduct,
        Amount: item?.cartTotal,
        TotalAmount: totalPrice ,
     } 

  })

  console.log(finalData);

  

 

 
  const handleExport = () =>{
   if(finalData.length>0){
    const wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(finalData);
    XLSX.utils.book_append_sheet(wb,ws,"Mysheet1");
    XLSX.writeFile(wb,`${months[selectedMonth].name}/${selectedYear}.xlsx`);
   }
  }

  return (
    <>
      <Helmet>
        <title>E Shop | Dashboard</title>
      </Helmet>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="m-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg shadow-lg py-10 px-3">
              <div className="flex  justify-between items-center">
                <div className="bg-green-500 p-4 rounded-lg ">
                  <FaUserFriends size={30} color="white" />
                </div>
                <div>
                  <p className="font-extralight">Total Users</p>
                  <p className="font-bold text-violet-500 text-right">
                    {dashboardData?.user}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-lg py-10 px-3">
              <div className="flex  justify-between items-center">
                <div className="bg-yellow-500 p-4 rounded-lg ">
                  <LuSmartphone size={30} color="white" />
                </div>
                <div>
                  <p className="font-extralight">Total Products</p>
                  <p className="font-bold text-blue-500 text-right">
                    {dashboardData?.product}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-lg py-10 px-3">
              <div className="flex  justify-between items-center">
                <div className="bg-lime-500 p-4 rounded-lg ">
                  <TbCurrencyTaka size={30} color="white" />
                </div>
                <div>
                  <p className="font-extralight">
                    Total Orders : {dashboardData?.order}
                  </p>
                  <p className="font-bold text-green-500 text-right">
                    {dashboardData?.totalSale}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow-lg py-10 px-3">
              <div className="flex  justify-between items-center">
                <div className="bg-red-500 p-4 rounded-lg ">
                  <RiRefundFill size={30} color="white" />
                </div>
                <div>
                  <p className="font-extralight">
                    Total Refunds: {dashboardData?.refund}
                  </p>
                  <p className="font-bold text-red-500 text-right">
                    {dashboardData?.totalRefund}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-10 justify-center gap-4 rounded-sm items-center">
            <div className="flex gap-2 items-center">
              <label className="text-lg font-semibold">Year:</label>
              <select
                className=" select max-w-xs focus:outline-none text-base font-medium border-green-700   select-bordered  "
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
              >
                {year.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-lg font-semibold">Month:</label>
              <select
                className=" select max-w-xs focus:outline-none text-base font-medium border-green-700   select-bordered  "
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
              >
                {months.map((item) => (
                  <option value={item.number} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="btn btn-outline" onClick={handleExport}>Extract in Xl</button>
            </div>
          </div>

          <Chart dashboardData={dashboardData}></Chart>

          <div className="flex flex-col md:flex-row justify-between gap-5 mt-10">
            <div className="bg-yellow-100 w-full md:w-1/3 text-center p-10 rounded-lg shadow-md">
              <h1>
                Order in <span className="text-blue-700">{selectedYear}</span>
              </h1>
              <p className="font-bold text-green-900">
                 {dashboardData?.yearTotalOrder}
              </p>
            </div>

            <div className="bg-orange-100  w-full md:w-1/3  text-center p-10 rounded-lg shadow-md">
              <h1>
                Refund in <span className="text-blue-700">{selectedYear}</span>
              </h1>
              <p className="font-bold text-red-900">
                 {dashboardData?.yearTotalRefund}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
