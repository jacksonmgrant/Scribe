import Header from '../header';
import NoteManager from '../note-manager';
import '../../styles/homepage.css';

const Userpage = () => {
    return(
        <div>
            <Header className="App-header"/>
            <NoteManager />
        </div>
    )
}

export default Userpage;