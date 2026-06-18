import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get("/products");

        const foundProduct =
          res.data.find(
            (item) => item._id === id
          );

        setProduct(foundProduct);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const cartItem = cart.find(
    (item) =>
      item._id === id ||
      item.id === id
  );

  const reviews =
    JSON.parse(
      localStorage.getItem(
        `reviews_${id}`
      )
    ) || [];

  const handleReviewSubmit = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert(
        "Please login to review"
      );
      return;
    }

    if (!review.trim()) {
      alert(
        "Please enter a review"
      );
      return;
    }

    const newReview = {
      user: user.name,
      rating,
      comment: review,
      date:
        new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      `reviews_${id}`,
      JSON.stringify([
        newReview,
        ...reviews,
      ])
    );

    alert("Review Added ⭐");

    window.location.reload();
  };

  if (!product) {
  return (
    <div className="text-center py-5">
      <div
        className="spinner-border text-primary"
        role="status"
      ></div>

      <p className="mt-3">
        Loading Product...
      </p>
    </div>
  );
}

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="col-md-6">
          <h1 className="mb-3">
            {product.name}
          </h1>

          <h2 className="text-success mb-3">
            ₹{product.price}
          </h2>

          <p>
            <strong>
              Category:
            </strong>{" "}
            {product.category}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="text-success">
              In Stock ✅
            </span>
          </p>

          <p className="text-primary">
            🚚 Free Delivery Available
          </p>

          <hr />

          <p className="lead">
  {product.description}
</p>

          {cartItem ? (
            <div className="d-flex align-items-center mt-4">
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

              <span className="mx-3 fw-bold fs-4">
                {cartItem.quantity}
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
              className="btn btn-primary btn-lg mt-3"
              onClick={() =>
                addToCart(product)
              }
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>

      <hr className="my-5" />

      <h3>
        Customer Reviews ⭐
      </h3>

      <div className="mb-4">
        <select
          className="form-select mb-2"
          value={rating}
          onChange={(e) =>
            setRating(
              Number(
                e.target.value
              )
            )
          }
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐
          </option>
          <option value={4}>
            ⭐⭐⭐⭐
          </option>
          <option value={3}>
            ⭐⭐⭐
          </option>
          <option value={2}>
            ⭐⭐
          </option>
          <option value={1}>
            ⭐
          </option>
        </select>

        <textarea
          className="form-control"
          rows="3"
          placeholder="Write a review..."
          value={review}
          onChange={(e) =>
            setReview(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-success mt-2"
          onClick={
            handleReviewSubmit
          }
        >
          Submit Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map(
          (
            reviewItem,
            index
          ) => (
            <div
              key={index}
              className="card mb-3"
            >
              <div className="card-body">
                <h6>
                  {
                    reviewItem.user
                  }
                </h6>

                <p>
                  {"⭐".repeat(
                    reviewItem.rating
                  )}
                </p>

                <p>
                  {
                    reviewItem.comment
                  }
                </p>

                <small className="text-muted">
                  {
                    reviewItem.date
                  }
                </small>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default ProductDetails;