import { useEffect, useState } from "react";
import API from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [totalProducts, setTotalProducts] =
    useState(0);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [revenue, setRevenue] =
    useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [chartData, setChartData] =
    useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await API.get(
          "/products"
        );

        setTotalProducts(
          res.data.length
        );

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        if (!user) return;

        const orders =
          JSON.parse(
            localStorage.getItem(
              `orders_${user.id}`
            )
          ) || [];

        setTotalOrders(
          orders.length
        );

        const totalRevenue =
          orders.reduce(
            (sum, order) =>
              sum + order.total,
            0
          );

        setRevenue(
          totalRevenue
        );

        const wishlist =
          JSON.parse(
            localStorage.getItem(
              `wishlist_${user.id}`
            )
          ) || [];

        setWishlistCount(
          wishlist.length
        );

        const data =
          orders.map(
            (order, index) => ({
              order:
                `Order ${
                  index + 1
                }`,
              revenue:
                order.total,
            })
          );

        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        📊 ShopEZ Analytics Dashboard
      </h1>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h2 className="text-primary">
              {totalProducts}
            </h2>
            <p>Total Products</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h2 className="text-success">
              {totalOrders}
            </h2>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h2 className="text-warning">
              ₹{revenue}
            </h2>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center p-4">
            <h2 className="text-danger">
              {wishlistCount}
            </h2>
            <p>Wishlist Items</p>
          </div>
        </div>

      </div>

      <div className="card shadow mt-5">
        <div className="card-body">
          <h3 className="mb-4">
            Revenue Analytics 📈
          </h3>

          {chartData.length === 0 ? (
            <p>
              No Orders Yet
            </p>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="order"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;