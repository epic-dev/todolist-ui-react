import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addNewToDo, fetchAll } from "../thunks";
import { Drawer, StyledDrawer, UserInfoBar } from "./Drawer";
import { FlexContainer, TextInput } from "../../../shared/components";
import { GridContainer } from "../../../shared/components/GridContainer";
import { GridItem } from "../../../shared/components/GridItem";
import { StickyFooter } from "../../../shared/components/StickyFooter";

interface IToDoList { }

const ToDoList: FC<IToDoList> = () => {
    const [label, setLabel] = useState('');
    const dispatch = useAppDispatch()
    const MOCK = [
        {id: 1, label: 'drawer with search by all items'},
        {id: 2, label: 'avatar with user name'},
        {id: 3, label: 'list of todolists and possibility to create new ones'},
        {id: 3.1, label: 'group todolists and possibility to create new ones'},
        {id: 4, label: 'list of all todos by selected list, today\'s list by default'},
        {id: 5, label: 'possibility to change background'},
        {id: 6, label: 'mark todo item as favorite or essential'},
        {id: 7, label: 'todo item due date'},
        {id: 8, label: 'notifications for mobile app'},
        {id: 9, label: 'drag \'n\'drop'},
        {id: 10, label: 'show completed items'},
    ]
    // const entries = useAppSelector(state => state.todos.entries) ?? MOCK //[]
    const entries = MOCK //[]

    const fetch = () => {
        dispatch(fetchAll());
    }
    const add = () => {
        dispatch(addNewToDo(label));
        setLabel('');
        dispatch(fetchAll());
    }
    const getItems = () => {
        return <ul style={{ color: 'white'}}>{entries.map(e => <li key={e.id}>{e.label}</li>)}</ul>
    }

    // TODO: instead of 300px use minmax()
    return (<GridContainer
            className="ToDoListContainer"
            $columns={['300px', 'auto']}
            $rows={['auto', '50px']}
            $height={'100vh'}
            $gutter={24}
        >
        <GridItem $row="1 / span 2" className="GridItemDrawerContainer">
        <Drawer/>
        </GridItem>
        <GridItem $row="1 / 2" $column="2 / -1" className="TodoListItems" $padding={24}>
            {/* 
                - label, name of todolist
                - display today date in case of selected today list
                - move each list to separate component or create generic one
             */}
            {
                entries.length > 0 && getItems()
            }
        </GridItem>
        <GridItem $row="2 / -1">
            <StickyFooter>
                <TextInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
                    value={label}
                    label=" + Add new To Do"
                    type="text"
                    required
                />
            </StickyFooter>
        </GridItem>
    </GridContainer>);
};

export default ToDoList;