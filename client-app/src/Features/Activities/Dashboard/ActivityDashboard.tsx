import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../App/Api/Stores/Store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useEffect } from "react";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
       if(activityRegistry.size <=1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"></LoadingComponent>

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})