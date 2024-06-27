import React, { useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

const Footer = ({ navigation, isDarkTheme }) => {
  const route = useRoute();
  const currentRoute = route.name;

  const getIconColor = (screen) => {
    return currentRoute === screen ? '#007bff' : (isDarkTheme ? '#fff' : '#000');
  };

  return (
    <View style={[styles.footer, isDarkTheme && styles.darkFooter]}>
      {[
        { name: 'Home', icon: 'home', screen: 'Home' },
        { name: 'My Card', icon: 'credit-card', screen: 'Cards' },
        { name: 'Stats', icon: 'bar-chart', screen: 'Stats' },
        { name: 'Settings', icon: 'cog', screen: 'Settings' },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.screen)}
          style={styles.iconContainer}
        >
          <Icon name={item.icon} type="font-awesome" size={24} color={getIconColor(item.screen)} />
          <Text style={[styles.iconLabel, { color: getIconColor(item.screen) }]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SettingsScreen = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkTheme && styles.darkContainer]}>
      <View style={[styles.contentContainer, isDarkTheme && styles.darkContentContainer]}>
        <Text style={[styles.title, isDarkTheme && styles.darkText]}>Settings</Text>
        {['Language', 'My Profile', 'Contact Us', 'Change Password', 'Privacy Policy'].map((item, index) => (
          <View key={index} style={styles.setting}>
            <Text style={[styles.settingText, isDarkTheme && styles.darkText]}>{item}</Text>
            <Text style={[styles.settingText, isDarkTheme && styles.darkText]}></Text>
            <View style={styles.arrowContainer}>
                <Text style={{ color: '#808080', fontSize: 20 }}> {'>'} </Text>
              </View>
          </View>
        ))}
        <View style={styles.setting}>
          <Text style={[styles.settingText, isDarkTheme && styles.darkText]}>Theme</Text>
          <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
      </View>
      
      <Footer navigation={navigation} isDarkTheme={isDarkTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    marginTop: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 15,
    color: '#333',
    textAlign: "center",
  },
  darkText: {
    color: '#fff',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f2f5',
    marginBottom: 30,
  },
  darkFooter: {
    backgroundColor: '#222',
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default SettingsScreen;
