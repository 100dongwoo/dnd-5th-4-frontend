import React, { useState } from 'react';

import { Animated, Image, PanResponder, Text, TouchableOpacity, View } from 'react-native';
import { MoodImage } from '../../untils/MoodWeather';
import MainPageModal from '../MainPageModal';
interface RegisterLayoutProps {
    left: number | string;
    bottom: number | string;
    mood: string;
    index: number;
    post: any;
}
const MainEmoji: React.FC<RegisterLayoutProps> = ({ left, bottom, mood, index, post }) => {
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const position = new Animated.ValueXY({ x: 0, y: 0 });
    const pan = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, { dx, dy }) => {
            if (dx > 3 || dy > 3) {
                return true;
            }
            return false;
        },
        onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
        onPanResponderRelease: () => {
            Animated.spring(position, {
                toValue: { x: 0, y: 10 },
                useNativeDriver: false,
            }).start();
        },
        // onPanResponderGrant: (e, gestureState) => {
        //     setTimeout(() => {
        //         setIsOpenAddModal(true);
        //     }, 2000);
        // },
    });

    const rotate = position.x.interpolate({
        inputRange: [0, 100],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <Animated.View
            {...pan.panHandlers}
            style={{
                position: 'absolute',
                bottom: bottom,
                left: left,
                height: 100,
                width: 100,
                transform: [{ translateY: position.y }, { translateX: position.x }, { rotate: rotate }],
            }}
        >
            <MainPageModal isOpenAddModal={isOpenAddModal} setIsOpenAddModal={setIsOpenAddModal} post={post} />
            <TouchableOpacity
                delayLongPress={1000}
                onLongPress={() => setIsOpenAddModal(true)}
                onPressOut={() => setIsOpenAddModal(false)}
            >
                <Image
                    source={MoodImage[mood]}
                    style={{ height: 100, width: 100, transform: [{ rotate: rotateArray[index] }] }}
                />
            </TouchableOpacity>
        </Animated.View>
    );
};
const rotateArray = ['-24.17deg', '38.12deg', '0deg', '-17.47deg', '23.57deg'];
export default MainEmoji;
