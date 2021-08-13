import { Animated } from 'react-native';

export const CloudLeftMove = (RightMove: any) => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(RightMove, {
                toValue: 10,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(RightMove, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
        ])
    ).start();
};
export const CloudRightMove = (LeftMove: any) => {
    Animated.loop(
        Animated.sequence([
            Animated.timing(LeftMove, {
                toValue: -20,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(LeftMove, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
        ])
    ).start();
};
export const ArrowDownMove = (ArrowMove: any) => {
    Animated.loop(
        Animated.timing(ArrowMove, {
            toValue: 10,
            duration: 1000,
            useNativeDriver: true,
        }),
        { iterations: 1000 }
    ).start();
};
export const sunAnimation = (anim: any) => {
    //스케일
    Animated.loop(
        Animated.timing(anim, {
            toValue: 100,
            duration: 3000,
            useNativeDriver: true,
        }),
        { iterations: 1000 }
    ).start();
};
export const getWeatherImage = (currentWeather: any) => {
    if (currentWeather >= 31) return require('WeatherMainImage/veryHot.png');
    else if (currentWeather >= 26) return require('WeatherMainImage/hot.png');
    else if (currentWeather >= 18) return require('WeatherMainImage/good.png');
    else if (currentWeather > 10) return require('WeatherMainImage/cold.png');
    else if (currentWeather > -999) return require('WeatherMainImage/veryCold.png');
};