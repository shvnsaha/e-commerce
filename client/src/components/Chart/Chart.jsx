
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ dashboardData }) => {

  const { monthlyOrder, monthlyRefund } = dashboardData;
  const arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


  const data = []

  if(monthlyOrder && monthlyRefund){
    arr.forEach((item, index) => {
      const obj = {
        name: item,
        order: monthlyOrder[index],
        refund: monthlyRefund[index]
      };
  
      data.push(obj);
  
    })
  }

  

  return (
    <div className='h-[22rem] bg-white mt-6 p-4 rounded-lg border border-gray-200 '>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="order" stroke="#2AAA8A" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="refund" stroke="#C70039 " />
        </LineChart>
      </ResponsiveContainer>

    </div>
    

  )
}

export default Chart;
