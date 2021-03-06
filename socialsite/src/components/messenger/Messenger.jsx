import style from './Messenger.module.css';
import { VideoCall, MoreVert, Create } from '@mui/icons-material';

import { FriendsOnline } from '../friends/FriendsOnline';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import SingleMessage from '../singlemessage/SingleMessage';
import { formLabelClasses } from '@mui/material';
import { axiosInstance } from '../../proxySettings';
const Messenger = ({ show }) => {
  const { user, chats, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  //const [chats, setChat] = useState([]);

  // const handleClicks = (user) => {
  //   if (!user.chats.includes(user)) {
  //     setChat((prev) => {
  //       const t = [user, ...prev];
  //       console.log(t);
  //       return t;
  //     });
  //   }
  // };

  const handleClick = (userid) => {
    if (!chats.includes(userid)) {
      dispatch({ type: 'CHAT_START', payload: userid });
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axiosInstance.get('/users/friend/' + user._id);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [user._id]);

  return (
    <div className={style.messenger}>
      <div className={show ? style.messengerContent : style.none}>
        <div className={style.top}>
          <span className={style.title}>Chat</span>
          <div className={style.icons}>
            <VideoCall /> <MoreVert /> <Create />
          </div>
        </div>
        <input placeholder="Search Messenger" className={style.searchInput} />

        <ul className={style.friendsList}>
          {friends?.map((u) => (
            <FriendsOnline key={u.id} user={u} handleClickUp={handleClick} />
          ))}
        </ul>
      </div>

      <div className={chats?.length > 0 ? style.chatlist : style.none}>
        <ul className={chats?.length > 0 ? style.chats : style.none}>
          {chats?.slice(0, 3).map((u) => (
            <li className={style.chat}>
              <SingleMessage key={u._id} user={u} />
            </li>
          ))}
        </ul>
        <div className={style.remainingChats}>
          {chats?.slice(3).map((u) => (
            <div className={style.remainingChat}>{u.username}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
