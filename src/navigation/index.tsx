import React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Login from '../pages/Login';
import MyTabs from './TabNavigation';
import RegisterNickName from 'pages/RegisterNickName';
import UploadWeather from 'pages/UploadWeather';
import RegisterGender from '../pages/RegisterGender';
import RegisterConstitution from '../pages/RegisterConstitution';
import LocationSearch from '../pages/LocationSearch';
import UploadWeatherEstimate from 'pages/UploadWeatherEstimate';
import UploadClothes from 'pages/UploadClothes';
import MyPage from '../pages/MyPage';
import SettingsPage from 'pages/SettingsPage';
import NicknameChangePage from 'pages/NicknameChangePage';
import Question from 'pages/Question';
import AlertSettingPage from 'pages/AlertSettingPage';
import Onboarding from '../pages/Onboarding';
const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
            })}
            initialRouteName="Login"
        >
            <Stack.Screen name={'Onboarding'} component={Onboarding} />
            <Stack.Screen name="AlertSettingPage" component={AlertSettingPage} />
            <Stack.Screen name="NicknameChangePage" component={NicknameChangePage} />
            <Stack.Screen name="Question" component={Question} />
            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen name="UploadWeatherEstimate" component={UploadWeatherEstimate} />
            <Stack.Screen name="UploadClothes" component={UploadClothes} />
            <Stack.Screen name="UploadWeather" component={UploadWeather} />
            <Stack.Screen name="Home" component={MyTabs} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="RegisterNickName" component={RegisterNickName} />
            <Stack.Screen name="RegisterGender" component={RegisterGender} />
            <Stack.Screen name="RegisterConstitution" component={RegisterConstitution} />
            <Stack.Screen name="LocationSearch" component={LocationSearch} />
            <Stack.Screen name="Mypage" component={MyPage} />
        </Stack.Navigator>
    );
};

export default MyStack;
