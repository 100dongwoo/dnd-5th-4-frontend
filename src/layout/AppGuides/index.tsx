import React, { ReactNode } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { StepBar, SubTitleText, SubTitleWraper, TitleText, TitleWraper, Container, TopContainer } from './styles';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import { MoodImage } from '../../untils/MoodWeather';
interface AppGuidesLayoutProps {
    children?: React.ReactNode;
    topContents?: string | React.ReactNode;
    titleContents: string;
    subTitleContents: string;
    Images: string;
    PushNextPage: any;
    TopcontainerFunction: any;
}
const Title: React.FC = ({ children }) => {
    return <TitleWraper>{children}</TitleWraper>;
};
const SubTitle: React.FC = ({ children }) => {
    return <SubTitleWraper>{children}</SubTitleWraper>;
};
const { width, height } = Dimensions.get('window');
const AppGuidesLayout = ({
    children,
    titleContents,
    subTitleContents,
    Images,
    PushNextPage,
    TopcontainerFunction,
}: AppGuidesLayoutProps) => {
    return (
        <Container style={{ width: width }}>
            <ThemeProvider theme={theme}>
                {TopcontainerFunction()}
                <View style={{ marginTop: 37 }}>
                    <Title>
                        <TitleText>{titleContents}</TitleText>
                    </Title>
                    <SubTitle>
                        <SubTitleText>{subTitleContents}</SubTitleText>
                    </SubTitle>
                    <StepBar source={StempArray[Images]} resizeMode={'contain'} />
                    {/*<Button onPress={PushNextPage} color={false} disabled={false}>*/}
                    {/*    시작하기*/}
                    {/*</Button>*/}
                </View>
            </ThemeProvider>
        </Container>
    );
};
const on = () => {
    console.log(1);
};
export default AppGuidesLayout;
export const StempArray: { [index: string]: any } = {
    First: require('Images/FirstBar.png'),
    Second: require('Images/SecondBar.png'),
    Third: require('Images/ThirdBar.png'),
};
const EmojiLocaion = [
    ['35%', '35%'],
    ['10%', '70%'],
    ['60%', '63%'],
    ['60%', '7%'],
    ['10%', '4%'],
];
const rotateArray = ['-24.17deg', '0deg', '23.57deg', '-17.47deg', '38.12deg'];
const MoodImageArray = ['VERYCOLD', 'COLD', 'VERYHOT', 'GOOD', 'HOT'];
