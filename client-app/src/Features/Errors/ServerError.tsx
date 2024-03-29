import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../App/Api/Stores/Store";
import { observer } from "mobx-react-lite";

export default observer(function ServerError () {
    const { commonStore } = useStore();
    return (
        <Container>
            <Header as="h1" content="Server Error" />
            <Header sub as="h5" color="red" content={ commonStore.Error?.message } />
            { commonStore.Error?.details &&
                <Segment>
                    <Header as="h4" content="Stack trace" color="teal" />
                    <code style={ { marginTop: "10px" } }>{ commonStore.Error.details }</code>
                </Segment>
            }
        </Container>
    )
})