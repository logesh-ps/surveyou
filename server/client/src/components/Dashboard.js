import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      Dashboard
      <div className="fixed-action-btn">
        <Link to="/survey/new"class="btn-floating btn-large red">
          <i class="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
