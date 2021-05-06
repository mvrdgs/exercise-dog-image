import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.getData = this.getData.bind(this);
    this.saveAtLocalStorage = this.saveAtLocalStorage.bind(this);
    this.retrieveFromLocalStorage = this.retrieveFromLocalStorage.bind(this);
    this.setDogName = this.setDogName.bind(this);

    this.state = {
      data: '',
      loading: true,
      dogName: '',
    };
  }

  componentDidMount() {
    this.retrieveFromLocalStorage();
  }

  shouldComponentUpdate(_nextProp, nextState) {
    if (nextState.data.includes('terrier')) return false;
    return true;
  }

  setDogName({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async getData(event) {
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      const data = await (await fetch('https://dog.ceo/api/breeds/image/random')).json();
      const dogBreed = data.message.split('/')[4];
      alert(dogBreed);
      this.setState({
        data: data.message,
        loading: false,
      });
    });
  }

  retrieveFromLocalStorage() {
    const localStorageData = JSON.parse(localStorage.getItem('Doguinho'));
    const [data, dogName] = localStorageData;
    this.setState({
      data,
      dogName,
      loading: false,
    });
  }

  saveAtLocalStorage(event) {
    event.preventDefault();
    const { data, dogName } = this.state;
    localStorage.setItem('Doguinho', JSON.stringify([data, dogName]));
  }

  render() {
    const { data, loading, dogName } = this.state;
    const loadingElement = <span className="loading-text">Loading...</span>;
    return (
      <div className="App">
        { loading ? loadingElement
          : <img className="dog-image" src={ data } alt="Random dog" /> }
        <div className="button-container">
          <button type="button" className="next-button" onClick={ this.getData }>
            Random dog picture!
          </button>
        </div>
        <div>
          <input
            type="text"
            name="dogName"
            value={ dogName }
            onChange={ this.setDogName }
          />
          <button type="button" onClick={ this.saveAtLocalStorage }>Save Doguinho</button>
        </div>
      </div>
    );
  }
}

export default App;
