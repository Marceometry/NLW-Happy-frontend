import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Orphanages from './pages/orphanages'
import Orphanage from './pages/orphanage'
import CreateOrphanage from './pages/createOrphanage'
import Login from './pages/login'
import Admin from './pages/admin'
import Success from './pages/success'
import Delete from './pages/delete'
import Edit from './pages/edit'

export default function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/orphanages' exact component={Orphanages} />
            <Route path='/orphanages/:id' component={Orphanage} />
            <Route path='/create-orphanage' component={CreateOrphanage} />
            <Route path='/success' component={Success} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path='/delete/:id' component={Delete} />
            <Route path='/edit/:id' component={Edit} />
          </Switch>
        </BrowserRouter>
    )
}