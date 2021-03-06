import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SingleMessage } from '../messenger/Messenger';
import styles from './FriendsOnline.module.css';
const Folder = process.env.REACT_APP_PUBLIC_FOLDER;
export const FriendsOnline = ({ user, chats, handleClickUp }) => {
  //const [chat, setChat] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const handleClick = () => {
    handleClickUp(user);
  };
  return (
    <div onClick={handleClick}>
      <li className={styles.friendsInfo}>
        <div className={styles.profileImgContainer}>
          <img
            src={
              user.profilePicture
                ? Folder + user.profilePicture
                : Folder + '/noimage.png'
            }
            alt=""
            className={styles.friendsPics}
          />
          <div className={styles.online}></div>
        </div>

        <span className={styles.friendsName}>{user.username}</span>
      </li>
    </div>
  );
};
