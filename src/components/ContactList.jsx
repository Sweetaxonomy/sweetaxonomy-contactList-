import { ContactCard } from "./ContactCard";

export const ContactList = ({ contacts, onDelete, onEdit }) => {
  return (
    <div className="shadow-sm border rounded overflow-hidden bg-white">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};