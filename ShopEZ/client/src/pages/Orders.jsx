import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchOrders =
      async () => {
        try {
          const res =
            await API.get(
              "/orders"
            );

          const userOrders =
            res.data.filter(
              (order) =>
                order.userId ===
                user.id
            );

          setOrders(
            userOrders.reverse()
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h3>
          Please login to view
          orders
        </h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>
          Loading Orders...
        </h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center">
          <h4>
            No Orders Yet
          </h4>

          <p className="text-muted">
            Start shopping to
            place your first
            order.
          </p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card shadow mb-4"
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5>
                    Order ID:
                    {" "}
                    {order._id}
                  </h5>

                  <p className="text-muted mb-0">
                    {order.date}
                  </p>
                </div>

                <span className="badge bg-success p-2">
                  Delivered
                </span>
              </div>

              <hr />

              {order.items.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="row align-items-center mb-3"
                  >
                    <div className="col-md-6">
                      <h6>
                        {
                          item.name
                        }
                      </h6>
                    </div>

                    <div className="col-md-3">
                      Qty:
                      {" "}
                      {
                        item.quantity
                      }
                    </div>

                    <div className="col-md-3 text-end fw-bold text-success">
                      ₹
                      {item.price *
                        item.quantity}
                    </div>
                  </div>
                )
              )}

              <hr />

              <div className="text-end">
                <h4 className="text-primary">
                  Total:
                  {" "}
                  ₹
                  {order.total}
                </h4>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;