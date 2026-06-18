import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } =
    useContext(CartContext);

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  const user = JSON.parse(
    localStorage.getItem("user")
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
        >
          🛒 ShopEZ
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-4 me-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
              >
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cart"
              >
                Cart

                {totalItems > 0 && (
                  <span className="badge bg-warning text-dark ms-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/orders"
              >
                Orders
              </Link>
            </li>

<li className="nav-item">
  <Link
    className="nav-link"
    to="/wishlist"
  >
    Wishlist 
  </Link>
</li>

            <li className="nav-item">
  <Link
    className="nav-link"
    to="/profile"
  >
    Profile
  </Link>
</li>

            <li className="nav-item">
  <Link
    className="nav-link"
    to="/dashboard"
  >
    Analytics
  </Link>
</li>

{user?.role === "admin" && (
  <li className="nav-item">
    <Link
      className="nav-link"
      to="/admin"
    >
      Admin
    </Link>
  </li>
)}
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-light me-3">
                  Hi, {user.name}
                </span>

                <button
                  className="btn btn-danger"
                  onClick={
                    handleLogout
                  }
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light me-2"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-warning"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;