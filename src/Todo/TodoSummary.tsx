import { inject, observer } from "mobx-react";
import React from "react";
import TodoStore from "./TodoStore";

@inject("TodoStore")
@observer
export default class TodoSummary extends React.Component<
    {todoStore? : TodoStore},
    {}
> {
    render() {
        const totalTodos = this.props.todoStore?.todos.length ?? 0;
        const completedTodos = this.props.todoStore?.todos.filter(x => x.isCompleted).length ?? 0;
        return (
            <section style={{fontSize: 'larger'}}>
                Todo status {totalTodos - completedTodos} Todo(s) pending from {' '}
                {totalTodos} Todo(s)
            </section>
        );
    }
}