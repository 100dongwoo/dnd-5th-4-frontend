import styled from 'styled-components/native';

export const Container = styled.View`
    position: relative;
    z-index: -1;
`;
export const TopContainer = styled.View<{ weatherMoreShow?: boolean }>`
    flex-direction: row;
    padding-vertical: 11.5px;
    padding-horizontal: 16px;
    justify-content: space-between;
    height: 40px;
    border-width: ${(props) => (props.weatherMoreShow ? '0px' : '1px')};
    border-color: rgba(173, 178, 217, 0.25);
    border-radius: 4px;
    elevation: ${(props) => (props.weatherMoreShow ? 0 : 1)};
`;
export const BoxContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const WeatherImage = styled.Image`
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;
export const Description = styled.Text`
    font-family: Pretendard500;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #a8abb4;
`;
export const Temperature = styled.Text<{ color?: any }>`
    font-family: PretendardBold;
    margin-right: 8px;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.3px;
    color: ${(props) => (props.color === undefined ? '#000' : props.color)};
`;
export const Division = styled.Text`
    color: #e7e7e7;
    font-size: 16px;
    margin-left: 4px;
    margin-right: 6px;
`;

export const MaxTemperature = styled.Text`
    font-family: PretendardBold;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.3px;
    color: #ff4743;
`;
export const MinTemperature = styled(MaxTemperature)`
    color: #4068b0;
    margin-right: 8px;
`;
export const DetailWeatherContainer = styled.View`
    padding-horizontal: 37px;
    padding-top: 8px;
    padding-bottom: 20px;
    flex-direction: row;
    justify-content: space-between;
`;
export const Title = styled.Text`
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.3px;
    color: #000000;
    margin-bottom: 7px;
`;
export const Box = styled.View`
    align-items: center;
`;

export const Information = styled.Text<{ color?: any; type?: String }>`
    color: ${(props) => (!props.color ? '#000000' : props.color)};
    font-size: 12px;
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.3px;
    font-family: ${(props) => (props.type === 'Pretendard400' ? 'Pretendard400' : 'Roboto400')};
`;
