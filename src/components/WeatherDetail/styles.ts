import styled from 'styled-components/native';
export const Container = styled.View`
    padding-vertical: 10px;
    padding-horizontal: 20px;
    flex: 1;
    justify-content: space-around;
    background-color: #fff;
`;
export const Title = styled.Text`
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.3px;
    color: #000000;
    margin-bottom: 16px;
`;
export const WeatherIcon = styled.Image`
    width: 24px;
    height: 24px;
`;
export const PrecipitationPercent = styled.Text`
    font-family: Roboto500;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: -0.3px;
    color: #95cef5;
    margin-top: 4px;
`;
export const Temperature = styled.Text`
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: -0.3px;
    margin-top: 7px;
    color: #7d7d7d;
`;
export const TimeTitle = styled.Text<{ color?: boolean }>`
    font-size: 12px;
    line-height: 17px;
    letter-spacing: -0.3px;
    color: ${(props) => (!props.color ? '#717171' : '#000')};
    margin-bottom: 8px;
`;
export const MaxMinTemperature = styled.Text<{ color?: boolean }>`
    font-family: Roboto400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: -0.3px;
    color: ${(props) => (!props.color ? '#ff4743' : '#4068B0')};
`;
export const Bar = styled.View`
    border-width: 1px;
    height: 14px;
    border-style: solid;
    border-color: #e0e0e0;
    margin-top: 5px;
    margin-bottom: 5px;
`;
