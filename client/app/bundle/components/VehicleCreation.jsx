import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from '../common/index';
import { createVehicle } from '../actions/index';

class VehicleCreation extends Component {
  componentDidMount(){
    //Create a variable for the CarQuery object.  You can call it whatever you like.
     var carquery = new CarQuery();

     //Run the carquery init function to get things started:
     carquery.init();

     //Optionally, you can pre-select a vehicle by passing year / make / model / trim to the init function:
     //carquery.init('2000', 'dodge', 'Viper', 11636);

     //Optional: Pass sold_in_us:true to the setFilters method to show only US models.
     carquery.setFilters( {sold_in_us:true} );

     //Optional: initialize the year, make, model, and trim drop downs by providing their element IDs
     carquery.initYearMakeModelTrim('year', 'brand', 'model_select', 'trim');

     //Optional: set the onclick event for a button to show car data.
     $('#cq-show-data').click(  function(){ carquery.populateCarData('car-model-data'); } );

     //Optional: initialize the make, model, trim lists by providing their element IDs.
     carquery.initMakeModelTrimList('make-list', 'model-list', 'trim-list', 'trim-data-list');

     //Optional: set minimum and/or maximum year options.
     carquery.year_select_min=1941;
     carquery.year_select_max=2017;

     //Optional: initialize search interface elements.
     //The IDs provided below are the IDs of the text and select inputs that will be used to set the search criteria.
     //All values are optional, and will be set to the default values provided below if not specified.
     var searchArgs =
     ({
         body_id:                       "cq-body"
        ,default_search_text:           "Keyword Search"
        ,doors_id:                      "cq-doors"
        ,drive_id:                      "cq-drive"
        ,engine_position_id:            "cq-engine-position"
        ,engine_type_id:                "cq-engine-type"
        ,fuel_type_id:                  "cq-fuel-type"
        ,min_cylinders_id:              "cq-min-cylinders"
        ,min_mpg_hwy_id:                "cq-min-mpg-hwy"
        ,min_power_id:                  "cq-min-power"
        ,min_top_speed_id:              "cq-min-top-speed"
        ,min_torque_id:                 "cq-min-torque"
        ,min_weight_id:                 "cq-min-weight"
        ,min_year_id:                   "cq-min-year"
        ,max_cylinders_id:              "cq-max-cylinders"
        ,max_mpg_hwy_id:                "cq-max-mpg-hwy"
        ,max_power_id:                  "cq-max-power"
        ,max_top_speed_id:              "cq-max-top-speed"
        ,max_weight_id:                 "cq-max-weight"
        ,max_year_id:                   "cq-max-year"
        ,search_controls_id:            "cq-search-controls"
        ,search_input_id:               "cq-search-input"
        ,search_results_id:             "cq-search-results"
        ,search_result_id:              "cq-search-result"
        ,seats_id:                      "cq-seats"
        ,sold_in_us_id:                 "cq-sold-in-us"
     });
     carquery.initSearchInterface(searchArgs);
     //If creating a search interface, set onclick event for the search button.  Make sure the ID used matches your search button ID.
     $('#cq-search-btn').click( function(){ carquery.search(); } );
  }
  manageInputs(){
    if(this.refs.model_not_found.checked){
      $('#model-select-group').css('display', 'none')
      $('#model-string-group').css('display', 'block')
    }else{
      $('#model-select-group').css('display', 'block')
      $('#model-string-group').css('display', 'none')
    }
  }
  fields(){
    return(
      <div>
        <div className="row">
          <div className="col s12 m6 l3">
            <label htmlFor="year">Année</label>
            <select name="year" ref="year" id="year" />
          </div>
          <div className="col s12 m6 l3">
            <label htmlFor="brand">Contructeur</label>
            <select name="brand" ref="brand" id="brand" />
          </div>
          <div id="model-select-group">
            <div className="col s12 m6 l3">
              <label htmlFor="model_select">Modèle</label>
              <select name="model_select" ref="model_select" id="model_select" />
            </div>
            <div className="col s12 m6 l3">
              <label htmlFor="trim">Extension</label>
              <select name="trim" ref="trim" id="trim" />
            </div>
          </div>
          <div id="model-string-group">
            <div className="col s12 m12 l6">
              <label htmlFor="model_string">Modèle</label>
              <input name="model_string" ref="model_string" id="model_string" />
            </div>
          </div>
        </div>
        <div className="col offset-l6 s12 l6">
          <p>
            <input type="checkbox" ref="model_not_found" id="model-not-found" onChange={() => this.manageInputs()} />
            <label htmlFor="model-not-found">Je ne trouve pas mon modèle.</label>
          </p>
        </div>
      </div>
    )
  }
  submit(e){
    e.preventDefault()
    const {year, brand, model_select, model_string, model_not_found } = this.refs
    let trim = this.refs.trim.childNodes[0].innerHTML
    trim = (trim === "None" || model_not_found.checked) ? "" : trim;
    const model = model_not_found.checked ? model_string.value : model_select.value
    const values = {year: year.value, brand: brand.value, model , trim }
    this.props.createVehicle(values)
  }
  render(){
    const { handleSubmit, wholeForm } = this.props;
    return(
      <div>
        {wholeForm ?
          <form onSubmit={(e) => this.submit(e)}>{this.fields()}<Button type="submit">enregistrer</Button></form>
          :
          this.fields()
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createVehicle }, dispatch);
}

export default connect(null, mapDispatchToProps)(VehicleCreation)
