import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {Link} from 'react-router-dom';
import { MecanoCard } from './index';
import { searchMecano, updateDistance } from '../../actions/index';
import { Header, Loader, Button } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoSearchResults extends Component {
  constructor(){
    super()
    this.state = { loading : true }
  }
  componentWillMount(){
    const search = () => {
      this.props.searchMecano(this.props.mecano_search_params)
    }
    search()
  }
  componentDidMount(){
    $('select').material_select();
    this.setState({ loading: false });
    const onDistanceChange = (event) => this.onDistanceChange(event);
    $('select').on('change', function(e) {
      onDistanceChange(e);
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({ loading: false });
    if(JSON.stringify(nextProps.mecano_search_params)
    !== JSON.stringify(this.props.mecano_search_params)){
      // TRIGGERED IF SEARCH PARAMS HAVE CHANGeD
      this.props.searchMecano(nextProps.mecano_search_params)
      this.setState({ loading: true });
    }
  }

  onDistanceChange(event){
    this.props.updateDistance(event.target.value)
  }

  searchResults(){
    const { mecano_search_results } = this.props;
    if(this.state.loading){
      return <Loader />
    }
    return(
      <div>
        {mecano_search_results.map((mecano) =>{
          const { id, distance, display_name, city, country, pro, mobile, price, picture } = mecano
          return <MecanoCard key={id} id={id} title={ display_name } city={city} country={country} pro={ pro } imgSrc={ picture.thumb.url } mobile={ mobile } price={ price } rating={4.33} raters={13} distance={distance} />
        })}
      </div>
    )
  }
  render(){
    const { distance, full_address, domains, vehicle } = this.props.mecano_search_params;
    const { formatMessage } = this.props.intl;
    const domain_list = domains.map((domain) =>{
      let key = _.camelCase('mecano_technical_skills_' + domain)
      return formatMessage(defaultMessages[key])
    })
    return (
      <div>
        <Header>Résultats de la recherche</Header>
        <div className="container">
          <div className="row">
            <div className="filters-group margin-top-20">
              <div className="input-field col s4 offset-m2 m4 l6">
                <select defaultValue={distance} onChange={(e) => {this.onDistanceChange(e)}}>
                  <option value="0">À domicile</option>
                  <option value="10">{'< 10km'}</option>
                  <option value="50">{'< 50km'}</option>
                </select>
                <label>Distance</label>
              </div>
              <div className="col s8 m6 m4 l6">
                <div id="search-data-recap" className= "space-between flex-end">
                  <div>
                    <p id="domain-list" className="capitalize">{domain_list.join(', ')}</p>
                    <p>{full_address.split(",").slice(full_address.split(",").length - 2)}</p>
                    <p>{`${vehicle.brand}, ${vehicle.model}`}</p>
                  </div>
                  <Link to={"/mecano_search"}>
                    <Button icon="edit" />
                  </Link>
                </div>
              </div>
            </div>

            {this.searchResults()}
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({searchMecano, updateDistance}, dispatch);
}

function mapStateToProps({ search }) {
  const { results, distance, vehicle, full_address, domains } = search
  return {
    mecano_search_results: results,
    mecano_search_params: {
      distance,
      vehicle,
      full_address,
      domains
    }
  }
}

MecanoSearchResults = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoSearchResults));

export { MecanoSearchResults };
