import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
    BoxContainer,
    TopContainer,
    DetailWeatherContainer,
    Division,
    MaxTemperature,
    MinTemperature,
    Temperature,
    WeatherImage,
    Description,
    Container,
    Title,
    Box,
    Information,
} from './styles';
import { WeatherDescription, WeatherImages } from '../../untils/WeatherImages';

type WeatherProps = {
    currentWeather: any;
    dailyWeather: any;
    weatherMoreShow: any;
    setWeatherMoreShow: any;
    airPollution: any;
};

const airPollutionArray = ['매우좋음', '좋음', '보통', '나쁨', '매우나쁨'];
const Weather: React.FC<WeatherProps> = ({
    currentWeather,
    dailyWeather,
    weatherMoreShow,
    setWeatherMoreShow,
    airPollution,
}) => {
    if (currentWeather.length === 0 || dailyWeather.length === 0) {
        return null;
    }
    let rainfall = currentWeather.rain === null ? 0 : currentWeather.rain['1h'];
    const getWeatherColor = (currentWeather: number) => {
        if (currentWeather >= 31) return '#FF4743';
        else if (currentWeather >= 26) return '#FFD000';
        else if (currentWeather >= 18) return '#2EE788';
        else if (currentWeather > 10) return '#48CFFA';
        else return '#48CFFA';
    };
    return (
        <TouchableWithoutFeedback
            onPress={(e) => {
                setWeatherMoreShow(!weatherMoreShow);
            }}
        >
            <Container>
                <TopContainer weatherMoreShow={weatherMoreShow}>
                    <BoxContainer>
                        <Temperature>{parseInt(currentWeather?.main.temp)}°</Temperature>
                        <WeatherImage source={WeatherImages[currentWeather?.weather[0].icon]} resizeMode={'contain'} />
                        {/*<Description>{currentWeather?.weather[0].description}</Description>*/}
                        <Description>{WeatherDescription[currentWeather?.weather[0].icon]}</Description>
                    </BoxContainer>
                    <BoxContainer>
                        <MaxTemperature>{parseInt(dailyWeather[0].temp.max)}°</MaxTemperature>
                        <Division>/</Division>
                        <MinTemperature>{parseInt(dailyWeather[0].temp.min)}°</MinTemperature>
                        <Entypo
                            name="chevron-up"
                            size={20}
                            color="#828282"
                            style={{
                                transform: [{ rotate: weatherMoreShow ? '0deg' : '180deg' }],
                            }}
                        />
                    </BoxContainer>
                </TopContainer>
                {weatherMoreShow && (
                    <DetailWeatherContainer>
                        <Box>
                            <Title>습도</Title>
                            <Information>{currentWeather?.main.humidity}%</Information>
                        </Box>
                        <Box>
                            <Title>강수량</Title>
                            <Information>{rainfall.toFixed(1)}mm</Information>
                        </Box>
                        <Box>
                            <Title>미세</Title>
                            <Information color={'#4068B0'} type={'Pretendard400'}>
                                {airPollutionArray[airPollution - 1]}
                            </Information>
                        </Box>
                        <Box>
                            <Title>체감온도</Title>
                            <Information color={'#FF4743'}>{parseInt(currentWeather?.main.feels_like)}°</Information>
                        </Box>
                    </DetailWeatherContainer>
                )}
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default Weather;
