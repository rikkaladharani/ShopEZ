function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h3>Please login first</h3>
      </div>
    );
  }

  const orders =
    JSON.parse(
      localStorage.getItem(
        `orders_${user.id}`
      )
    ) || [];

  const wishlist =
    JSON.parse(
      localStorage.getItem(
        `wishlist_${user.id}`
      )
    ) || [];

  const cart =
    JSON.parse(
      localStorage.getItem(
        `cart_${user.id}`
      )
    ) || [];

  const totalOrders = orders.length;

  const totalItems = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (itemSum, item) =>
          itemSum + item.quantity,
        0
      ),
    0
  );

  const totalSpent = orders.reduce(
    (sum, order) =>
      sum + order.total,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert(
      "Logged Out Successfully"
    );

    window.location.href = "/";
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg mx-auto"
        style={{ maxWidth: "900px" }}
      >
        <div className="card-body p-5">

          <div className="text-center">
            <div
              className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "120px",
                height: "120px",
                fontSize: "50px",
              }}
            >
              👤
            </div>

            <h2 className="fw-bold">
              My Profile
            </h2>

            <p className="text-muted">
              Welcome back to ShopEZ
            </p>
          </div>

          <hr />

          <div className="row mb-4">
            <div className="col-md-6">
              <h5>
                👤 Name:
              </h5>
              <p>{user.name}</p>
            </div>

            <div className="col-md-6">
              <h5>
                📧 Email:
              </h5>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="row text-center g-3">

            <div className="col-md-3">
              <div className="card bg-light border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-primary">
                    {totalOrders}
                  </h3>
                  <p>Total Orders</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-light border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-success">
                    {totalItems}
                  </h3>
                  <p>Items Purchased</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-light border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-warning">
                    ₹{totalSpent}
                  </h3>
                  <p>Total Spent</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-light border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-danger">
                    {wishlist.length}
                  </h3>
                  <p>Wishlist Items</p>
                </div>
              </div>
            </div>

          </div>

          <div className="row text-center mt-4">

            <div className="col-md-6">
              <div className="card border-0 bg-light">
                <div className="card-body">
                  <h4>
                    🛒 {cart.length}
                  </h4>
                  <p>Items In Cart</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 bg-light">
                <div className="card-body">
                  <h4>
                    📅 2026
                  </h4>
                  <p>Member Since</p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-danger px-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;