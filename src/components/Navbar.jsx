import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		 <nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Contact List
				</Link>

				<Link to="/create-contact">
					<button className="btn btn-success">Add new contact</button>
				</Link>
			</div>
    </nav>
	);
};