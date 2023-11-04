import { FC, useState } from "react";
import { MdOutlineManageSearch } from "react-icons/md";
import { FaAlignLeft, FaChevronDown, FaChevronUp, FaRegCalendarAlt, FaRegClock, FaRegListAlt, FaRegStar } from "react-icons/fa";
import styled from "styled-components";
import { FlexContainer } from "../../../shared/components";
import { FlexItem } from "../../../shared/components/FlexItem";
import { TodoListBase } from "../types/TodoListBase";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { FilterType, setSelected } from "../ToDoSlices";

interface IDrawer {}

export const StyledDrawer = styled.div<IDrawer>`
    /* background-color: #242443; */
    background-color: #1A1A2F;
    border-right: 1px solid #000;
    height: 100%;
    width: 100%;
    display: block;
`;

export const Drawer: FC<IDrawer> = () => {
    return <StyledDrawer className="Drawer">
        <UserInfoBar />
        <CategoriesList />
    </StyledDrawer>;
}

interface IUserInfoBar { }
export const UserInfoBar: FC<IUserInfoBar> = () => {
    const userProfile = {
        firstName: "John",
    };
    return (<div style={{
        backgroundColor: '#242443',
        padding: '27px 16px',
        borderBottom: '1px solid #7A12FF',
        borderRadius: '0px 0px 20px 20px',
        color: 'white',
        display: 'flex',
    }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'start' }}>
            <img width={40} style={{ borderRadius: '10px'}} src="/images/avatar.jpg" alt="avatar" />
            
                <label style={{
                paddingLeft: '7px',
                fontSize: '0.875rem',
            }}>Hello, {userProfile.firstName ?? 'user'}!</label>
            
        </div>
        <div style={{ alignSelf: 'center' }}>
            <MdOutlineManageSearch onClick={() => console.log('Search')} size={26} cursor="pointer" />
        </div>
    </div>);
}

const getIconComponentByName = (name?: string) => {
    switch (name) {
        case 'star': return  <FaRegStar color="rgb(217, 83, 83)" />;
        case 'clock': return  <FaRegClock color="rgb(116, 131, 143)" />;
        case 'calendar': return  <FaRegCalendarAlt color="rgb(123, 203, 195)" />;
        case 'list': return  <FaRegListAlt color="rgb(101, 117, 214)" />;
        case 'aligned': return  <FaAlignLeft color="rgb(241, 165, 181)" />;
        default: return null;
    }
}
const CategoriesList: FC<{}> = () => {
    const dispatch = useAppDispatch();
    const predefinedLists: TodoListBase[] = [
        {id: '1', name: 'Essential tasks', group: false, icon: 'star', count: 0, items: [], selected: false, filterType: FilterType.Essential},
        {id: '2', name: 'Today Tasks', group: false, icon: 'clock', count: 0, items: [], selected: true, filterType: FilterType.Today},
        {id: '5', name: 'Planned', group: false, icon: 'calendar', count: 0, items: [], selected: false, filterType: FilterType.Planned},
        {id: '3', name: 'Categories', group: true, icon: 'list', count: 0, items: [{ name: 'category 1' }], selected: false, filterType: FilterType.Custom},
        {id: '4', name: 'All Tasks', group: false, icon: 'aligned', count: 0, items: [], selected: false, filterType: FilterType.All},
    ];
    return <FlexContainer $direction="column" $padding="30px 16px 0">
        {
            predefinedLists.map((list) => {
                return <CategoryListItem
                    key={list.id}
                    label={list.name}
                    group={list.group}
                    items={list.items}
                    icon={list.icon}
                    selected={list.selected}
                    filterType={list.filterType}
                />
            })
        }
    </FlexContainer>
}

interface ICategoryListItem {
    children?: React.ReactNode,
    label?: string,
    group?: boolean,
    items?: any,
    icon?: string,
    selected?: boolean,
    filterType?: FilterType,
}
// interface IToDoListItem extends IListItem {
//     categoryIcon?: React.ReactElement,
//     completed?: boolean,
// }
const CategoryListItem: FC<ICategoryListItem> = (props) => {
    const dispatch = useAppDispatch();
    const selectedFilter = useAppSelector(state => state.todos.selectedFilter);
    const [open, setOpen] = useState(false);
    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(isOpen => !isOpen);
        dispatch(setSelected(props.filterType ?? selectedFilter))
    };
    
    return <FlexContainer
        style={{
            borderRadius: '10px',
            fontSize: '1rem',
            backgroundColor: selectedFilter === props.filterType ? '#4f4f71' : '#242443',
            color: '#FFFFFF',
            cursor: 'pointer',
        }}
        $padding="12px"
        $margin="0 0 20px"
        $alignItems="center"
        onClick={onClick}
    >
        {
            getIconComponentByName(props.icon)
        }
        <FlexItem $flex={1} $margin="0 0 0 10px">
            <label>{props.label}</label>
            {props.children}
        </FlexItem>
        {
            props.group ? open ? <FaChevronUp /> : <FaChevronDown /> : null
        }
    </FlexContainer>
}