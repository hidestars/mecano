import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Rater from 'react-rater';
import _ from 'lodash';
import { updateMecanoProfile, validateToken } from '../../actions/index';
import { Header, ProfilePicture, Button, ReviewList, DomainList } from '../../common/index';
import { injectIntl } from 'react-intl';
import { defaultMessages } from '../../../libs/i18n/default';

class MecanoProfile extends Component {
  componentWillMount(){
    this.props.validateToken()
  }
  submitDescription(){
    const { id, updateMecanoProfile } = this.props;
    updateMecanoProfile(id, { description: this.refs.description.value });
    $('#description_modal').modal('close');
  }
  componentDidMount(){
    $('.modal').modal();
    $('textarea').keyup(function() {
      const height = parseInt($(this).css('height'), 10)
      if( height + 39 < this.scrollHeight){
        $(this).css('height', `${this.scrollHeight}px`)
      }
    });
    $('#descriptionText').characterCounter();
  }
  render(){
    const { id, display_name, car_makes, technical_skills, pro, price, mobile, city, country, all_vehicles, description, rating, rates_number, reviews } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className="boxes-background">
        <Header>Mon profil mécano</Header>
        <div className="cover-picture"></div>
        <div className="profile-boxes">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <div className="box-shadow white-background white-background marged-20 padded-20">
                  <Link to={"/mecano_edit"}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <div className="direction-row">
                    <ProfilePicture currentUser={true}/>
                    <div className="profile-content">
                      <h5 className="capitalize">{ display_name }</h5>
                      <p>{pro? formatMessage(defaultMessages.mecanoPro) : formatMessage(defaultMessages.mecanoNonPro)}</p>
                      <h6 className="primary-text">{pro? `${price}€/h` : '' }</h6>
                    </div>
                  </div>
                  <hr/>
                  <div className="space-between">
                    <p className="no-margin">{city}, {country}</p>
                    {mobile ? <p className="no-margin green-text">{formatMessage(defaultMessages.mecanoMobile)}</p> : <p className="no-margin red-text">{formatMessage(defaultMessages.mecanoNonMobile)}</p>}
                  </div>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <h5 className="text-center capitalize">{formatMessage(defaultMessages.mecanoDescription)}</h5>
                  <div className="modal-trigger" data-target="description_modal">
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </div>
                  <div id="description_modal" className="modal">
                    <div className="modal-content">
                      <form className="margin-bottom-20">
                        <div className="full-width text-center">
                          <h2>Saisissez votre description</h2>
                        </div>
                        <br/>
                        <label htmlFor="descriptionText">{formatMessage(defaultMessages.mecanoDescription)}</label>
                        <textarea id="descriptionText" defaultValue={description} ref="description" className="materialize-textarea" data-length={400}></textarea>
                      </form>
                      <Button style={{ marginTop: '20px' }} clickTrigger={() => this.submitDescription()} fullWidth={true} type="submit">Enregistrer</Button>
                    </div>
                  </div>
                  {description === null || description.length === 0 ?
                    <p className="red-text">{formatMessage(defaultMessages.mecanoNoDescriptionMessage)}</p>
                  :
                    <p>{description}</p>
                  }
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <div className="big-stars">
                    <Rater rating={rating} interactive={false} />
                    <span>({rates_number})</span>
                  </div>
                  {reviews.length > 0 ?
                    <ReviewList title={formatMessage(defaultMessages.mecanoReviews)}
                      reviews={reviews} expandable={ reviews.length < rates_number}
                      loadMessage="Autres avis..." id={id} />
                  :
                    <div></div>
                  }
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <Link to={'/domain_edit'}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <h5 className="text-center capitalize">{formatMessage(defaultMessages.mecanoTechnicalSkillsString)}</h5>
                  <br/>
                  <DomainList kind="technical_skills" domains={technical_skills}/>
                </div>
                <div className="box-shadow white-background marged-20 padded-20">
                  <Link to={'/vehicle_edit'}>
                    <div className="box-edit btn btn-floating">
                      <i className="material-icons">edit</i>
                    </div>
                  </Link>
                  <h5 className="text-center capitalize">{formatMessage(defaultMessages.mecanoVehicles)}</h5>
                  <br/>
                  <p className="green-text uppercase">{all_vehicles ? formatMessage(defaultMessages.mecanoAllVehiclesMessage) : ''}</p>
                  <DomainList kind="car_makes" domains={car_makes}/>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMecanoProfile, validateToken }, dispatch);
}

function mapStateToProps({ mecano }) {
  const {car_makes, technical_skills, display_name, pro, id, price, city, country,
    mobile, all_vehicles, rating, rates_number, description, reviews} = mecano
  return {
    car_makes, technical_skills, display_name, pro, id, price, city,
    country, mobile, all_vehicles, rating, rates_number, description, reviews
  }
}

MecanoProfile = injectIntl(connect(mapStateToProps, mapDispatchToProps)(MecanoProfile))
export { MecanoProfile };
