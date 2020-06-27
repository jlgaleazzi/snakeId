import React from 'react'
import Menu from "./components/common/menu"
import PicHolder from "./components/picHolder"
import { Route, Switch } from 'react-router-dom'

const App = () => {
    return (
        <div className='container-fluid'>
            <Menu />
            <Switch>
                <Route exact path="/" component={PicHolder} />
                <Route path="/snakes" />
            </Switch>
        </div>
    )
}

export default App