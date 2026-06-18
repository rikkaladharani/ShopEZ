import { Link } from "react-router-dom";

function Home() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const orders = user
    ? JSON.parse(
        localStorage.getItem(
          `orders_${user.id}`
        )
      ) || []
    : [];

  return (
    <>
      {/* Hero Section */}
      <section className="container-fluid bg-light py-5">
        <div className="row align-items-center px-5">

          <div className="col-md-6">
            <span className="badge bg-danger mb-3 fs-6">
  🔥 Limited Time Offer
</span>

<h1 className="display-3 fw-bold">
  Mega Sale 2026 🎉
</h1>

<h2 className="text-primary mb-3">
  Up To 50% OFF
</h2>

<p className="lead mb-4">
  Discover premium products,
  exclusive discounts,
  and smart shopping insights.
  Save up to 50% on selected
  electronics, wearables and laptops.
</p>

            <Link
              to="/products"
              className="btn btn-primary btn-lg me-3"
            >
              Shop Now
            </Link>

            <Link
              to="/dashboard"
              className="btn btn-outline-dark btn-lg"
            >
              View Analytics
            </Link>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
              alt="Shopping"
              className="img-fluid"
              style={{
                maxHeight: "280px",
              }}
            />
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="container-fluid py-5 px-5">
        <h2 className="text-center mb-4">
          Shop By Category
        </h2>

        <div className="row g-4 text-center">

          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <h1>🎧</h1>
              <h5>Audio</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <h1>⌚</h1>
              <h5>Wearables</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <h1>💻</h1>
              <h5>Laptops</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm p-4 h-100">
              <h1>🛒</h1>
              <h5>Shopping</h5>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="container-fluid py-5 px-5">
        <h2 className="text-center mb-4">
          Featured Products
        </h2>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5>
                  Boat Rockerz 450
                </h5>

                <p>
                  Wireless Bluetooth
                  Headphones
                </p>

                <Link
                  to="/products"
                  className="btn btn-dark"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5>
                  Apple Watch
                </h5>

                <p>
                  Smart Fitness &
                  Health Tracking
                </p>

                <Link
                  to="/products"
                  className="btn btn-dark"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5>
                  Dell XPS 13
                </h5>

                <p>
                  Premium Laptop for
                  Productivity
                </p>

                <Link
                  to="/products"
                  className="btn btn-dark"
                >
                  View Product
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Recent Orders */}
      {user &&
        orders.length > 0 && (
          <section className="container py-5">
            <h2 className="text-center mb-4">
              📦 Recent Orders
            </h2>

            <div className="row">
              {orders
                .slice(0, 3)
                .map((order) => (
                  <div
                    key={order.id}
                    className="col-md-4 mb-3"
                  >
                    <div className="card shadow h-100">
                      <div className="card-body">
                        <h5>
                          Order #
                          {order.id}
                        </h5>

                        <p>
                          {order.date}
                        </p>

                        <h6 className="text-success">
                          ₹
                          {order.total}
                        </h6>

                        <span className="badge bg-success">
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

      {/* Analytics Section */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">

          <h2>
            📈 Market Analytics
          </h2>

          <p className="lead">
            Analyze product trends,
            sales growth, and
            customer behavior.
          </p>

          <Link
            to="/dashboard"
            className="btn btn-light"
          >
            Open Dashboard
          </Link>

        </div>
      </section>
    </>
  );
}

export default Home;