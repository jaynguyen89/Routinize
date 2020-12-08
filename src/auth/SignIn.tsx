import React from 'react';
import { connect } from 'react-redux';

import styles from './styles';

const mapStateToProps = (state: any) => ({
    settings: state.settingsReducer.appSettings.settings
});

const mapActionsToProps = {};

const SignIn = (props: any) => {
    return (
        <></>
    );
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(SignIn);