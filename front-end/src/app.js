import React from 'react'
import Menu from "./components/common/menu"
import PicHolder from "./components/picHolder"
import { Route, Switch } from 'react-router-dom'
import SnakesPage from './components/SnakesPage'

const App = () => {
    return (
        <div className='container-fluid'>
            <Menu />
            <Switch>
                <Route exact path="/" component={PicHolder} />
                <Route exact path="/snakes" component={SnakesPage} />
                <Route path="/snakes/:slug" component={SnakesPage} />
            </Switch>
        </div>
    )
}

export default App