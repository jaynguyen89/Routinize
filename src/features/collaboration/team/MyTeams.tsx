import React from 'react';
import { connect } from 'react-redux';

import styles from "./styles";
import { IMyTeams } from './redux/constants';
import { ScrollView, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../../../shared/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { baseFontSize } from '../../../shared/typography';
import PopoverMenu from '../../../customs/PopoverMenu';
import { ACTION_TYPES } from '../../../shared/enums';
import Popover from 'react-native-popover-view/dist/Popover';
import ITeam from '../../../models/ITeam';
import IAddress from '../../../models/IAddress';
import ICollaborator from '../../../models/ICollaborator';
import IProject from '../../../models/IProject';
import TeamCard from './components/TeamCard';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {

}

const teams : Array<ITeam> = [
    { id : 1, teamName : 'Finibus Bonorum et Malorum', teamCode : 'JX9JS860HSU7KA1', project : {
            id : 1, projectName : 'Project Two', projectCode : 'JITF2345', coverImage : null, createdOn : '12 Nov 2020 18:09', dueDate : '31 Dec 2021', finalDate : null, createdBy : {
                id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
                address : { id : 1, name : 'Home', building : null, street : '1 15 Haven Cl', suburb : 'Sunshine West', postcode : '3020', state : 'VIC', country : 'Australia', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
            } as ICollaborator, description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        } as IProject, coverImage : 'https://picsum.photos/700', createdOn : '09 Jul 2020 06:14', createdBy : {
            id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
            address : { id : 1, name : 'Home', building : null, street : '1 15 Haven Cl', suburb : 'Sunshine West', postcode : '3020', state : 'VIC', country : 'Australia', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
        } as ICollaborator },
    { id : 2, teamName : 'Lorem ipsum dolor sit amet', teamCode : 'JX9JS860HSU7KA2', coverImage : 'https://picsum.photos/700', createdOn : '22 Aug 2020 20:33', createdBy : {
            id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
            address : { id : 1, name : 'Home', building : null, street : '1 15 Haven Cl', suburb : 'Sunshine West', postcode : '3020', state : 'VIC', country : 'Australia', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
        } as ICollaborator, project : {
            id : 1, projectName : 'Project Two', projectCode : 'JITF2345', coverImage : null, createdOn : '12 Nov 2020 18:09', dueDate : '31 Jan 2021', finalDate : null, createdBy : {
                id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
                address : { id : 1, name : 'Home', building : null, street : '1 15 Haven Cl', suburb : 'Sunshine West', postcode : '3020', state : 'VIC', country : 'Australia', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
            } as ICollaborator, description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        } as IProject },
    { id : 3, teamName : 'Ut enim ad minim veniam', teamCode : 'JX9JS860HSU7KA3', project : {
            id : 1, projectName : 'Project Two', projectCode : 'JITF2345', coverImage : null, createdOn : '12 Nov 2020 18:09', dueDate : '15 Feb 2021', finalDate : null, createdBy : {
                id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
                address : { id : 1, name : 'Home', building : null, street : '1 15 Haven Cl', suburb : 'Sunshine West', postcode : '3020', state : 'VIC', country : 'Australia', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
            } as ICollaborator, description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        } as IProject, coverImage : 'https://picsum.photos/700', createdOn : '', createdBy : {
            id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
            address : { id : 1, name : 'Home', building : null, street : '1 15 Haven Cl', suburb : 'Sunshine West', postcode : '3020', state : 'VIC', country : 'Australia', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
        } as ICollaborator }
];

const MyTeams = (props : IMyTeams) => {
    const [showPopover, setShowPopover] = React.useState(false);
    const stackButton = React.useRef('stackButton');

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity ref={ stackButton as unknown as string } style={ sharedStyles.stackBtnWrapper }
                                  onPress={ () => setShowPopover(true) }>
                    <FontAwesomeIcon icon={ faEllipsisV } size={ baseFontSize * 2 } color={ props.settings.theme.textFill.color } />
                </TouchableOpacity>
            ),
        });
    }, [props.navigation]);

    return (
        <>
            <ScrollView style={ sharedStyles.scroller }>
                { teams.map((team : ITeam, i : number) => <TeamCard key={ i } team={ team } />) }
            </ScrollView>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}>
                <PopoverMenu actions={[
                    { name : 'Create Team', icon : 'trash-can', type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Item') },
                    { name : 'Sync Data', icon : 'trash-can', type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(MyTeams);