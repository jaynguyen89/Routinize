import React from 'react';
import { connect } from 'react-redux';
import { sharedStyles } from '../../shared/styles';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import IIdea from '../../models/IIdea';
import IAddress from '../../models/IAddress';
import ICollaborator from '../../models/ICollaborator';

import IdeaRow from './components/IdeaRow';
import { Divider } from 'react-native-elements';
import { IRandomIdeas } from './redux/constants';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { baseFontSize } from '../../shared/typography';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Popover from 'react-native-popover-view/dist/Popover';
import PopoverMenu from '../../customs/PopoverMenu';
import { ACTION_TYPES } from '../../shared/enums';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const items : Array<IIdea> = [
    { id : 1, author : {
            id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
            address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
        } as ICollaborator, isPersonal : true, emphasized : false, createdOn : '01 Dec 2020 13:39',
    content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' } as IIdea,
    { id : 2, author : {
            id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
            address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
        } as ICollaborator, isPersonal : true, emphasized : false, createdOn : '03 Dec 2020 15:41',
        content : 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' } as IIdea,
    { id : 3, author : {
            id : 1, firstName : 'Jay', lastName : 'Nguyen', gender : true, phoneNumber : '04422357488', title : 'Software Developer',
            address : { id : 1, name : 'Home', address : '1 15 Haven Cl, Sunshine West, VIC 3020', coordination : { lat : -37.7931399, long : 144.8049009 } } as IAddress
        } as ICollaborator, isPersonal : true, emphasized : false, createdOn : '05 Dec 2020 10:21',
        content : 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' } as IIdea
];

const RandomIdeas = (props : IRandomIdeas) => {
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
                {
                    items.map((item : IIdea) => {
                        return (
                            <View key={ item.id }>
                                <IdeaRow item={ item } navigation={ props.navigation } />
                                <Divider style={{ backgroundColor : props.settings.theme.btnDisabled.color }} />
                            </View>
                        );
                    })
                }
            </ScrollView>

            <Popover isVisible={ showPopover } onRequestClose={ () => setShowPopover(false) }
                     from={ stackButton } arrowStyle={{ backgroundColor : 'transparent' }}>
                <PopoverMenu actions={[
                    { name : 'Add New Idea', type : ACTION_TYPES.NORMAL, callback : () => console.log('Add Item') },
                    { name : 'Sync Data', icon : 'trash-can', type : ACTION_TYPES.NORMAL, callback : () => console.log('Sync') }
                ]} />
            </Popover>
        </>
    );
}

export default connect(
    mapStateToProps
)(RandomIdeas);
