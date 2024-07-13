import axiosSecure from "."

export const getDashboardData = async (year)  => {
    const { data } = await axiosSecure(`/dashboard?year=${year}`)
    return data
  }

export const getMonthlyData = async (year,month)  => {
    const { data } = await axiosSecure(`/monthlydata?year=${year}&month=${month}`)
    return data
  }

