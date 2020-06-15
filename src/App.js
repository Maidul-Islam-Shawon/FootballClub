import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ClubPage from "./pages/ClubPage";
import MembersPage from "./pages/MembersPage";
import AddClub from "./Components/AddClub";
import AddMember from "./Components/AddMember";
import ClubWithMembers from "./pages/ClubWithMembers";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/club" component={ClubPage} />
        <Route exact path="/addclub" component={AddClub} />
        <Route exact path={"/addclub/:id"} component={AddClub} />

        <Route exact path="/members" component={MembersPage} />
        <Route exact path="/addmember" component={AddMember} />
        <Route exact path={"/addmember/:id"} component={AddMember} />

        <Route exact path="/clubwithmembers" component={ClubWithMembers} />
      </Router>
    </div>
  );
}

export default App;
