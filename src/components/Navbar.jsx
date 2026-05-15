import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">

				<Link to="/" className="text-decoration-none text-dark">
					<span>Contact List</span>
				</Link>

				<div className="ms-auto">
					<Link to="/create-contact">
						<button className="btn btn-success">
							Add new contact
						</button>
					</Link>
				</div>

			</div>
		</nav>
	);
};