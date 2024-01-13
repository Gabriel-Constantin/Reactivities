import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import ActivityDashboard from '../../Features/Activities/Dashboard/ActivityDashboard';
import HomePage from '../../Features/Home/HomePage';
import ActivityForm from '../../Features/Activities/Form/ActivityForm';
import ActivityDetails from '../../Features/Activities/Details/ActivityDetails';

function App() {
    const location = useLocation();
    return (
        <>
            <Route exact path="/" component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: "7em" }}>
                            <Route exact path="/activities" component={ActivityDashboard} />
                            <Route path="/activities/:id" component={ActivityDetails} />
                            <Route
                                path={['/createActivity', '/manage/:id']}
                                component={ActivityForm}
                                key={location.key}
                            />
                        </Container>
                    </>
                )}                  
            />           
        </>
    );
}

export default observer(App);