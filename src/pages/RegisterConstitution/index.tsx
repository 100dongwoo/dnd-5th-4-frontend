import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RegisterLayout from 'layout/Register';
import { Next } from 'pages/RegisterNickName/styles';
import theme from 'styles/theme';
import api from 'settings/api';

import { useAuthDispatch, useAuthState } from 'context/Auth';

import { Box, Text, Button, Jump } from './styles';

type UserProps = {
    route: any;
};

const RegisterConstitution: React.FC<UserProps> = ({ route }) => {
    const { userId, nickName, gender } = route.params;
    const [hotConstitution, setHotConstitution] = useState(false);
    const [coldConstitution, setColdConstitution] = useState(false);
    const navigation = useNavigation();
    const authDispatch = useAuthDispatch();
    const authState = useAuthState();

    const onMaleClick = () => {
        setHotConstitution(!hotConstitution);
        setColdConstitution(false);
    };
    const onFemaleClick = () => {
        setHotConstitution(false);
        setColdConstitution(!coldConstitution);
    };

    const CheckConstitution = () => {
        let constitution;
        if (!hotConstitution && !coldConstitution) {
            //    건너뛰기
            constitution = '';
        } else if (hotConstitution) {
            constitution = 'HOT';
        } else if (coldConstitution) {
            constitution = 'COLD';
        }

        let params = {
            userId: userId,
            name: nickName,
            gender: gender,
            constitution: constitution,
        };

        api.post('user/', params)
            .then((res) => {
                if (res.status !== 200) {
                    console.log('회원가입 실패하였습니다');
                    return;
                }
                Alert.alert('회원가입 성공');
                //리덕스 넣으시면됩니다
                authDispatch({
                    type: 'LOGIN',
                    payload: params,
                });
                navigation.navigate('Onboarding');
            })
            .catch((err) => {
                console.log('err', err);
            });
    };
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => CheckConstitution()} style={{ position: 'absolute', top: 35, right: 21 }}>
                <Jump>건너뛰기</Jump>
            </TouchableOpacity>
            <RegisterLayout
                titleContents="체질을 기입해주세요"
                subTitleContents="체질 정보는 옷 추천 기능에서 활용됩니다. \n 해당되지 않는다면 건너뛰기를 눌러주세요."
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box clicked={hotConstitution} onPress={() => onMaleClick()}>
                        <Image style={styles.Logo} resizeMode="contain" source={require('Images/RegisterHot.png')} />
                        <Text>더위 많이 타는 편</Text>
                    </Box>
                    <Box clicked={coldConstitution} onPress={() => onFemaleClick()}>
                        <Image style={styles.Logo} resizeMode="contain" source={require('Images/RegisterCold.png')} />
                        <Text>추위 많이 타는 편</Text>
                    </Box>
                </View>
                <Button
                    color={!hotConstitution && !coldConstitution}
                    onPress={() => CheckConstitution()}
                    disabled={!hotConstitution && !coldConstitution}
                >
                    <TouchableOpacity onPress={() => CheckConstitution()}>
                        <Next>시작하기</Next>
                    </TouchableOpacity>
                </Button>
            </RegisterLayout>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: theme.color.black,
    },
    subTitle: {
        color: theme.color.black,
    },
    Logo: {
        marginBottom: 16,
        width: 94,
        height: 94,
    },
});

export default RegisterConstitution;
