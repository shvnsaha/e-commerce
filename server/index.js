const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(
  "sk_test_51OdCcTKaNbqbkdEJNxn4MurcIaccE63SrYF2zoha0cROMRPSfajo7j8fAsVVkSIbES5oNCh1hahtd3lLaOA3wapH00DvLPhBQt"
);
const SSLCommerzPayment = require("sslcommerz-lts");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
require("dotenv").config();
const exceljs = require("exceljs");
const fs = require("fs");



// mail service
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174","https://e-commerce-60dfa.web.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

// Send email
const sendEmail = (emailAddress, emailData) => {
  //Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  //verify connection
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our emails", success);
    }
  });

  const mailBody = {
    from: process.env.MAIL,
    to: emailAddress,
    subject: emailData?.subject,
    html: `<p>${emailData?.message}</p>`,
  };

  transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// mongodb config
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gwyyl9m.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ssl code
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Database and collection

    const productCollection = client.db("e-commerce").collection("products");
    const cartCollection = client.db("e-commerce").collection("carts");
    const userCollection = client.db("e-commerce").collection("users");
    // const discountCollection = client.db('e-commerce').collection('discounts');
    const bookingCollection = client.db("e-commerce").collection("bookings");
    const pendingReviewCollection = client
      .db("e-commerce")
      .collection("pendingReview");
    const reviewCollection = client.db("e-commerce").collection("reviews");
    const brandCollection = client.db("e-commerce").collection("brands");
    const categoryCollection = client.db("e-commerce").collection("categorys");
    const discountCollection = client.db("e-commerce").collection("discount");
    const refundCollection = client.db("e-commerce").collection("refunds");
    const successRefundCollection = client
      .db("e-commerce")
      .collection("successrefunds");
    const contactCollection = client.db("e-commerce").collection("contacts");

    // message sent
    app.put("/send/:id", async (req, res) => {
      const id = req.params.id;
      const email = req.body.email;
      const phone = req.body.phone;
      const status = req.body.status;
      const dataArray = req.body.data;
      console.log(dataArray, email, status, phone);

      const messageText = dataArray
        .map(
          (item, index) =>
            `${index + 1} ${item?.brand_name}  ${item?.category}  Cupon Code: ${
              item?.cupon
            } ${item?.price}% off  [Valid till: ${new Date(item?.exDate).toString().slice(0, 24)}]`
        )
        .join("\n");
      console.log(messageText);

      const message = `আপনার জন্য কিছু আকর্ষণীয় মূল্য ছাড় \n\n` + messageText;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          message: status,
        },
      };

      // message
      // let details = {

      //   to: email,
      //   subject: `আপনার জন্য কিছু আকর্ষণীয় মূল্য ছাড়`,
      //   text: `${messageText}`

      // }

      // mailTransporter.sendMail(details, async (err) => {
      //   console.log(details);
      //   if (err) {
      //     console.log(err);
      //   }
      //   else {
      //     const result = await userCollection.updateOne(filter, updateDoc, options)
      //     res.send(result)

      //   }
      // })

     
      const greenwebsms = new URLSearchParams();
      greenwebsms.append(
        "token",
        "109331916241713446184ebb43199bbe27d856dd1f9759785746d"
      );
      greenwebsms.append("to", phone);
      greenwebsms.append("message", message);
      axios
        .post("http://api.greenweb.com.bd/api.php", greenwebsms)
        .then(async (response) => {
          console.log(response.data);
          const result = await userCollection.updateOne(
            filter,
            updateDoc,
            options
          );
          res.send(result);
        });
    });

    // updateMessageStstus

    app.put("/updatestatus", async (req, res) => {
      const filter = { message: "sent" };
      const updateDoc = {
        $set: {
          message: "notsent",
        },
      };
      const result = await userCollection.updateMany(filter, updateDoc);
      res.send(result);
    });

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log("I need a new jwt", user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // save user in db
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const isExist = await userCollection.findOne(query);
      console.log("User found?----->", isExist);
      if (isExist) return res.send(isExist);
      const result = await userCollection.updateOne(
        query,
        {
          $set: { ...user, timestamp: Date.now() },
        },
        options
      );
      res.send(result);
    });

    // update status login
    app.put("/userstatus/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const result = await userCollection.updateOne(
        query,
        {
          $set: { ...user, timestamp: Date.now() },
        },
        options
      );
      res.send(result);
    });

    // update user
    app.put("/user/:id", async (req, res) => {
      const userData = req.body;
      console.log(req.params.id);
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: userData,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // all user get
    app.get("/users", verifyToken, async (req, res) => {
      const result = await userCollection
        .find({ status: "verified" })
        .toArray();
      res.send(result);
    });

    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(filter);
      res.send(result);
    });

    // get role of user
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    //contact operation
    app.get("/contacts", async (req, res) => {
      let sort = {
        createAt: "desc",
      };
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      const cursor = contactCollection
        .find()
        .skip(skip)
        .limit(limit)
        .sort(sort);
      const result = await cursor.toArray();

      //  count data
      const total = await contactCollection.countDocuments();
      res.send({
        total,
        result,
      });
    });

    app.post("/contacts", async (req, res) => {
      const contactData = { ...req.body, createAt: Date.now() };
      const result = await contactCollection.insertOne(contactData);
      res.send(result);
    });

    // all products operation

    app.post("/brand", verifyToken, async (req, res) => {
      const brand = req.body;
      const brandData = { ...brand, createAt: Date.now() };
      const result = await brandCollection.insertOne(brandData);
      res.send(result);
    });

    app.post("/category", verifyToken, async (req, res) => {
      const category = req.body;
      const result = await categoryCollection.insertOne(category);
      res.send(result);
    });

    app.get("/brand", async (req, res) => {
      const result = await brandCollection.find().toArray();
      res.send(result);
    });

    app.get("/category", async (req, res) => {
      const result = await categoryCollection.find().toArray();
      res.send(result);
    });

    // single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // app.get('/product', async (req, res) => {
    //   let sortObj = {}
    //   sortObj.createAt = 'desc'
    //   const page = parseInt(req.query.page);
    //   const limit = parseInt(req.query.limit);
    //   const skip = (page - 1) * limit
    //   const cursor = productCollection.find().skip(skip).limit(limit).sort(sortObj)
    //   const result = await cursor.toArray()
    //   res.send(result);
    // })

    app.get("/dashboard", verifyToken, async (req, res) => {
      const selectedYear = req.query.year;
      const count1 = await productCollection.countDocuments();
      const count2 = await userCollection.countDocuments();
      const count3 = await bookingCollection.countDocuments({
        paidStatus: true,
      });
      const count4 = await successRefundCollection.countDocuments({
        paidStatus: true,
      });
      const bookingDetails = await bookingCollection
        .find(
          { paidStatus: true },
          {
            projection: {
              date: 1,
              cartTotal: 1,
            },
          }
        )
        .toArray();

      const refundDetails = await successRefundCollection
        .find(
          { paidStatus: true },
          {
            projection: {
              createAt: 1,
              price: 1,
            },
          }
        )
        .toArray();

      const totalSale = bookingDetails.reduce(
        (sum, data) => sum + data.cartTotal,
        0
      );

      const totalRefund = refundDetails.reduce(
        (sum, data) => sum + data.price,
        0
      );

      const arr = new Array(12).fill(0);
      const arr2 = new Array(12).fill(0);

      bookingDetails.forEach((item) => {
        const month = new Date(item?.date).getMonth();
        const year = new Date(item?.date).getFullYear();
        if (selectedYear == year) arr[month] = arr[month] + item?.cartTotal;
      });

      refundDetails.forEach((item) => {
        const month = new Date(item?.createAt).getMonth();
        const year = new Date(item?.createAt).getFullYear();
        if (selectedYear == year) arr2[month] = arr2[month] = item?.price;
      });

      const yearTotalOrder = arr.reduce((sum, data) => sum + data, 0);
      const yearTotalRefund = arr2.reduce((sum, data) => sum + data, 0);

      res.send({
        product: count1,
        user: count2,
        order: count3,
        refund: count4,
        totalSale: totalSale,
        totalRefund: totalRefund,
        monthlyOrder: arr,
        monthlyRefund: arr2,
        yearTotalOrder: yearTotalOrder,
        yearTotalRefund: yearTotalRefund,
      });
    });

    app.get("/monthlydata", async (req, res) => {
      const selectedMonth = req.query.month;
      const selectedYear = req.query.year;
      const bookings = await bookingCollection
        .find(
          { paidStatus: true },
          {
            projection: {
              date: 1,
              cartTotal: 1,
              name: 1,
              email: 1,
              itemName: 1,
              itemQuantity: 1,
              transectionId: 1,
            },
          }
        )
        .toArray();
      console.log(bookings.length);
      const monthlyBookings = bookings.filter((item) => {
        const month = new Date(item?.date).getMonth();
        const year = new Date(item?.date).getFullYear();
        return month == selectedMonth && year == selectedYear;
      });

      res.send(monthlyBookings);
      // try {
      //   const workbook = new exceljs.Workbook();
      //   const sheet = workbook.addWorksheet("orders");
      //   sheet.columns = [
      //     { header: "NAME", key: "name", width: 25 },
      //     { header: "Email", key: "email", width: 50 },
      //     { header: "TransectionId", key:"transectionId", width: 50 },
      //     { header: "Total", key: "cartTotal", width: 50 },
      //   ];
      //   monthlyBookings.map((value, index) => {
      //     sheet.addRow({
      //       name: value.name,
      //       email: value.email,
      //       cartTotal: value.cartTotal,
      //     });
      //   });


      //   console.log(sheet);
      //   res.setHeader(
      //     "Content-Type",
      //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //   );
      //   res.setHeader(
      //     "Content-Disposition",
      //     "attachment;filename=" + "orders.xlsx"
      //   );

      //   workbook.xlsx.write(res);

      // } catch (err) {
      //   console.log(err);
      // }


    });

    app.get("/products", async (req, res) => {
      const query = {};
      let sortObj = {};
      let category = req.query.category;
      let brand = req.query.brand;
      let name = req.query.name;
      const sortField = req.query.sortField;
      let sortOrder = req.query.sortOrder;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      console.log(`category : ${category}`);

      if (category === "All Categories") {
        category = "";
      }
      if (brand === "All Brands") {
        brand = "";
      }
      if (sortOrder === "Default") {
        sortOrder = "";
      }

      if (category) {
        query.category = category;
      }
      if (brand) {
        query.brand_name = brand;
      }
      if (name) {
        query.name = { $regex: new RegExp(name, "i") };
      }
      if (sortField && sortOrder) {
        sortObj[sortField] = sortOrder;
      } else {
        sortObj.createAt = "desc";
      }

      const cursor = productCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sortObj);
      const result = await cursor.toArray();

      //  count data
      const total = await productCollection.countDocuments(query);
      res.send({
        total,
        result,
      });
    });

    app.post("/products", verifyToken, async (req, res) => {
      const product = req.body;
      const productData = { ...product, createAt: Date.now() };
      const result = await productCollection.insertOne(productData);
      res.send(result);
    });

    app.put("/product/:id", async (req, res) => {
      const product = req.body;
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: product,
      };
      const result = await productCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(filter);
      res.send(result);
    });

    // discount operation

    app.post("/discounts", verifyToken, async (req, res) => {
      const discount = req.body;
      const discountData = { ...discount, createAt: Date.now() };
      const query = {
        category: discount.category,
        brand_name: discount.brand_name,
        exDate: { $gte: Date.now() },
      };
      const isExist = await discountCollection.find(query).toArray();
      console.log(isExist.length);
      if (isExist.length != 0) return res.send("Discount Already Running");

      const result = await discountCollection.insertOne(discountData);
      res.send(result);
    });

    app.get("/discounts", async (req, res) => {
      let sort = {
        createAt: "desc",
      };
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      const cursor = discountCollection
        .find()
        .skip(skip)
        .limit(limit)
        .sort(sort);
      const result = await cursor.toArray();

      //  count data
      const total = await discountCollection.countDocuments();
      res.send({
        total,
        result,
      });
    });

    app.get("/discount", async (req, res) => {
      let query = {};
      query.exDate = { $gte: Date.now() };
      const result = await discountCollection.find(query).toArray();
      res.send(result);
    });

    app.put("/discount/:id", async (req, res) => {
      const discount = req.body;
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const query = {
        category: discount.category,
        brand_name: discount.brand_name,
        exDate: { $gte: Date.now() },
      };
      const isExist = await discountCollection.find(query).toArray();
      if (isExist.length != 0) return res.send("Discount Already Running");
      
      const updateDoc = {
        $set: discount,
      };
      const result = await discountCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.delete("/discounts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await discountCollection.deleteOne(filter);
      res.send(result);
    });

    // all carts operation

    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = await cartCollection.find(filter).toArray();
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    app.put("/cartprice/:id", async (req, res) => {
      const id = req.params.id;
      const { discountId, price } = req.body;

      const query = { _id: new ObjectId(discountId) };
      const findDiscount = await discountCollection.findOne(query);
      console.log(findDiscount);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          discountPrice: price,
          cupon: "",
        },
      };

      if (findDiscount?.exDate < Date.now()) {
        const result = await cartCollection.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      }
    });

    app.put("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const cartItem = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: cartItem,
      };

      const result = await cartCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    app.get("/carts/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollection.findOne(filter);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(filter);
      res.send(result);
    });

    app.put("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10),
        },
      };

      const result = await cartCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // payment operation
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseFloat(price * 100);

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/order", async (req, res) => {
      const tran_id = new ObjectId().toString();
      const order = req.body;
      const data = {
        total_amount: order.cartTotal,
        currency: order.currency,
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `https://e-commerce-server-sage.vercel.app/payment/success/${tran_id}?cartItems=${order?.cartItems}&productItems=${order?.productItems}&itemQuantity=${order?.itemQuantity}`,
        // success_url: `http://localhost:5000/payment/success/${tran_id}`,
        fail_url: "http://localhost:3030/fail",
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: order.name,
        cus_email: order.email,
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: order.phone,
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });

        const finalOrderData = {
          ...order,
          transactionId: tran_id,
          createAt: Date.now(),
          paidStatus: false,
          deliveryTime: Date.now(),
          refundStatus: true,
        };

        const result = bookingCollection.insertOne(finalOrderData);
        console.log("Redirecting to: ", GatewayPageURL);
      });

      // const result = await bookingCollection.insertOne(finalOrderData)

      app.post("/payment/success/:tranId", async (req, res) => {
        const cartItems = req.query.cartItems.split(",");
        const productItems = req.query.productItems.split(",");
        const itemQuantity = req.query.itemQuantity.split(",");

        console.log(productItems, itemQuantity);

        const result = await bookingCollection.updateOne(
          { transactionId: req.params.tranId },
          {
            $set: {
              paidStatus: true,
            },
          }
        );
        if (result.modifiedCount > 0) {
          const cartIds = cartItems.map((id) => new ObjectId(id));
          const deleteCart = await cartCollection.deleteMany({
            _id: { $in: cartIds },
          });
          productItems.map(async (item, index) => {
            const find = await productCollection.findOne({
              _id: new ObjectId(item),
            });
            const re = await productCollection.updateOne(
              { _id: new ObjectId(item) },
              {
                $set: {
                  totalsold: find?.totalsold + parseInt(itemQuantity[index]),
                  product_number:
                    find?.product_number - parseInt(itemQuantity[index]),
                },
              }
            );
          });

          res.redirect(
            `https://e-commerce-60dfa.web.app/payment/success/${req.params.tranId}`
          );
        }
      });
    });

    // Save booking info in booking collection
    app.post("/bookings", verifyToken, async (req, res) => {
      const booking = req.body;
      const result = await bookingCollection.insertOne(booking);
      const cartIds = booking.cartItems.map((id) => new ObjectId(id));
      const deleteCart = await cartCollection.deleteMany({
        _id: { $in: cartIds },
      });
      res.send(result);
    });

    app.get("/bookings", verifyToken, async (req, res) => {
      let sort = {
        createAt: "desc",
      };
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const email = req.query.email;
      const name = req.query.name;
      console.log(`nma :${name}`);
      let query = {};
      // let query2={}
      if (name) {
        query = {
          transactionId: { $regex: new RegExp(name, "i") },
          paidStatus: true,
        };
      } else {
        if (email) {
          query = {
            paidStatus: true,
            email: email,
          };
        } else {
          query = {
            paidStatus: true,
          };
        }
      }
      const skip = (page - 1) * limit;
      const cursor = bookingCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      const result = await cursor.toArray();

      const total = await bookingCollection.countDocuments(query);
      const totalpending = await bookingCollection.countDocuments({
        status: "pending",
        paidStatus: true,
      });
      res.send({
        total,
        result,
        totalpending,
      });
    });

    // update status
    app.put("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const { newStatus } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const data = await bookingCollection.findOne({ _id: new ObjectId(id) });
      const sub =
        data.status === "pending" ? "Order Confirmed" : "Order Delivered";
      const mess =
        data.status === "pending"
          ? `Your Order Confirmed.It will in your hand within 3 days.Thank You`
          : "Your Order Delivered successfully.Please give us review what you think about product.Thank you";

      const updateDoc = {
        $set: {
          status: newStatus,
          deliveryTime: Date.now(),
        },
      };

      const result = await bookingCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      if (result.modifiedCount > 0) {
        sendEmail(data.email, {
          subject: sub,
          message: mess,
        });
      }
      res.send(result);
    });

    // update refund status
    app.put("/bookings/:id", async (req, res) => {
      const id = req.params.id;
      const { refundStatus } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const data = await bookingCollection.findOne({ _id: new ObjectId(id) });
      const updateDoc = {
        $set: {
          refundStatus: refundStatus,
        },
      };

      const result = await bookingCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // refund operation
    app.post("/refund", async (req, res) => {
      const refund = req.body;
      const finalRefund = {
        ...refund,
        createAt: Date.now(),
      };
      const result = await refundCollection.insertOne(finalRefund);
      res.send(result);
    });

    // get refund
    app.get("/refunds", verifyToken, async (req, res) => {
      let sort = {
        createAt: "desc",
      };
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      let name = req.query.name;
      const email = req.query.email;
      let query = {};
      if (name) {
        query.bookingTranId = { $regex: new RegExp(name, "i") };
      }
      if (email) {
        query = {
          email: email,
        };
      }
      const skip = (page - 1) * limit;
      const cursor = refundCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);
      const result = await cursor.toArray();
      const total = await refundCollection.countDocuments(query);
      res.send({
        total,
        result,
      });
    });

    // delete refund
    app.post("/refunds", async (req, res) => {
      const refundInfo = req.body;
      const result = await refundCollection.deleteOne({
        _id: new ObjectId(refundInfo?._id),
      });
      const update = await bookingCollection.updateOne(
        { _id: new ObjectId(refundInfo?.bookingId) },
        {
          $set: {
            refundStatus: true,
          },
        }
      );
      res.send(result);
    });

    // update refund status
    app.put("/refunds/:id", async (req, res) => {
      const id = req.params.id;
      const { newStatus } = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const data = await refundCollection.findOne({ _id: new ObjectId(id) });
      const sub =
        data.status === "pending" ? "Refund Accepted" : "Refund Completed";
      const mess =
        data.status === "pending"
          ? `Your Refund request Confirmed.You will get your desired amount after we check refund products`
          : "We pay your desired amount.Thank you";

      const updateDoc = {
        $set: {
          status: newStatus,
        },
      };

      const result = await refundCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      if (result.modifiedCount > 0) {
        sendEmail(data.email, {
          subject: sub,
          message: mess,
        });
      }
      res.send(result);
    });

    // pay refund amount
    app.post("/refundpayment", async (req, res) => {
      const tran_id = new ObjectId().toString();
      const refundInfo = req.body;
      console.log(refundInfo);
      const data = {
        total_amount: refundInfo?.price,
        currency: "BDT",
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `https://e-commerce-server-sage.vercel.app/payments/success/${tran_id}?refundId=${refundInfo.refundId}`,
        fail_url: "http://localhost:3030/fail",
        cancel_url: "http://localhost:3030/cancel",
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: refundInfo?.name,
        cus_email: refundInfo?.email,
        cus_add1: refundInfo?.address,
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: refundInfo?.phone,
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({ url: GatewayPageURL });
        console.log("Redirecting to: ", GatewayPageURL);
      });

      const finalRefundData = {
        ...refundInfo,
        transactionId: tran_id,
        createAt: Date.now(),
        paidStatus: false,
      };

      const result = await successRefundCollection.insertOne(finalRefundData);

      app.post("/payments/success/:tranId", async (req, res) => {
        const refundId = req.query.refundId;

        const result = await successRefundCollection.updateOne(
          { transactionId: req.params.tranId },
          {
            $set: {
              paidStatus: true,
            },
          }
        );
        if (result.modifiedCount > 0) {
          const re = await refundCollection.updateOne(
            { _id: new ObjectId(refundId) },
            {
              $set: {
                status: "completed",
                transactionId: tran_id,
              },
            }
          );

          res.redirect(`https://e-commerce-60dfa.web.app/dashboard/manage-refunds`);
        }
      });
    });

    // review
    app.get("/product-reviews/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {
        productId: id,
      };
      const result = (await reviewCollection.find(filter).toArray()).reverse();
      res.send(result);
    });

    app.post("/pending-review", verifyToken, async (req, res) => {
      const pendingReview = req.body;
      const result = await pendingReviewCollection.insertOne(pendingReview);
      res.send(result);
    });

    app.get("/pending-review", verifyToken, async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = (
        await pendingReviewCollection.find(filter).toArray()
      ).reverse();
      res.send(result);
    });

    app.delete("/pending-review/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await pendingReviewCollection.deleteOne(filter);
      res.send(result);
    });

    app.post("/add-review", verifyToken, async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const result = (await reviewCollection.find(filter).toArray()).reverse();
      res.send(result);
    });

    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(filter);
      res.send(result);
    });

    app.put("/review/:id", async (req, res) => {
      const reviewData = req.body;
      console.log(reviewData);
      const filter = { _id: new ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: reviewData,
      };
      const result = await reviewCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    app.put("/reviews", async (req, res) => {
      const email = req.query.email;
      const reviewData = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: reviewData,
      };
      const result = await reviewCollection.updateMany(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
