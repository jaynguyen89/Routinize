import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles';
import { ITeamCard } from '../redux/constants';
import { Card } from 'react-native-paper';
import { Image, View, Text } from "react-native";
import { baseFontSize, Typography } from "../../../../shared/typography";
import { faStopwatch, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const mapStateToProps = (state : any) => ({
    settings : state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const TeamCard = (props : ITeamCard) => {
    return (
        <Card style={ styles.teamCard }>
            <View style={[ styles.contentWrapper, props.settings.theme.backgroundSecondary ]}>
                <View style={{ flex : 7 }}>
                    <Image source={{ uri : props.team.coverImage as string }} style={ styles.cardCover } />
                </View>

                <View style={ styles.infoWrapper }>
                    <Text style={[ Typography.fourthHeader, { textAlign : 'justify', fontWeight : 'bold' } ]}>{ props.team.teamName }</Text>
                    <Text style={[ Typography.small, { textAlign : 'justify' } ]}>{ props.team.teamCode }</Text>

                    <View style={ styles.projectWrapper }>
                        <View style={{ flexDirection : 'row' }}>
                            <Text style={[ Typography.regular, { flex : 1, fontWeight : 'bold' } ]}>Project:</Text>
                            <Text style={[ Typography.regular, { flex : 1, textAlign : 'right' } ]}>{ props.team.project.projectName }</Text>
                        </View>
                        <Text style={[ Typography.small, { textAlign : 'right' } ]}>{ props.team.project.projectCode }</Text>
                    </View>

                    <View style={{ flexDirection : 'row' }}>
                        <View style={{ flex : 1, flexDirection : 'row' }}>
                            <FontAwesomeIcon style={{ flex : 1 }} icon={ faUsers } size={ baseFontSize * 1.9 } />
                            <Text style={{ flex : 1 }}>{'  '}4</Text>
                        </View>
                        <View style={{ flex : 1, flexDirection : 'row' }}>
                            <FontAwesomeIcon style={{ flex : 1 }} icon={ faStopwatch } size={ baseFontSize * 1.9 } />
                            <Text style={{ flex : 1 }}>{ ` ${ props.team.project.dueDate }` }</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TeamCard);