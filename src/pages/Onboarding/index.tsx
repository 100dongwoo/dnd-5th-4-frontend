import React from 'react';
import { Image, StyleSheet, FlatList, View, Dimensions } from 'react-native';
import { SubTitleWraper, TitleWraper, BigImage, Sun, BigCalendar, TopContainer } from './style';
import Button from 'components/Button';
import { MoodImage } from '../../untils/MoodWeather';
const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        image: require('Images/CutSun.png'),
        title: `체감 온도를 평가해서\n나만의 날씨를 기록해보세요`,
        subtitle: `체감 온도는 덥고 추움을 기준으로\n다섯 가지로 평가할 수 있어요`,
    },
    {
        id: '2',
        image: require('Images/CutSun.png'),
        title: `기록 비교를 통해\n체감 온도를 예측할 수 있어요`,
        subtitle: `나와 다른사람이 기록한 날씨를 통해\n날씨를 간접적으로 체감할 수 있어요`,
    },
    {
        id: '3',
        image: require('Images/BigCalendar.png'),
        title: `캘린더를 통해 나의 날씨 기록을\n한 눈에 볼 수 있어요`,
        subtitle: `작년 여름은 무엇을 입었고 얼마나 더웠었는지\n기억을 되짚어 볼 수 있어요`,
    },
];

const Slide = ({ item }) => {
    return (
        <View style={{ alignItems: 'center', width, flex: 1 }}>
            {item.id === '1' ? (
                <TopContainer style={{ width: width - 40 }}>
                    {MoodImageArray.map((Moods, index) => (
                        <Image
                            key={index}
                            source={MoodImage[Moods]}
                            style={{
                                position: 'absolute',
                                width: 100,
                                height: 100,
                                top: EmojiLocaion[index][0],
                                left: EmojiLocaion[index][1],
                                transform: [{ rotate: rotateArray[index] }],
                            }}
                        />
                    ))}
                </TopContainer>
            ) : item.id === '2' ? (
                <TopContainer style={{ width: width - 40, marginBottom: 57 }}>
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
            ) : (
                // <Image
                //     source={item?.image}
                //     style={{ flex: 1, width: width - 40, resizeMode: 'contain', marginBottom: 47 }}
                // />
                <TopContainer style={{ width: '100%', paddingHorizontal: 20 }}>
                    <BigCalendar source={require('Images/BigCalendar.png')} resizeMode={'contain'} />
                </TopContainer>
            )}

            <TitleWraper>{item?.title}</TitleWraper>
            <SubTitleWraper>{item?.subtitle}</SubTitleWraper>
        </View>
    );
};

const Onboarding = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();
    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const Footer = () => {
        return (
            <View
                style={{
                    marginTop: 47,
                    marginBottom: 44,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                {/* Render indicator */}
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentSlideIndex == index && {
                                backgroundColor: '#202020',
                                width: 16,
                                height: 8,
                                borderRadius: 6,
                            },
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, marginBottom: 30, paddingTop: 10 }}>
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slides}
                pagingEnabled
                renderItem={({ item }) => <Slide item={item} />}
            />
            <Footer />
            <View style={{ paddingHorizontal: 20 }}>
                <Button onPress={() => navigation.navigate('Home')} color={false} disabled={false}>
                    시작하기
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    indicator: {
        height: 8,
        width: 8,
        backgroundColor: '#DCDCDC',
        marginHorizontal: 4,
        borderRadius: 50,
    },
});
export default Onboarding;
const EmojiLocaion = [
    ['35%', '35%'],
    ['10%', '70%'],
    ['60%', '63%'],
    ['60%', '7%'],
    ['10%', '4%'],
];
const rotateArray = ['-24.17deg', '0deg', '23.57deg', '-17.47deg', '38.12deg'];
const MoodImageArray = ['VERYCOLD', 'COLD', 'VERYHOT', 'GOOD', 'HOT'];
