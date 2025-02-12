import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { ScrollView, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuthState } from 'context/Auth';

import UploadLayout from 'layout/Upload';
import api from 'settings/api';
import Category from 'components/Category';
import { KoreaLocations } from 'untils/Map';
import TextModal from 'components/TextModal';
import { Button, Next } from 'pages/RegisterNickName/styles';
import {
    ClothesViewBox,
    TotalWrap,
    CategoryListWrap,
    CategoryNameWrap,
    ClothesListWrap,
    PlusButton,
    ClothesList,
    TotalTextWrap,
    Total,
    TotalCount,
    CategoryWrap,
    CategoryName,
    ClothWrap,
    Cloth,
    ModalWrap,
    ModalBox,
    Edit,
    Line,
    Delete,
} from './styles';

type ClothesProps = {
    categoryList: object[];
    name: string;
};
type UserProps = {
    route: any;
};
const UploadClothes: React.FC<UserProps> = ({ route }) => {
    interface LocationType {
        location: object;
        uploadType: string;
        measureId: number;
    }
    type CategoryType = {
        id: number;
        userId: string;
        name: string;
        type: string;
    };

    const { location, uploadType, measureId }: LocationType = route.params;
    const navigation = useNavigation();
    const [isEditDeleteModalVisible, setEditDeleteModalVisible] = useState(false);
    const [category, setCategory] = useState([]);
    const [selectCategory, setSelectCategory] = useState<object[]>([]);
    const [totalNumber, setTotalNumber] = useState(0);
    const [isRe, setIsRe] = useState(false);
    //
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [clickCategory, setClickCategory] = useState('');
    const [selectType, setSelectType] = useState([]);
    //
    const authState = useAuthState();
    const user = authState?.user;

    const showEditDeleteModal = () => {
        setEditDeleteModalVisible(!isEditDeleteModalVisible);
    };

    const Category: React.FC<ClothesProps> = ({ categoryList, name }) => {
        //[{id: 1102, userId: "105228574872134291092", name: "상의2", type: "TOP"}, {}, {}, ... ]
        return (
            <CategoryWrap>
                <CategoryName>{name}</CategoryName>
                <ClothesListWrap>
                    <PlusButton
                        key={name}
                        onPress={() => {
                            setClickCategory(name);
                            setIsOpenAddModal(true);
                        }}
                        underlayColor="#DDDDDD"
                        activeOpacity={0.6}
                    >
                        <Entypo name="plus" size={9} color="black" iconStyle={{ left: 0 }} />
                    </PlusButton>
                    <ScrollView
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {categoryList &&
                            categoryList.map((category, index) => (
                                <ClothWrap
                                    style={{
                                        borderColor: selectCategory.includes(category) ? '#000000' : '#D6D6D7',
                                    }}
                                    key={index}
                                    onPress={() => {
                                        if (!selectCategory.includes(category)) {
                                            setSelectCategory([...selectCategory, category]);
                                        } else {
                                            selectCategory.filter((element) => {
                                                setSelectCategory(
                                                    selectCategory.filter((element) => element !== category)
                                                );
                                            });
                                        }
                                    }}
                                >
                                    <Cloth style={{ color: selectCategory.includes(category) ? '#000000' : '#D6D6D7' }}>
                                        {category?.name}
                                    </Cloth>
                                </ClothWrap>
                            ))}
                    </ScrollView>
                </ClothesListWrap>
            </CategoryWrap>
        );
    };

    useEffect(() => {
        fetchUserCloth();
    }, [isRe]);

    const onNextPage = () => {
        let newSelectType = [];
        if (selectCategory.filter((category) => category.type == 'OUTER').length !== 0) {
            newSelectType.push('OUTER');
        }
        if (selectCategory.filter((category) => category.type == 'TOP').length !== 0) {
            newSelectType.push('TOP');
        }
        if (selectCategory.filter((category) => category.type == 'BOTTOM').length !== 0) {
            newSelectType.push('BOTTOM');
        }
        if (selectCategory.filter((category) => category.type == 'SHOES').length !== 0) {
            newSelectType.push('SHOES');
        }
        if (selectCategory.filter((category) => category.type == 'OTHERS').length !== 0) {
            newSelectType.push('OTHERS');
        }
        // clothes type    newSelectType
        // selecct Clothes  selectCategory
        navigation.navigate('UploadWeatherEstimate', {
            selectCategory,
            types: newSelectType,
            location,
            uploadType,
            measureId,
        });
        console.log(newSelectType);
    };
    const fetchUserCloth = () => {
        api.get(`user/dresses?userId=${user.id}`)
            .then((res) => {
                if (res.status !== 200) {
                    console.log('유저의 드레스를 가져오지못했습니다');
                    return;
                }
                setCategory(res?.data?.dresses);
                setTotalNumber(res?.data.dresses.length);
            })
            .catch((err) => {
                console.log('err', err);
            });
    };
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <TextModal
                clickCategory={clickCategory}
                isOpenAddModal={isOpenAddModal}
                setIsOpenAddModal={setIsOpenAddModal}
                setIsRe={setIsRe}
                isRe={isRe}
            />
            <UploadLayout
                titleContents1="오늘의 옷차림을"
                titleContents2="기록해볼까요?"
                subTitleContents="옷차림을 카테고리별로 기록해주세요."
            >
                <Modal isVisible={isEditDeleteModalVisible} animationIn="fadeIn" animationOut="fadeOut">
                    <TouchableWithoutFeedback onPress={() => showEditDeleteModal}>
                        <ModalWrap>
                            <ModalBox>
                                <TouchableHighlight>
                                    <Edit>수정하기</Edit>
                                </TouchableHighlight>
                                <Line />
                                <TouchableHighlight>
                                    <Delete>삭제하기</Delete>
                                </TouchableHighlight>
                            </ModalBox>
                        </ModalWrap>
                    </TouchableWithoutFeedback>
                </Modal>
                <ClothesViewBox>
                    <TotalWrap>
                        <TotalTextWrap>
                            <Total>전체 </Total>
                            <TotalCount>{totalNumber}</TotalCount>
                        </TotalTextWrap>

                        <Feather
                            name="more-horizontal"
                            size={24}
                            color="black"
                            iconStyle={{ left: 0 }}
                            onPress={() => {
                                showEditDeleteModal();
                            }}
                        />
                    </TotalWrap>
                    <CategoryListWrap>
                        <ScrollView>
                            <Category
                                categoryList={category.filter((element: any) => element.type === 'OUTER')}
                                name="아우터"
                            />
                            <Category
                                categoryList={category.filter((element: any) => element.type === 'TOP')}
                                name="상의"
                            />
                            <Category
                                categoryList={category.filter((element: any) => element.type === 'BOTTOM')}
                                name="하의"
                            />
                            <Category
                                categoryList={category.filter((element: any) => element.type === 'SHOES')}
                                name="신발"
                            />
                            <Category
                                categoryList={category.filter((element: any) => element.type === 'OTHERS')}
                                name="기타"
                            />
                        </ScrollView>
                    </CategoryListWrap>
                </ClothesViewBox>
                <Button
                    style={{ marginTop: 30 }}
                    // color={!maleClicked && !femaleClicked}
                    onPress={() => onNextPage()}
                    // disabled={!maleClicked && !femaleClicked}
                >
                    <Next>다음</Next>
                </Button>
            </UploadLayout>
        </View>
    );
};

export default UploadClothes;
