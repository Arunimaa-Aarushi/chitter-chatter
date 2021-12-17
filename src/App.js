
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import './App.css';
import LoginForm from './components/LoginForm';


export function App() {

	if (!localStorage.getItem('username')) return <LoginForm />;

	return (
		<ChatEngine
			height='100vh'
			userName={localStorage.getItem('username')}
      		userSecret={localStorage.getItem('password')}
			projectID='5c1b8136-4580-4481-81d5-b3c0806b34fc'
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
		/>
	);
}

export default App;
