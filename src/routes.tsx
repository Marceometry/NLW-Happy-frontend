import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Orphanages from './pages/orphanages'
import Orphanage from './pages/orphanage'
import CreateOrphanage from './pages/createOrphanage'

function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/orphanages' exact component={Orphanages} />
            <Route path='/orphanages/create' component={CreateOrphanage} />
            <Route path='/orphanages/:id' component={Orphanage} />
          </Switch>
        </BrowserRouter>
    )
}

export default Routes