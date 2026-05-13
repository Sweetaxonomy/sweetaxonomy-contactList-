import { ContactList } from "../components/ContactList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AGENDA_SLUG = "Michelle";

async function verifyAgenda() {
  const response = await fetch(
    `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}`
  );

  if (response.status === 404) {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export const Home = () => {

	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);

	function editContact(id) {
	navigate(`/edit-contact/${id}`);
	}


  	async function getContacts() {

	await verifyAgenda();

	const response = await fetch(
		`https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`
	);

	const data = await response.json();

	setContacts(data.contacts || []);
	}

	async function deleteContact(id) {
    await fetch(
      `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${id}`,
      {
        method: "DELETE",
      });

    getContacts();
  }


  useEffect(() => {
    getContacts();
  }, []);

	return (
    
	<div className="container mt-4">
      <ContactList
        contacts={contacts}
        onDelete={deleteContact}
		onEdit={editContact}
      />
    </div>
  );
};