import Header from '../header';
import NoteManager from '../note-manager';
import '../../styles/homepage.css';

const Homepage = () => {
    return(
        <body>
            <Header className="App-header"/>
            <NoteManager />
        </body>
    )
}

export default Homepage;