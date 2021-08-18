import React, { useEffect, useState } from 'react';

import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KoreaLocations } from '../../untils/Map';
import { Close, CloseTouch, Container, SubTitle, TextFiled, Title, Touch } from './styles';
import Environment from '../../secret/Environment';
import axios from 'axios';
import { Button, Next } from '../RegisterNickName/styles';
import LocationPost from 'components/LocationPost';
import { useNavigation } from '@react-navigation/native';
import { useLocationDispatch } from '../../context';
let LocationWeatherArray: any = [];
const UploadWeather = () => {
    const navigation = useNavigation();
    const locationDispatch = useLocationDispatch();
    const [Locations, setLocations] = useState<any>([]);
    const [keyword, setKeyWord] = useState<string>('');
    const [locationWeather, setLocationWeather] = useState<Array<SelectLocationType>>([]);
    const [isClicked, setIsClicked] = useState('');
    const [isLocation, setIsLocation] = useState<any>([]); // 클릭 한 위치에 정보
    const [borderColor, setBorderColor] = useState('#d6d6d7');
    const [border, setBorder] = useState(1);
    interface SelectLocationType {
        lat: number;
        lon: number;
        Area: string;
        temp: number;
        description: string;
        icon: string;
        humidity: number;
    }
    //navigation을통해 params로 넘겨주는 type
    interface LocationType {
        latitude: number;
        longitude: number;
        Area: string;
        humidity: number;
        description: string;
        temp: number;
    }

    const onFucus = () => {
        setBorderColor('#000000');
        setBorder(2);
    };
    const onBlur = () => {
        setBorderColor('#d6d6d7');
        setBorder(1);
    };
    const KeyWordChange = async (TEXT: any) => {
        if (TEXT.length < 2) {
            setLocationWeather([]);
            setLocations([]);
            return;
        }
        let newLocationWeather: SelectLocationType[] = [];
        let NewLocations = KoreaLocations.filter((element) => element.name.includes(TEXT));
        await setLocations(NewLocations);
        NewLocations.map((location: any) => {
            let params = {
                lat: location.location[0],
                lon: location.location[1],
                appid: Environment.Weather_API,
                units: 'metric',
                lang: 'kr',
                cnt: 1,
            };

            axios
                .get('https://api.openweathermap.org/data/2.5/find?', { params })
                .then(async (res) => {
                    if (res.status !== 200) {
                        console.log('날씨 정보를 받아오지 못했습니다');
                        return;
                    }
                    //
                    // console.log(res?.data?.list[0].main.temp);

                    let Array = {
                        lat: location.location[0],
                        lon: location.location[1],
                        Area: location.name,
                        temp: res?.data?.list[0].main.temp,
                        description: res?.data?.list[0].weather[0].description,
                        icon: res?.data?.list[0].weather[0].icon,
                        humidity: res?.data?.list[0].main.humidity,
                    };
                    newLocationWeather.push(Array);
                    // await setLocationWeather((locationWeather: any) => locationWeather.concat(Array));
                })
                .catch((err) => {
                    console.log('캡치', err, 'err');
                });
        });
        await setLocationWeather(newLocationWeather);
        // await setLocationWeather((locationWeather: any) => locationWeather.concat(LocationWeatherArray));
    };

    const CheckLocation = () => {
        // console.log('111111111111', isLocation);
        let keys: LocationType = {
            latitude: Math.abs(isLocation?.lat),
            longitude: Math.abs(isLocation?.lon),
            Area: isLocation?.Area,
            humidity: isLocation?.humidity,
            description: isLocation?.description,
            temp: isLocation?.temp,
        };
        // UploadClothes
        navigation.navigate('UploadClothes', { location: keys });
    };
    return (
        <Container>
            <View style={{ flex: 1 }}>
                <CloseTouch
                    onPress={() => {
                        setKeyWord('');
                        navigation.goBack();
                    }}
                >
                    <Close source={require('Images/Close.png')} resizeMode={'contain'} />
                </CloseTouch>
                <Title>오늘의 날씨를{'\n'}기록해볼까요?</Title>
                <SubTitle>현재 날씨와 위치정보를 확인해주세요.?</SubTitle>
                <TextFiled
                    // onChangeText={setKeyWord}
                    value={keyword}
                    placeholder="예) 강남구, 진주시"
                    keyboardType="default"
                    onChange={(e) => {
                        setKeyWord(e.nativeEvent.text);
                        KeyWordChange(e.nativeEvent.text);
                    }}
                    onFocus={onFucus}
                    onBlur={onBlur}
                    style={{ marginBottom: 17, borderColor: borderColor, borderWidth: border }}
                    placeholderTextColor="#717171"
                />
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, marginBottom: 28 }}>
                        {locationWeather?.map((locationWeathers: any, index: any) => (
                            <Touch
                                key={index}
                                onPress={(e) => {
                                    if (isClicked === index) {
                                        setIsClicked('');
                                        setIsLocation([]);
                                    } else {
                                        setIsClicked(index);
                                        setIsLocation(locationWeathers);
                                    }
                                }}
                                style={{
                                    borderWidth: index !== isClicked ? 1 : 2,
                                    borderColor: index !== isClicked ? '#d6d6d7' : '#000',
                                }}
                            >
                                <LocationPost post={locationWeathers} />
                            </Touch>
                        ))}
                    </ScrollView>
                </View>
                <Button
                    color={isLocation.length === 0}
                    onPress={() => CheckLocation()}
                    disabled={isLocation.length === 0}
                >
                    <Next>다음</Next>
                </Button>
            </View>
        </Container>
    );
};

export default UploadWeather;
