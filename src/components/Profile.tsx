import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import FaceIcon from 'material-ui/svg-icons/action/face';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import PersonIcon from 'material-ui/svg-icons/social/person';
import ChildCareIcon from 'material-ui/svg-icons/places/child-care';
import FingerprintIcon from 'material-ui/svg-icons/action/fingerprint';
import ImportExportIcon from 'material-ui/svg-icons/communication/import-export';
import InsertPhotoIcon from 'material-ui/svg-icons/editor/insert-photo';
import LocalLibraryIcon from 'material-ui/svg-icons/maps/local-library';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import CardMembershipIcon from 'material-ui/svg-icons/action/card-membership';
import PersonOutlineIcon from 'material-ui/svg-icons/social/person-outline';
import EmailIcon from 'material-ui/svg-icons/communication/mail-outline';
import PlaceIcon from 'material-ui/svg-icons/maps/place';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { $ as MatchProfileContainer } from './match-profile/container/MatchProfCont';
import { $ as PotentialMatches } from './PotentialMatches';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';

const style = {
    className: 'flex-item-horizontal'
};

class Profile extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        if (!props.currentUser.profile.id) {
            console.log('fucking a');
            this.props.history.push('/');
        }
        console.log('fucking a');
    }

    updateIt() {
        this.forceUpdate();
    }

    render() {
        const translatedMatchingProfile = this.props.currentUser.translatedMatchingProfile();
        const profile = this.props.currentUser.profile;
        return (
            <div>
                <Card data-test="card-profile">
                    <Subheader>My Profile</Subheader>
                    <CardHeader
                        title={profile.name}
                        avatar={<Avatar icon={<AccountCircle />} />}
                    />
                    <CardText className="flex-container-horizontal">
                        <p>
                            Thank you for being an early adopter of Montessori Match!
                        </p>
                        <p>
                            For all of 2017 Montessori Match will be completely free for all users!
                        </p>
                        <p>
                            We would love your feedback as we build out the site and improve things.
                            Please email us at hello@montessorimatch.com with any suggestions you have.
                        </p>
                    </CardText>
                    <CardText className="flex-container-horizontal">
                        <List style={style}>
                            <Subheader>My Info</Subheader>
                            <ListItem
                                primaryText={profile.displayName}
                                leftIcon={<FaceIcon />}
                                data-test="item-display-name"
                            />
                            <ListItem
                                primaryText={profile.firstName}
                                leftIcon={<PersonIcon />}
                                data-test="item-first-name"
                            />
                            {this.props.currentUser.profile.memberType ===
                                'teacher'
                                ? (
                                    <ListItem
                                        primaryText={profile.lastName}
                                        leftIcon={<PersonOutlineIcon />}
                                        data-test="item-last-name"
                                    />
                                )
                                : null}
                            <ListItem
                                primaryText={profile.email}
                                leftIcon={<EmailIcon />}
                                data-test="item-email"
                            />
                        </List>
                        <div>
                            {!translatedMatchingProfile.ageRanges
                                ? (
                                    <div className="flex-item-horizontal">
                                        <p>
                                            Looking a little sparse here, huh?
                                        </p>
                                        <p>
                                            To get the most out of Montessori Match,
                                        </p>
                                        <RaisedButton
                                            label="fill out your matching profile!"
                                            primary={true}
                                            onClick={
                                                this.props.store.openMatchProfCont
                                            }
                                        />
                                    </div>
                                )
                                : (
                                    <div>
                                        <List style={style}>
                                            <Subheader>
                                                Matching Profile
                                            </Subheader>
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.ageRanges
                                                }
                                                leftIcon={<ChildCareIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.cals
                                                }
                                                leftIcon={<DateIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.orgTypes
                                                }
                                                leftIcon={<BusinessIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.traits
                                                }
                                                leftIcon={<FingerprintIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.trainings
                                                }
                                                leftIcon={<CardMembershipIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.edTypes
                                                }
                                                leftIcon={<LocalLibraryIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.locTypes
                                                }
                                                leftIcon={<InsertPhotoIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.sizes
                                                }
                                                leftIcon={<ImportExportIcon />}
                                            />
                                            <ListItem
                                                primaryText={
                                                    translatedMatchingProfile.states
                                                }
                                                leftIcon={<PlaceIcon />}
                                            />
                                        </List>
                                    </div>
                                )}
                        </div>
                        <PotentialMatches className="flex-item-horizontal" />
                    </CardText>
                    <MatchProfileContainer
                        updateProfile={this.updateIt}
                    />
                </Card>
            </div>
        );
    }
}

export const $ = withRouter(inject('currentUser', 'menus')(observer(Profile)));
