import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const { addToWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (category === "All" ||
          product.category === category)
    )
    .sort((a, b) => {
      if (sortBy === "low-high")
        return a.price - b.price;

      if (sortBy === "high-low")
        return b.price - a.price;

      if (sortBy === "a-z")
        return a.name.localeCompare(b.name);

      return 0;
    });

  return (
    <div className="container py-5">
      <h1 className="text-center">
        Products
      </h1>

      <p className="text-center text-muted mb-5">
        Showing {filteredProducts.length} Products
      </p>

      {/* Search */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {/* Categories */}
      <div className="text-center mb-4">
        <button
          className={`btn me-2 ${
            category === "All"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("All")
          }
        >
          All
        </button>

        <button
          className={`btn me-2 ${
            category === "Audio"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Audio")
          }
        >
          Audio
        </button>

        <button
          className={`btn me-2 ${
            category === "Wearables"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Wearables")
          }
        >
          Wearables
        </button>

        <button
          className={`btn me-2 ${
            category === "Laptops"
              ? "btn-dark"
              : "btn-outline-dark"
          }`}
          onClick={() =>
            setCategory("Laptops")
          }
        >
          Laptops
        </button>
      </div>

      {/* Sort */}
      <div className="row mb-4">
        <div className="col-md-3 ms-auto">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="">
              Sort Products
            </option>

            <option value="low-high">
              Price: Low → High
            </option>

            <option value="high-low">
              Price: High → Low
            </option>

            <option value="a-z">
              Name: A → Z
            </option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="row">
        {filteredProducts.map(
          (product) => {
            const cartItem =
              cart.find(
                (item) =>
                  item._id ===
                    product._id ||
                  item.id ===
                    product._id
              );

            return (
              <div
                key={product._id}
                className="col-md-3 mb-4"
              >
                <div className="card shadow h-100 border-0">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <h5>
                        <Link
                          to={`/products/${product._id}`}
                          className="text-decoration-none"
                        >
                          {product.name}
                        </Link>
                      </h5>

                      <p className="text-success fw-bold fs-5">
  ₹{product.price}
</p>

<p className="text-warning fw-bold mb-1">
  ⭐ {product.rating || 4.5}
</p>

<p className="text-muted mb-1">
  {product.category}
</p>

<p
  className={
    product.stock > 0
      ? "text-success fw-bold"
      : "text-danger fw-bold"
  }
>
  {product.stock > 0
    ? `In Stock (${product.stock})`
    : "Out Of Stock"}
</p>

                      <small className="text-secondary">
                        Premium quality product
                        with fast delivery.
                      </small>
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          addToWishlist(product);

                          alert(
                            "Added to Wishlist ❤️"
                          );
                        }}
                      >
                        ❤️
                      </button>

                      {cartItem ? (
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-light border"
                            onClick={() =>
                              decreaseQuantity(
                                product._id
                              )
                            }
                          >
                            -
                          </button>

                          <span className="mx-2 fw-bold">
                            {
                              cartItem.quantity
                            }
                          </span>

                          <button
                            className="btn btn-light border"
                            onClick={() =>
                              increaseQuantity(
                                product._id
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
  className="btn btn-primary"
  disabled={product.stock <= 0}
  onClick={() =>
    addToCart(product)
  }
>
  {product.stock > 0
    ? "Add To Cart"
    : "Out Of Stock"}
</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      {filteredProducts.length ===
        0 && (
        <h4 className="text-center mt-4 text-muted">
          No products found
        </h4>
      )}
    </div>
  );
}

export default Products;