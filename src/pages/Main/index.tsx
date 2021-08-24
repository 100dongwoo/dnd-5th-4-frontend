import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Environment from '../../secret/Environment';
import LocationDate from 'components/LocationDate';
import { Container } from './stlyes';
import Weather from 'components/Weather';
import WeatherDetail from 'components/WeatherDetail';
import { Dimensions, ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import RecordListBox from 'components/RecordListBox';
import Character from 'components/Character';
import { useLocationState } from '../../context/Location';

import Clean from '../../components/Character/Clean';
import Cloud from '../../components/Character/Cloud';
import Lightning from '../../components/Character/Lightning';
import LittleCloud from '../../components/Character/LittleCloud';
import ManyCloud from '../../components/Character/ManyCloud';
import Rain from '../../components/Character/Rain';
import Smog from '../../components/Character/Smog';
import Snow from '../../components/Character/Snow';
import Characters from '../../components/Character/Characters';
import TopMainPageEmoji from '../../components/TopMainPageEmoji';
import api from '../../settings/api';
import { useAuthState } from '../../context/Auth';
import { useIsFocused } from '@react-navigation/native';

const Main = () => {
    const isFocused = useIsFocused();
    const locationState = useLocationState();
    const [lat, setLat] = useState(locationState === undefined ? locationState?.location?.latitude : 37.541);
    const [lon, setLon] = useState(locationState === undefined ? locationState?.location?.longitude : 126.934086);
    const [currentWeather, setCurrentWeather] = useState<any>([]); // 현재날씨
    const [hourlyWeather, setHourlyWeather] = useState([]); // 시간대별 날씨
    const [dailyWeather, setDailyWeather] = useState([]); // 주간 날씨
    const [Location, setLocation] = useState([]);
    const [weatherMoreShow, setWeatherMoreShow] = useState(false);
    const [airPollution, setAirPollution] = useState('');
    const { height } = Dimensions.get('screen');
    const authState = useAuthState();
    const user = authState?.user;
    const [isLoading, setIsLoading] = useState(true);
    const snapToOffsets = [0, height - 30];
    const [scrollHeight, setScrollHeight] = useState(0);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        setLat(locationState?.location?.latitude);
        setLon(locationState?.location?.longitude);
    }, [locationState]);
    useEffect(() => {
        KakaoLocation(lat, lon); // 지역명
        WeatherSearch(lat, lon); //시간대별, 주간날씨
        CurrentWeatherSearch(lat, lon); // 현재날씨
        airPollutionSearch(lat, lon); //미세먼지
        fetchPost(); //나의 게시글
        if (currentWeather && currentWeather?.weather?.length > 1) {
            setIsLoading(false);
        }
    }, [lat, lon, isFocused]);

    const airPollutionSearch = (lat: number, lng: number) => {
        let params = {
            lat: lat,
            lon: lng,
            appid: Environment.Weather_API,
        };
        axios
            .get('https://api.openweathermap.org/data/2.5/air_pollution?', { params })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('날씨 정보를 받아오지 못했습니다');
                    return;
                }
                setAirPollution(res?.data?.list[0].main.aqi);
            })
            .catch((err) => {
                console.log('미세먼지', err);
            });
    };
    const CurrentWeatherSearch = (lat: number, lng: number) => {
        let params = {
            lat: lat,
            lon: lng,
            appid: Environment.Weather_API,
            units: 'metric',
            lang: 'kr',
            cnt: 1,
        };
        axios
            .get('https://api.openweathermap.org/data/2.5/find?', { params })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('날씨 정보를 받아오지 못했습니다');
                    return;
                }
                setCurrentWeather(res?.data?.list[0]);
            })
            .catch((err) => {
                console.log('현재날씨err', err);
            });
    };
    const KakaoLocation = (lat: number, lng: number) => {
        axios
            .get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}8&y=${lat}`, {
                headers: {
                    Authorization: `KakaoAK ${Environment.Kakao_API}`,
                },
            })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('지역명을 받아오지 못했습니다');
                    return;
                }

                const LocationName = res.data?.documents[0].address_name.split(' ');
                setLocation(LocationName);
            })
            .catch((err) => {
                console.log('카카오지역', err);
            });
    };

    const WeatherSearch = (lat: number, lng: number) => {
        let params = {
            lat: lat,
            lon: lng,
            exclude: 'minutely,alerts,current',
            appid: Environment.Weather_API,
            units: 'metric',
            lang: 'kr',
        };
        axios
            .get('https://api.openweathermap.org/data/2.5/onecall?', { params })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('날씨 정보를 받아오지 못했습니다');
                    return;
                }
                setHourlyWeather(res.data?.hourly.slice(0, 7));
                setDailyWeather(res.data?.daily.slice(0, 7));
            })
            .catch((err) => {
                console.log('날씨정보 err', err);
            });
    };
    const fetchPost = async () => {
        let humid = dailyWeather[0]?.humidity;
        let maxTemp = dailyWeather[0]?.temp.max;
        let minTemp = dailyWeather[0]?.temp.min;
        let pageSize = 5;
        let measureType = 'user';
        setPosts([]);
        let params = {
            userId: user?.id,
            tempHigh: maxTemp,
            tempLow: minTemp,
            humid: humid,
            lastMeasureId: Number.MAX_SAFE_INTEGER,
            size: pageSize,
            measureType: measureType,
        };

        await api
            .get('measure?', { params })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('포스트 정보를 받아오지 못했습니다');
                    return;
                }
                setPosts(res?.data?.measures);
            })
            .catch((err) => {
                console.log('나의게시글', err);
            });
    };

    return (
        // !isLoading && (
        <Container>
            <LocationDate Location={Location} setLocation={setLocation} />
            <View
                style={{
                    flex: weatherMoreShow ? 1 : 0,
                    borderWidth: weatherMoreShow ? 2 : 0,
                    marginTop: 12,
                    borderRadius: 4,
                }}
            >
                <Weather
                    currentWeather={currentWeather} //현재날씨
                    airPollution={airPollution} //미세먼지
                    dailyWeather={dailyWeather} //월화수목
                    weatherMoreShow={weatherMoreShow}
                    setWeatherMoreShow={setWeatherMoreShow}
                />
                {weatherMoreShow && <WeatherDetail hourlyWeather={hourlyWeather} dailyWeather={dailyWeather} />}
            </View>
            {!weatherMoreShow && (
                <ScrollView
                    onLayout={(event) => {
                        let { height } = event.nativeEvent.layout;
                        setScrollHeight(height);
                    }}
                    style={{ marginTop: 10 }}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    snapToOffsets={snapToOffsets}
                    snapToEnd={false}
                    decelerationRate={'fast'}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ height: scrollHeight }}>
                            {/*{console.log(currentWeather.weather[0].icon)}*/}
                            {/*<Character currentWeather={currentWeather?.main?.temp} />*/}
                            {/*{test(currentWeather?.weather[0]?.icon, currentWeather?.main?.temp)}*/}
                            {/*{test(currentWeather)}*/}
                            {/*{test('01d')}*/}
                            {WeatherAnimation(currentWeather)}
                            {posts?.length === 0 ? (
                                <Characters currentWeather={currentWeather?.main?.temp} />
                            ) : (
                                <TopMainPageEmoji posts={posts} />
                            )}
                        </View>
                        <RecordListBox scrollHeight={scrollHeight} dailyWeather={dailyWeather} />
                    </View>
                </ScrollView>
            )}
        </Container>
        // )
    );
};
export default Main;
const WeatherAnimation = (currentWeather: any) => {
    if (currentWeather?.weather && currentWeather?.weather[0]) {
        if (currentWeather?.weather[0]?.icon.includes('01')) return <Clean />;
        else if (currentWeather?.weather[0]?.icon.includes('02')) return <LittleCloud />;
        else if (currentWeather?.weather[0]?.icon.includes('03')) return <Cloud />;
        else if (currentWeather?.weather[0]?.icon.includes('04')) return <ManyCloud />;
        else if (currentWeather?.weather[0]?.icon.includes('09')) return <Rain />;
        else if (currentWeather?.weather[0]?.icon.includes('10')) return <Rain />;
        else if (currentWeather?.weather[0]?.icon.includes('11')) return <Lightning />;
        else if (currentWeather?.weather[0]?.icon.includes('13')) return <Smog />;
        else if (currentWeather?.weather[0]?.icon.includes('50')) return <Snow />;
    }
};
