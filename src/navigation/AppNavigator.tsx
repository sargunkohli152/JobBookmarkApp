import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import JobsScreen from '../screens/job-screens/JobsScreen'; 
import BookmarksScreen from '../screens/bookmark-screens/BookmarksScreen';
import ExpandedJobDetails from '../screens/ExpandedJobDetails/ExpandedJobDetails';
import { colors } from '../styles/colors';
import Icon from '../components/atoms/Icon';

const Tab = createBottomTabNavigator();
const JobsStack = createStackNavigator();
const BookmarksStack = createStackNavigator();

//we can also introduce gesture detectors to track gesture of user and let them slide and change tabs.
//react native reanimated is one such library that we can use.
const JobsStackNavigator = () => (
  <JobsStack.Navigator 
    screenOptions={{
      headerShown: false,
    }}
  >
    <JobsStack.Screen name="JobScreen" component={JobsScreen}/>
    <JobsStack.Screen 
      name="ExpandedJobDetails" 
      component={ExpandedJobDetails}
    />
  </JobsStack.Navigator>
);

const BookmarksStackNavigator = () => (
  <BookmarksStack.Navigator 
    screenOptions={{
      headerShown: false,
    }}
  >
    <BookmarksStack.Screen name="BookmarksScreen" component={BookmarksScreen} />
    <BookmarksStack.Screen name="ExpandedJobDetails" component={ExpandedJobDetails} />
  </BookmarksStack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: `${colors.darkBlue}`,
          headerStyle: {
            shadowColor: `${colors.black}`,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        }}
      >
        <Tab.Screen 
          name="Jobs"
          component={JobsStackNavigator} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon 
                icon={focused ? 'jobsIconFilled' : 'jobsIcon'} 
                size={size} 
                color={focused ? colors.darkBlue : colors.dimGray} 
              />
            ),
            tabBarStyle: { height: 60 },
            tabBarLabelStyle: { fontSize: 14, fontWeight: '500', marginBottom: 6 },
            tabBarIconStyle: { marginTop: 6 }
          }}
         />
        <Tab.Screen 
          name="Bookmarks"
          component={BookmarksStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon 
                icon={focused ? 'bookmarkIconFilled' : 'bookmarkIcon'} 
                size={size} 
                color={focused ? colors.darkBlue : colors.dimGray} 
              />
            ),
            tabBarStyle: { height: 60 },
            tabBarLabelStyle: { fontSize: 14, fontWeight: '500', marginBottom: 6 },
            tabBarIconStyle: { marginTop: 6 }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;