import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [products, setProducts] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const res =
          await API.get(
            "/products"
          );

        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (editingId) {
          await API.put(
            `/products/${editingId}`,
            formData
          );

          alert(
            "Product Updated"
          );
        } else {
          await API.post(
            "/products",
            formData
          );

          alert(
            "Product Added"
          );
        }

        setFormData({
          name: "",
          price: "",
          category: "",
          image: "",
          description: "",
        });

        setEditingId(null);

        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    };

  const handleEdit =
    (product) => {
      setEditingId(
        product._id
      );

      setFormData({
        name: product.name,
        price: product.price,
        category:
          product.category,
        image: product.image,
        description:
          product.description,
      });
    };

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete Product?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/products/${id}`
        );

        alert(
          "Product Deleted"
        );

        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        Admin Dashboard
      </h1>

      <div className="card shadow p-4 mb-5">
        <h3 className="mb-4">
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h3>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Product Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="number"
            name="price"
            className="form-control mb-3"
            placeholder="Price"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="category"
            className="form-control mb-3"
            placeholder="Category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="image"
            className="form-control mb-3"
            placeholder="Image URL"
            value={
              formData.image
            }
            onChange={
              handleChange
            }
            required
          />

          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <button
            className="btn btn-primary"
            type="submit"
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>
      </div>

      <div className="row">
        {products.map(
          (product) => (
            <div
              key={
                product._id
              }
              className="col-md-4 mb-4"
            >
              <div className="card shadow h-100">
                <img
                  src={
                    product.image
                  }
                  alt={
                    product.name
                  }
                  className="card-img-top"
                  style={{
                    height:
                      "220px",
                    objectFit:
                      "cover",
                  }}
                />

                <div className="card-body">
                  <h5>
                    {
                      product.name
                    }
                  </h5>

                  <p>
                    ₹
                    {
                      product.price
                    }
                  </p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        handleEdit(
                          product
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Admin;