import Header from '../header';
import NoteManager from '../note-manager';
import '../../styles/homepage.css';

const Userpage = () => {
    return(
        <div className="home-container">
            <Header className="App-header"/>
            <NoteManager />
        </div>
    )
}

export default Userpage;