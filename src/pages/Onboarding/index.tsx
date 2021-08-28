import React from 'react';
import OnboardingComponent, { AppEntry } from 'react-native-onboarding-animate';
import { Text, View } from 'react-native';
import FirstAppGuide from '../FirstAppGuide';
import SecondAppGuide from '../SecondAppGuide';
import ThirdAppGuide from '../ThirdAppGuide';
import Button from 'components/Button';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
let scenes = [
    {
        component: FirstAppGuide,
        backgroundColor: 'white',
    },
    {
        component: SecondAppGuide,
        backgroundColor: 'white',
    },
    {
        component: ThirdAppGuide,
        backgroundColor: 'white',
    },
];

const Onboarding = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <OnboardingComponent scenes={scenes} enableBackgroundColorTransition={true} />
            <View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
                <Button onPress={() => navigation.navigate('Home')} color={false} disabled={false}>
                    시작하기
                </Button>
            </View>
        </Container>
    );
};

export default Onboarding;
export const Container = styled.View`
    flex: 1; ;
`;
