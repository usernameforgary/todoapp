import { Provider } from "mobx-react";
import React from 'react';
import { Col, Container, Row } from "reactstrap";
import './App.css';
import TodoComponent from "./Todo/TodoComponent";
import TodoStore from './Todo/TodoStore';
import TodoSummary from "./Todo/TodoSummary";

export default class App extends React.Component<{}, {}> {
    private todoStore: TodoStore;

    constructor(props: any) {
        super(props);
        this.todoStore = new TodoStore();
    }

    componentDidMount() {
        this.todoStore.init().then(() => {
            console.log([...this.todoStore.todos])
        });
    }

    render() {
        return(
            <div className="App">
                <h3>ToDo App using React and Mobx</h3>

                <Provider TodoStore={this.todoStore}>
                <Container fluid={true}>
                    <Row>
                    <Col md={{ size: 9 }}>
                        <TodoComponent/>
                    </Col>
                    <Col md={{ size: 3 }}>
                        <TodoSummary/>
                    </Col>
                    </Row>
                </Container>
                </Provider>
            </div>
        );
    }
}