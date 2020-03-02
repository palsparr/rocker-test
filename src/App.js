import React from 'react';
import { connect } from 'react-redux'


import './App.css';
import { CLEAR_FORM, UPDATE_FORM } from './actions';


class App extends React.Component {
  constructor(props) {
    super(props);
    const { ssn, phone, email, country } = this.props.formData
    this.state = {
      ssn,
      phone,
      email,
      country,
      countries: [],
      error: '',
      displayError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getCountries()
  }

  async getCountries() {
    let response = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await response.json()
    this.setState({countries})
  }

  async handleChange(event) {
    const valueName = event.target.name
    const value = event.target.value
    let data
    this.setState({displayError: false})
    switch (valueName) {
      case 'email':
        const email = value.trim()
        data = {
          ...this.state, 
          email, 
        }
        await this.setState({email});
        break;
      case 'ssn': 
        const ssn = value.trim()
        data = {
          ...this.state, 
          ssn, 
        }
        await this.setState({ssn});
        break;
      case 'phone': 
        const phone = value.trim()
        data = {
          ...this.state, 
          phone, 
        }
        await this.setState({phone});
        break;
      case 'country': 
        data = {
          ...this.state, 
          country: value, 
        }
        await this.setState({country: value});
        break;
      default: 
        break;
      
    }
    this.props.updateFormData(data)
  }
  isFormValid() {
    const { ssn, email, phone, country } = this.state
    //SSN 
    if (ssn.length === 0 || !ssn.match(/^[0-9]{6}-?[0-9]{4}$/)){
      this.setState({error: 'Please enter a valid Social Security Number'})
      return false
    }
    //PHONE
    //NSN length of swedish phone numbers is 7 to 13 according to wikipedia
    if (phone.length === 0 || !phone.match(/^[0-9]{7,13}$/)) {
      this.setState({error: 'Please enter a valid Phone Number'})
      return false
    }
    //EMAIL
    if (email.length === 0) {
      this.setState({error: 'Please enter a valid Email Address'})
      return false
    }
    //COUNTRY
    if (country.length === 0) {
      this.setState({error: 'Please select a country'})
      return false
    }
    this.setState({error: ''})
    return true
  }

  handleSubmit(event) {
    if (this.isFormValid()) {
      console.log('SUCCESS!')
      this.setState({
        email: '',
        ssn: '',
        phone: '',
        country: '',
        error: '',
        displayError: false,
      })
      this.props.clearFormData()
    } else {
      console.log('something is invalid')
      this.setState({displayError: true})
    }
    event.preventDefault();
  }
  render () {
    const {ssn, phone, email, country, error, displayError, countries} = this.state
    return (
      <div className="App" style={{height:'100vh', padding: 14, display: 'flex', alignItems: 'center', justifyItems: 'center'}}>

      <form style={{height: '100%', width: 500, margin: 'auto'}} onSubmit={this.handleSubmit}>
          {/* SSN */}
          <div style={{width: 500, padding: 15}}> 
            <label>Social Security Number:
              <input type="text" name="ssn" value={ssn} onChange={this.handleChange} placeholder={'YYMMDD-XXXX'} />
            </label>            
          </div>
          {/* Phone */}
          <div style={{width: 500, padding: 15}}>
            <label>Phone Number:
              <input type="phone" name="phone" value={phone} onChange={this.handleChange} placeholder={'example: 0701234567'} />
            </label>
          </div>
          {/* Email */}
          <div style={{width: 500, padding: 15}}>
            <label>Email address:
              <input type="email" name="email" value={email} onChange={this.handleChange} placeholder={'example: abc@abc.se'} />
            </label>
          </div>
          {/* Country */}
          <div style={{width: 500, padding: 15}}>
            <label>Country:
              <select name="country" value={country} onChange={this.handleChange}>
                {/* Options to select from */}
                <option selected value={''}>--Choose a country--</option>
                {countries.map(country => <option value={country.name}>{country.name}</option>)}
              </select>
            </label>
          </div>
          {/* Submit */}
          <input type="submit" value="Submit" />
        </form>
        {displayError && 
          <a>{error}</a>
        }
      </div>
    );
  } 
}
const mapStateToProps = (state) => {
  return {
    formData: state
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    updateFormData: (data) => dispatch({type: UPDATE_FORM, data: data}),
    clearFormData: () => dispatch({type: CLEAR_FORM}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
