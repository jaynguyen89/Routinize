import React from 'react';
import styles from './styles';
import { ScrollView, Text, View } from 'react-native';
import DrawerAccount from "../account/DrawerAccount";

interface IAppDrawer {
    navigation : any
}

const AppDrawer = (props: IAppDrawer) => {
    return (
        <View style={ styles.drawerContainer }>
            <DrawerAccount />

            <ScrollView>
                <View>
                    <Text style={styles.sectionHeadingStyle}>
                        Section 1
                    </Text>
                    <View style={styles.navSectionStyle}>
                        <Text style={styles.navItemStyle} onPress={() => props.navigation.navigate('Home')}>
                            Home
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.sectionHeadingStyle}>
                        Section 2
                    </Text>
                    <View style={styles.navSectionStyle}>
                        <Text style={styles.navItemStyle} onPress={() => props.navigation.navigate('Settings')}>
                            Settings
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={ styles.footerContainer }>
                <Text>This is my fixed footer</Text>
            </View>
        </View>
    );
}

export default AppDrawer;
