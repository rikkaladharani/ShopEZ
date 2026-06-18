import { useContext } from "react";
import {
  WishlistContext,
} from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { addToCart } =
    useContext(CartContext);

  const handleMoveToCart = (item) => {
    addToCart(item);

    removeFromWishlist(item.id);

    alert("Moved To Cart 🛒");
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <h4 className="text-center">
          Wishlist is Empty
        </h4>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="col-md-4 mb-4"
            >
              <div className="card shadow h-100">
                <div className="card-body text-center">
                  <h5>
                    {item.name}
                  </h5>

                  <p className="fw-bold text-success">
                    ₹{item.price}
                  </p>

                  <p>
                    {item.category}
                  </p>

                  <div className="d-flex justify-content-center gap-2 mt-3">

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleMoveToCart(item)
                      }
                    >
                      Move To Cart 🛒
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        removeFromWishlist(
                          item.id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;