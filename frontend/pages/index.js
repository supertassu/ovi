import Data from '../components/DataList';

class App extends React.Component {
    state = {data: [], error: ''};  
    
    componentDidMount() {
      this.loadData();
      this.interval = setInterval(() => this.loadData(), 10000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  
    async loadData() {
      try {
        const response = await fetch('https://ovi-backend.herokuapp.com/');
        const json = await response.json();
        console.log(json);
        this.setState({ data: json });  
      } catch (e) {
        console.error(e);
        this.setState({ error: e.toString() });
      }
    }
    
    render() {
      return (
        <div className="container">
          <style jsx global>
            {`
            .container {
              padding: 25px;
            }

            .error {
              padding: 20px;
              background-color: #f44336; /* Red */
              color: white;
              margin-bottom: 15px;
            }

            h1 {
              padding: 0;
            }

            td {
              border: 1px solid rgba(0, 0, 0, 0.1);
            }
            `}
          </style>

          <h1>ovihomma</h1>
          { this.state.data.length > 0 
            ? <Data data={this.state.data} />
            : (
                <div className="error">
                  <h1>Ei dataa</h1>
                </div>
              )
          }

          { this.state.error.length > 0 
            && (
              <div className="error">
                <h1>{this.state.error}</h1>
              </div>
            ) }
        </div>
      );
    }
  }
  
export default App;
  