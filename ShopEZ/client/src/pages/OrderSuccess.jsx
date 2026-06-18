import { Link } from "react-router-dom";

function OrderSuccess() {
  const order = JSON.parse(
    localStorage.getItem(
      "latestOrder"
    )
  );

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h3>
          No Order Found
        </h3>
      </div>
    );
  }

  return (
    <div className="container py-5 text-center">
      <div
        className="card shadow mx-auto p-5"
        style={{
          maxWidth: "700px",
        }}
      >
        <h1 className="text-success mb-4">
          ✅ Order Placed Successfully
        </h1>

        <h4>
          Order ID:
          {" "}
          {order._id ||
            `ORD-${Date.now()}`}
        </h4>

        <h5 className="mt-3">
          Date:
          {" "}
          {order.date}
        </h5>

        <h5 className="mt-3">
          Payment Method:
          {" "}
          {order.paymentMethod}
        </h5>

        <h5 className="mt-3">
          Shipping To:
          {" "}
          {
            order.shipping
              ?.fullName
          }
        </h5>

        <h3 className="mt-4">
          Total:
          ₹{order.total}
        </h3>

        <div className="mt-4">
          <Link
            to="/products"
            className="btn btn-primary me-2"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="btn btn-success"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;