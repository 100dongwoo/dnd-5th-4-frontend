import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 32px 20px 0px 20px;
    justify-content: space-between;
`;
export const TopContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-horizontal: 5px;
`;

export const TitleContainer = styled.View`
    height: 117px;
    /* background-color: #bdbdbd; */
    flex-direction: row;
    justify-content: space-between;
`;

export const TitleWraper = styled.Text`
    font-family: PretendardBold;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #000000;
    margin-bottom: 14px;
    /* background-color: pink; */
`;

export const TitleText = styled.Text<{ color?: any }>`
    font-family: PretendardBold;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #000000;
`;
export const StepBar = styled.Image`
    height: 8px;
    width: 48px;
    align-self: center;
    margin-bottom: 44px;
    margin-top: 32px;
`;

const ButtonWrap = styled.TouchableOpacity<{ color?: boolean }>`
    align-items: center;
    background: ${(props) => (props.color ? '#CACCD6' : '#000000')};
    height: 44px;
    justify-content: center;
    border-radius: 4px;
`;

export const SubTitleWraper = styled.Text`
    font-family: Pretendard500;
    font-size: 12px;
    line-height: 19.2px;
    text-align: center;
    letter-spacing: -0.1px;
    color: #a5a7af;
`;

export const SubTitleText = styled.Text<{ color?: any }>`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15;
    text-align: left;
    letter-spacing: -0.3px;
    flex: 1;
    color: #00000066;
`;

export const Contents = styled.View`
    flex: 1;
`;
export const BottomContainer = styled.TouchableHighlight`
    margin-top: 20px;
`;
