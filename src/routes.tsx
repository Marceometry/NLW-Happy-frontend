import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Orphanages from './pages/orphanages'
import Orphanage from './pages/orphanage'
import CreateOrphanage from './pages/createOrphanage'
import Login from './pages/login'
import Admin from './pages/admin'
import Success from './pages/success'
import Delete from './pages/delete'

function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/orphanages' exact component={Orphanages} />
            <Route path='/orphanages/create' component={CreateOrphanage} />
            <Route path='/orphanages/:id' component={Orphanage} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path='/success' component={Success} />
            <Route path='/delete' component={Delete} />
          </Switch>
        </BrowserRouter>
    )
}

export default Routes