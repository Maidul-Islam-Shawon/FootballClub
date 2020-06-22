import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ClubPage from "./pages/ClubPage";
import MembersPage from "./pages/MembersPage";
import AddClub from "./Components/AddClub";
import AddMember from "./Components/AddMember";
import ClubWithMembers from "./pages/ClubWithMembers";
import ReduxClubPage from "./REDUX/Pages/ReduxClubPage";
import ReduxAddClub from "./REDUX/Components/ReduxAddClub";
import ___TestReduxAddClub from "./REDUX/Components/___TestReduxAddClub";
import ReduxMemberPage from "./REDUX/Pages/ReduxMemberPage";
import ReduxAddMember from "./REDUX/Components/ReduxAddMember";
import ReduxClubWithMembers from "./REDUX/Pages/ReduxClubWithMembers";

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

        {/* Redux components below */}
        <Route exact path="/reduxclub" component={ReduxClubPage} />
        <Route exact path="/reduxaddclub" component={ReduxAddClub} />
        <Route exact path={"/reduxaddclub/:id"} component={ReduxAddClub} />

        <Route exact path="/reduxmember" component={ReduxMemberPage} />
        <Route exact path="/reduxaddmember" component={ReduxAddMember} />
        <Route exact path={"/reduxaddmember/:id"} component={ReduxAddMember} />

        <Route
          exact
          path="/reduxclubwithmembers"
          component={ReduxClubWithMembers}
        />
      </Router>
    </div>
  );
}

export default App;
