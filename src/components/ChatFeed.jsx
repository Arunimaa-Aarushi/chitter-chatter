import React from "react";
import MsgForm from "./MsgForm";
import MyMsg from "./MyMsg";
import OtherMsg from "./OtherMsg";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMsg) =>
    chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMsg ? "right" : "left",
              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        )
    );
  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMsg = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMsg ? (
              <MyMsg message={message} />
            ) : (
              <OtherMsg
                message={message}
                lastMessage={message[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMsg ? "18px" : "0px",
              marginLeft: isMyMsg ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMsg)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return "Loading...";

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MsgForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
