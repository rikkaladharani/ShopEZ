import {
  useContext,
  useState,
} from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    setCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const shippingFee = 100;

  const tax = Math.round(
    total * 0.18
  );

  const isLoggedIn =
    !!localStorage.getItem("token");

  const [shipping, setShipping] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    });

  const [paymentMethod,
    setPaymentMethod] =
    useState("");

  const handleCheckout =
    async () => {
      if (!isLoggedIn) {
        alert(
          "Please login before checkout"
        );

        window.location.href =
          "/login";

        return;
      }

      if (
        !shipping.fullName ||
        !shipping.phone ||
        !shipping.address ||
        !shipping.city ||
        !shipping.pincode
      ) {
        alert(
          "Please fill all shipping details"
        );

        return;
      }

      if (!paymentMethod) {
        alert(
          "Please select a payment method"
        );

        return;
      }

      try {
        const user = JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

        const confirmPayment = window.confirm(
  `Proceed with ${paymentMethod} payment?`
);

if (!confirmPayment) {
  return;
}

        const order = {
          userId: user.id,
          date:
            new Date().toLocaleString(),
          items: cart,
          paymentMethod,
          total:
            total +
            shippingFee +
            tax,
          shipping,
          shippingFee,
          tax,
        };

        const res =
  await API.post(
    "/orders",
    order
  );

  for (const item of cart) {
  await API.put(
    "/products/stock",
    {
      productId:
        item._id,
      quantity:
        item.quantity,
    }
  );
}

localStorage.setItem(
  "latestOrder",
  JSON.stringify(res.data)
);

        localStorage.setItem(
          `cart_${user.id}`,
          JSON.stringify([])
        );

        setCart([]);

        alert(
          "Order Placed Successfully"
        );

        window.location.href =
          "/order-success";
      } catch (error) {
  console.log(error);

  console.log(
    error.response?.data
  );

  alert(
    error.response?.data?.message ||
    error.message
  );
}
    };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <h4 className="text-center">
          Cart is Empty
        </h4>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={
                item._id || item.id
              }
              className="card mb-3 shadow"
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>

                  <p>
                    ₹{item.price}
                  </p>

                  <p>
                    Subtotal: ₹
                    {item.price *
                      item.quantity}
                  </p>
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      decreaseQuantity(
                        item._id ||
                          item.id
                      )
                    }
                  >
                    -
                  </button>

                  <span className="mx-3 fw-bold">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      increaseQuantity(
                        item._id ||
                          item.id
                      )
                    }
                  >
                    +
                  </button>

                  <button
                    className="btn btn-danger ms-4"
                    onClick={() =>
                      removeFromCart(
                        item._id ||
                          item.id
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="card p-4 mb-4 shadow">
            <h4 className="mb-3">
              Shipping Details
            </h4>

            <input
              type="text"
              placeholder="Full Name"
              className="form-control mb-2"
              value={
                shipping.fullName
              }
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  fullName:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="form-control mb-2"
              value={
                shipping.phone
              }
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  phone:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Address"
              className="form-control mb-2"
              value={
                shipping.address
              }
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  address:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="City"
              className="form-control mb-2"
              value={
                shipping.city
              }
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  city:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Pincode"
              className="form-control"
              value={
                shipping.pincode
              }
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  pincode:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="card p-4 mb-4 shadow">
            <h4 className="mb-3">
              Payment Method
            </h4>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="Cash On Delivery"
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <label className="form-check-label">
                Cash On Delivery
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <label className="form-check-label">
                UPI
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <label className="form-check-label">
                Credit / Debit Card
              </label>
            </div>
          </div>

          <div className="text-end mt-4">
            <h5>
              Subtotal: ₹{total}
            </h5>

            <h5>
              Shipping: ₹
              {shippingFee}
            </h5>

            <h5>
              Tax (18%): ₹{tax}
            </h5>

            <hr />

            <h3>
              Total: ₹
              {total +
                shippingFee +
                tax}
            </h3>

            {!isLoggedIn && (
              <p className="text-danger">
                Login required to
                checkout
              </p>
            )}

            <button
              className="btn btn-success"
              disabled={!isLoggedIn}
              onClick={
                handleCheckout
              }
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;