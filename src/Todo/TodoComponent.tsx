import { inject, observer } from 'mobx-react';
import React from 'react';
import { Row } from 'reactstrap';
import TodoList from './TodoList';
import TodoStore from './TodoStore';

@inject("TodoStore")
@observer
export default class TodoComponent extends React.Component<
    { TodoStore?: TodoStore},
    { title: string; isCompleted: boolean; todoError: Error | null}
> {
    constructor(props: any) {
        super(props);
        this.state = { title: '', isCompleted: false, todoError: null};
    }

    addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await this.props.TodoStore?.addTodo(this.state.title, this.state.isCompleted);

        this.setState({title: "", isCompleted: false});
    }

    onTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({title: evt.target.value });
    }

    onIsCompletedChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({isCompleted: evt.target.checked});
    }

    render() {
        let todos = this.props.TodoStore?.getTodos() ?? [];

        return(
            <div className="todoContainer">
                {this.state.todoError?.message ? (
                    <div>
                        <div className="alert alert-danger" role="alert">
                        Some error occurred. Please try again
                        </div>
                    </div>
                ) : null}

                <h4 style={{ marginBottom: '30px' }}>Create New Wishlist</h4>

                <form onSubmit={this.addTodo}>
                    <div>
                        <Row>
                            <div className="form-group col-md-8">
                                <label className="form-label" htmlFor="title">
                                Wish
                                </label>
                                <input
                                placeholder="Enter your Wish"
                                className="form-control"
                                onChange={this.onTitleChange}
                                name="title"
                                id="title"
                                style={{ minWidth: '150px' }}
                                value={this.state.title}
                                required
                                />
                            </div>

                            <div
                                className="col-md-2 form-check"
                                style={{
                                marginTop: '40px',
                                marginLeft: '20px',
                                verticalAlign: 'center',
                                }}
                            >
                                <input
                                type="checkbox"
                                className="form-check-input"
                                id="isCompleted"
                                name="isCompleted"
                                onChange={this.onIsCompletedChange}
                                checked={this.state.isCompleted}
                                />

                                <label htmlFor="IsCompleted" className="form-check-label">
                                Completed?
                                </label>
                            </div>

                            <div
                                className="col-md-2 mt-30 ml-20"
                                style={{
                                marginTop: '30px',
                                verticalAlign: 'center',
                                }}
                            >
                                <button type="submit" className="btn btn-primary">
                                Add
                                </button>
                            </div> 
                        </Row>
                    </div>
                </form>

                <hr/>

                <div className="mt-20">
                    <TodoList todos={todos} />
                </div>
            </div>
        );
    }
}