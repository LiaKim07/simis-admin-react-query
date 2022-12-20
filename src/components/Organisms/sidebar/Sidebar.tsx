import "../../../styles/components/Organisms/Sidebar.scss";

import React, { useState } from "react";

import ListItem from "../../Molecules/Sidebar/ListItem";
import useAuthenticator from "../../../hooks/useAuthenticator";
import { IRole } from "../../../types/services/user.types";
import {
  containsAll,
  getPriorityRole,
  getRoleSidebar,
} from "../../../utils/utility";
import { ISidebar } from "../../../types/services/sidebar.types";
import jwt_decode from 'jwt-decode' // import dependency

export default function Sidebar() {
  const { user } = useAuthenticator();
  const token = localStorage.getItem('jwt_info');
  let jwtInfo;
  if (token && token !== null) {
    jwtInfo = JSON.parse(token);
  }
  if (jwtInfo === undefined) {
    window.location.href = '/login';
  }
  let decodeData: any = jwt_decode(jwtInfo.result.token);
  let userRoles = decodeData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  localStorage.setItem('tokenId', decodeData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"])
  const [listId, setListId] = useState(1);
  const [listIdState, setListIdState] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  let sidebarItems: ISidebar[] = [];
  if (user) {
    const role: IRole = getPriorityRole(userRoles);
    sidebarItems = getRoleSidebar(role);
  }

  const toogleDropper = (listId: number) => {
    if (listIdState === listId) {
      setListId(listId);
      setIsOpen(!isOpen);
    } else {
      setListIdState(listId);
      setListId(listId);
      setIsOpen(true);
    }
  };

  return (
    <React.Fragment>
      {user && sidebarItems.length > 0 ? (
        <div className={"container bg-sidebar p-0"}>
          <div className="sidebar-header d-flex">
            <img
              src={"/assets/images/simis-logo.png"}
              width={185}
              alt="Logo"
            />
          </div>
          <div className="sidebar-list-items border">
            {sidebarItems.map((item) => (
              item.id === listId ?
                <ListItem key={item.id} item={item} toogleDropper={toogleDropper} open={isOpen} />
                :
                <ListItem key={item.id} item={item} toogleDropper={toogleDropper} open={false} />
            ))}
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
