import React from 'react';
import { connect } from "react-redux";

import styles from '../styles';
import { sharedStyles } from '../../../shared/styles';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import IIdea from '../../../models/IIdea';
import { IIdeaRow } from '../redux/constants';
import { Typography } from '../../../shared/typography';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {

};

const IdeaRow = (props : IIdeaRow) => {
    const [showPopover, setShowPopover] = React.useState(false);

    const viewIdeaDetails = (item : IIdea) => {

    }

    return (
        <View style={ sharedStyles.scroller }>
            <TouchableRipple style={[ styles.rowWrapper, props.settings.theme.backgroundSecondary ]}
                             onPress={ () => viewIdeaDetails(props.item) } onLongPress={ () => setShowPopover(true) }>
                <>
                    <View style={[ styles.contentWrapper ]}>
                        <Text style={[ Typography.regular ]} numberOfLines={ 1 }>
                            { props.item.content }
                        </Text>
                    </View>

                    <View style={[ styles.infoSummary ]}>
                        <Text style={[ { flex : 1 }, Typography.small ]}>
                            { `${ props.item.author?.firstName } ${ props.item.author?.lastName }` }
                        </Text>

                        <Text style={[ { flex : 1, textAlign : 'right' }, Typography.small ]}>{ props.item.createdOn }</Text>
                    </View>
                </>
            </TouchableRipple>
        </View>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(IdeaRow);