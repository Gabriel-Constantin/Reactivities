import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/Activities/Form/ActivityForm';
import ActivityDetails from '../../Features/Activities/Details/ActivityDetails';
import TestErrors from '../../Features/Errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/Errors/NotFound';
import ServerError from '../../Features/Errors/ServerError';

function App() {
    const location = useLocation();
    return (
        <>
        <ToastContainer position="top-right" hideProgressBar />
            <Route exact path="/" component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={ { marginTop: "7em" } }>
                            <Switch>
                                <Route exact path="/activities" component={ ActivityDashboard } />
                                <Route path="/activities/:id" component={ ActivityDetails } />
                                <Route
                                    path={ [ '/createActivity', '/manage/:id' ] }
                                    component={ ActivityForm }
                                    key={ location.key }
                                />
                                <Route path="/errors" component={ TestErrors } />
                                <Route path="/server-error" component={ ServerError } />
                                <Route component={ NotFound } />
                            </Switch>
                        </Container>
                    </>
                )}                  
            />           
        </>
    );
}

export default observer(App);