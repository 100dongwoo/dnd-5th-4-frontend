import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

import { useAuthDispatch } from 'context/Auth';

import Environment from 'secret/Environment';
import api from 'settings/api';
import { BottomContainer, Container, LogoImage, SocialBox, SocialImage, SocialText, TopContainer } from './stlyes';

const Login = () => {
    const navigation = useNavigation();
    const authDispatch = useAuthDispatch();
    const IsAlreadySignUp = (userId: any) => {
        let params = {
            userId: userId,
        };
        api.get('user/', { params })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('err');
                    return;
                }
                if (res?.data.isOurMember) {
                    api.get(`user/${userId}`)
                        .then((res) => {
                            if (res.status !== 200) {
                                console.log('로그인정보를 얻지못했습니다');
                                return;
                            }
                            authDispatch({ type: 'LOGIN', payload: { user: res?.data?.userResponse } });
                            navigation.navigate('Home');
                        })
                        .catch((err) => {
                            console.log('에러', err);
                        });
                    //    회원가입이 된 경우 main으로 가게됩니다.
                } else {
                    navigation.navigate('RegisterNickName', { userId: userId });
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
    };
    const LoginHandler = async (type: string) => {
        if (type === 'google') {
            try {
                const googleRes: any = await Google.logInAsync({
                    iosClientId: Environment.IOS_CLIENT_ID,
                    androidClientId: Environment.ANDROID_CLIENT_ID,
                    scopes: ['profile', 'email'],
                });
                if (googleRes.type === 'success') {
                    // console.warn('성공', googleRes.user.id);
                    IsAlreadySignUp(googleRes?.user.id);
                    // navigation.navigate('RegisterNickName', { userId: googleRes.user.id });
                }
            } catch (e) {
                console.log('에러입니다', e);
            }
        } else if (type === 'facebook') {
            try {
                await Facebook.initializeAsync({
                    appId: Environment.FacebookAppid,
                });
                const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
                if (type === 'success') {
                    // Get the user's name using Facebook's Graph API
                    axios
                        .get(`https://graph.facebook.com/me?access_token=${token}`)
                        .then((res) => {
                            if (res.status !== 200) {
                                console.log('로그인 실패하였습니다.');
                                return;
                            }
                            IsAlreadySignUp(res?.data.id);
                            // navigation.navigate('RegisterNickName', { userId: res?.data?.id });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            } catch ({ message }) {
                alert(`Facebook Login Error: ${message}`);
            }
        } else {
            console.log('?');
        }
    };
    return (
        <Container>
            <TopContainer>
                <LogoImage source={require('Images/Logo.png')} />
                <Image source={require('Images/LogoText.png')} />
            </TopContainer>
            <BottomContainer>
                <TouchableOpacity>
                    <SocialBox background="#FEE500">
                        <SocialImage
                            widthSize={'23px'}
                            heightSize={'21px'}
                            source={require('Images/KakaoLogo.png')}
                            resizeMode="contain"
                        />
                        <SocialText>카카오 로그인</SocialText>
                    </SocialBox>
                </TouchableOpacity>
                <TouchableOpacity>
                    <SocialBox background="#06BE34">
                        <SocialImage
                            source={require('Images/NaverLogo.png')}
                            resizeMode="contain"
                            widthSize={'20px'}
                            heightSize={'18px'}
                        />
                        <SocialText color="#fff">네이버 로그인</SocialText>
                    </SocialBox>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        LoginHandler('facebook');
                    }}
                >
                    <SocialBox background="#1977F3">
                        <SocialImage
                            source={require('Images/FaceBookLogo.png')}
                            resizeMode="contain"
                            widthSize={'22px'}
                            heightSize={'22px'}
                        />
                        <SocialText color="#fff">페이스북 로그인</SocialText>
                    </SocialBox>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        LoginHandler('google');
                    }}
                >
                    <SocialBox background="#fff">
                        <SocialImage
                            name={'google'}
                            source={require('Images/GoogleLogo.png')}
                            resizeMode="contain"
                            widthSize={'38px'}
                            heightSize={'38px'}
                        />
                        <SocialText>구글 로그인</SocialText>
                    </SocialBox>
                </TouchableOpacity>
            </BottomContainer>
        </Container>
    );
};

export default Login;
