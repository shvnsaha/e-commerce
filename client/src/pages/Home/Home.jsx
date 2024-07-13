import React from "react";
import Banner from "../../components/Header/Banner/Banner";
import PopularProduct from "../../components/PopularProduct/PopularProduct";
import { useLoaderData } from "react-router-dom";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import Services from "../../components/Services/Services";
import Category from "../../components/Category/Category";
import { Helmet } from "react-helmet";
import Newsletter from "../../components/Newsletter/Newsletter";
import { Contact } from "../../components/Contact/Contact";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const {user} = useAuth();
  console.log(user);
  return (
    <div>
      <Helmet>
        <title>E-Shop | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <PopularProduct></PopularProduct>
      <NewArrivals></NewArrivals>
      <Services></Services>
      <Contact></Contact>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
