import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const MY_AGENDA_SLUG = "Michelle";

export function EditContact() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const contactId = params.get("contact_id");

  const [updateContactFormData, setUpdateContactFormData] = useState({
    name: params.get("name") || "",
    phone: params.get("phone") || "",
    email: params.get("email") || "",
    address: params.get("address") || ""
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await verifyAgenda();

    const url = `https://playground.4geeks.com/contact/agendas/${MY_AGENDA_SLUG}/contacts/${contactId}`;

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateContactFormData)
    };

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Contacto actualizado:", data);

    if (response.ok) {
      navigate("/");
    }
  }

  async function verifyAgenda() {
    const url = `https://playground.4geeks.com/contact/agendas/${MY_AGENDA_SLUG}`;
    const response = await fetch(url);

    if (response.status === 404) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      };

      await fetch(url, options);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold mb-4">
        Update contact {contactId}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={updateContactFormData.name}
            onChange={(e) =>
              setUpdateContactFormData((previousData) => ({
                ...previousData,
                name: e.target.value
              }))
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={updateContactFormData.email}
            onChange={(e) =>
              setUpdateContactFormData((previousData) => ({
                ...previousData,
                email: e.target.value
              }))
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Phone</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter phone"
            value={updateContactFormData.phone}
            onChange={(e) =>
              setUpdateContactFormData((previousData) => ({
                ...previousData,
                phone: e.target.value
              }))
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            value={updateContactFormData.address}
            onChange={(e) =>
              setUpdateContactFormData((previousData) => ({
                ...previousData,
                address: e.target.value
              }))
            }
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>

        <Link to="/">or get back to contacts</Link>
      </form>
    </div>
  );
}