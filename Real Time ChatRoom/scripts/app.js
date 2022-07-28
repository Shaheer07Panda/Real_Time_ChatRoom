// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
//add aevent listenner

newChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

newNameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form    
    newNameForm.reset();
    //show and hide the update message
    updateMssg.innerText = `Your name updated to ${newName} `;
    setTimeout(() => {
        updateMssg.innerText = '';
    }, 3000)

});

rooms.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => {
            chatUI.render(chat);
        });
    }
});
const username = localStorage.username ? localStorage.username : 'anon';
// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));