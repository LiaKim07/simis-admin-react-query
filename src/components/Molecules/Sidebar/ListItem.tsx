import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthenticator from '../../../hooks/useAuthenticator';
import '../../../styles/components/Organisms/Sidebar.scss';
import { ListItemProps } from '../../../types/props';
import { containsAll } from '../../../utils/utility';
import ListSubItem from '../../Atoms/Sidebar/ListSubItem';

export default function ListItem(props: ListItemProps) {
    let itemArr: any = [];
    props.item.subItems?.map((item, i) => {
        itemArr.push(false);
    })

    const navigate = useNavigate();

    const routerTo = () => {
        navigate(props.item.link!)
    }

    return (
        <React.Fragment>

            <div className="list-items">
                <div className="d-flex">
                    <p className="mb-0 mt-0" onClick={() => { props.toogleDropper && props.toogleDropper(props.item.id) }}>
                        {/* {props.item.name} */}
                        <span onClick={() => routerTo}>{props.item.name}</span>

                    </p>
                    <div onClick={() => { props.toogleDropper && props.toogleDropper(props.item.id) }} className="icon-holder d-flex">
                        {(props.item.subItems) ?
                            props.open ?
                                <img src='/icons/arrow-up.svg' alt='arrow-down' width={18} /> :
                                <img src='/icons/arrow-down.svg' alt='arrow-down' width={18} /> : null}
                    </div>
                </div>
                {props.open ?
                    <div className="subitem-area">
                        {props.item.subItems?.map((item, i) => (
                            <ListSubItem items={item} key={i} />
                        ))}

                    </div>
                    : null
                }

            </div>
        </React.Fragment>
    )
}