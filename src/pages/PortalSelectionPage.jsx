import { Link } from "react-router-dom";

function PortalSelectionPage() {
  return (
    <section className="portal-selection">
      <div className="portal-grid">
        <Link className="portal-box customer" to="/customer">
          Customer
        </Link>
        <Link className="portal-box admin" to="/admin">
          Admin
        </Link>
      </div>
    </section>
  );
}

export default PortalSelectionPage;
