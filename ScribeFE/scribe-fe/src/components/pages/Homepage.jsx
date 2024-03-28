import Header from '../header';
import NoteManager from '../note-manager';
import '../../styles/homepage.css';

const Homepage = () => {
    return(
        <div>
            <Header className="App-header"/>
            <NoteManager />
        </div>
    )
}

export default Homepage;