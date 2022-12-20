import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/components/Organisms/Sidebar.scss';
import { ListSubNestedItemProps } from '../../../types/props';

export default function ListSubNestedItem(props: ListSubNestedItemProps) {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className="list-nested-items">
                <p onClick={() => navigate(props.item.link!)} className="mb-0 mt-0"> {props.item.name} </p>
            </div>
        </React.Fragment>
    )
}