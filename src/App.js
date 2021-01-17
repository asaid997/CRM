import React from "react"
import { observer } from "mobx-react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./App.css"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Clients from "./components/clients/Clients"
import CustomizedSnackbars from "./components/Snackbars"
import Actions from "./components/Actions/Actions"
import Dashboard from "./components/Analytics/Dashboard"

function App() {
  const [tab, setTab] = React.useState(0)

  return (
    <div>
      <Router>
        <AppBar position="static" id="tabs">
          <Tabs value={tab} >
            <Tab component={Link} to={'/'} label="Clients" />
            <Tab component={Link} to={'/actions'} label="Actions" />
            <Tab component={Link} to={'/analytics'} label="Analytics" />
          </Tabs>
        </AppBar>
        <Route path="/" exact render={() => { setTab(0); return <Clients/>}} />
        <Route path="/actions" exact render={() => { setTab(1); return <Actions/>} }/>
        <Route path="/analytics" exact render={() => { setTab(2); return <Dashboard/>}} />
      </Router>
      <CustomizedSnackbars />
    </div>
  )
}

export default observer(App)
