import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MY_AGENDA_SLUG = "Michelle";

const ConfirmDeleteModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Are you sure?</h5>
            <button type="button" className="btn-close" onClick={onCancel} aria-label="Close" />
          </div>

          <div className="modal-body">
            <p>If you delete this thing the entire universe will go down!</p>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button className="btn btn-primary" onClick={onCancel}>Oh no!</button>
            <button className="btn btn-secondary" onClick={onConfirm}>Yes baby!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ contact, onEdit, onDelete }) => (
  <div className="d-flex align-items-center border-bottom py-3 px-5">
    <img
      src="https://images.pexels.com/photos/29526909/pexels-photo-29526909.jpeg"
      alt={contact.name}
      className="rounded-circle me-5"
      style={{ width: "90px", height: "90px", objectFit: "cover" }}
    />

    <div className="flex-grow-1">
      <h5 className="mb-2">{contact.name}</h5>

      <p className="mb-1 text-muted small">
        <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
      </p>

      <p className="mb-1 text-muted small">
        <i className="fas fa-phone me-2"></i>{contact.phone}
      </p>

      <p className="mb-0 text-muted small">
        <i className="fas fa-envelope me-2"></i>{contact.email}
      </p>
    </div>

    <div className="d-flex gap-4 align-self-start mt-2">
      <button className="btn btn-link p-0 text-dark" onClick={() => onEdit(contact)}>
        <i className="fas fa-pencil-alt"></i>
      </button>

      <button className="btn btn-link p-0 text-dark" onClick={() => onDelete(contact.id)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  </div>
);

const Contacts = ({ contacts, onEdit, onDelete }) => (
  <div className="border rounded">
    {contacts.map((contact) => (
      <ContactCard
        key={contact.id}
        contact={contact}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export const Home = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  async function fetchContacts() {
    setIsLoading(true);

    await verifyAgenda();

    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/${MY_AGENDA_SLUG}/contacts`
    );

    const data = await response.json();

    setContacts(data.contacts);
    setIsLoading(false);
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

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleEdit = (contact) => {
    navigate(
      `/update-contact?contact_id=${contact.id}&email=${contact.email}&phone=${contact.phone}&name=${contact.name}&address=${contact.address}`
    );
  };

  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${MY_AGENDA_SLUG}/contacts/${pendingDeleteId}`,
      { method: "DELETE" }
    );

    setContacts((prev) => prev.filter((contact) => contact.id !== pendingDeleteId));
    setPendingDeleteId(null);
  };

  return (
    <div className="container mt-4">
      <ConfirmDeleteModal
        show={pendingDeleteId !== null}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />

      {isLoading ? (
        <div>Loading contacts...</div>
      ) : (
        <Contacts
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
        />
      )}
    </div>
  );
};