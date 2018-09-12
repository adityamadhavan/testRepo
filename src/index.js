import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board1 from './Board1';
import registerServiceWorker from './registerServiceWorker';


class App extends React.Component{
    render(){
        return(
            <div>
                <Board1 />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();