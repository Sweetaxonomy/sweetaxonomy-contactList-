export const ContactCard = ({ contact, onDelete, onEdit }) => {
  return (
    <div className="d-flex align-items-center p-4 border-bottom bg-white">
      <img
        src="https://cdn.pixabay.com/photo/2018/10/23/10/29/cat-3767494_1280.jpg"
        alt={contact.name}
        className="rounded-circle me-4"
        style={{ width: "90px", height: "90px", objectFit: "cover" }}
      />

      <div className="flex-grow-1">
        <h5 className="fw-bold mb-2">{contact.name}</h5>

        <p className="mb-1 text-muted">
          <i className="fas fa-map-marker-alt me-2"></i>
          {contact.address}
        </p>

        <p className="mb-1 text-muted">
          <i className="fas fa-phone me-2"></i>
          {contact.phone}
        </p>

        <p className="mb-0 text-muted">
          <i className="fas fa-envelope me-2"></i>
          {contact.email}
        </p>
      </div>

      <div className="d-flex gap-3">
        <button
        className="btn btn-link text-dark"
        onClick={() => onEdit(contact.id)}
        >
        <i className="fas fa-pencil-alt"></i>
        </button>

        <button
          className="btn btn-link text-dark"
          onClick={() => onDelete(contact.id)}
        >
          <i className="fas fa-trash"></i>
        </button>

      </div>
    </div>
  );
};