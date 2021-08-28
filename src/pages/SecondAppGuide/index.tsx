import React from 'react';

import { Image, Text, View } from 'react-native';
import AppGuidesLayout from '../../layout/AppGuides';
import { useNavigation } from '@react-navigation/native';
import { BigImage, Sun, TopContainer } from './style';
import { MoodImage } from '../../untils/MoodWeather';

const SecondAppGuide = () => {
    const navigation = useNavigation();
    const PushNextPage = () => {
        navigation.navigate('ThirdAppGuide');
    };
    const TopcontainerFunction = () => {
        return (
            <TopContainer style={{}}>
                <Sun source={require('Images/CutSun.png')} resizeMode={'contain'} />
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flex: 1,
                        alignItems: 'flex-end',
                    }}
                >
                    <BigImage source={require('Images/BIgVeryHot.png')} resizeMode={'contain'} />
                    <BigImage source={require('Images/BIgVeryCold.png')} resizeMode={'contain'} />
                </View>
            </TopContainer>
        );
    };
    return (
        <AppGuidesLayout
            titleContents={`기록 비교를 통해\n체감 온도를 예측할 수 있어요`}
            subTitleContents={`나와 다른사람이 기록한 날씨를 통해\n날씨를 간접적으로 체감할 수 있어요`}
            Images={'Second'}
            PushNextPage={PushNextPage}
            TopcontainerFunction={TopcontainerFunction}
        >
            <Text>SecondAppGuide</Text>
        </AppGuidesLayout>
    );
};

export default SecondAppGuide;
