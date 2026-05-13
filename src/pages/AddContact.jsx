import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const AGENDA_SLUG = "Michelle";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export const AddContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormData);

  const isEditing = id ? true : false;

  async function handleSubmit(event) {
    event.preventDefault();

    let url = `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`;
    let method = "POST";

    if (isEditing) {
      url = `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${id}`;
      method = "PUT";
    }

    await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData(initialFormData);
    navigate("/");
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">
        {isEditing ? "Edit contact" : "Add a new contact"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Full Name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Phone"
          value={formData.phone}
          onChange={(event) =>
            setFormData({ ...formData, phone: event.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Address"
          value={formData.address}
          onChange={(event) =>
            setFormData({ ...formData, address: event.target.value })
          }
        />

        <button className="btn btn-primary w-100 mb-3">
          {isEditing ? "Update" : "Save"}
        </button>

        <Link to="/">or get back to contacts</Link>
      </form>
    </div>
  );
};