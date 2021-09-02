import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding-bottom: 10px;
    margin: 20px 18px 0px;
`;
export const Nav = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 10px;
    position: relative;
    padding: 0 22%;
`;
export const Title = styled.Text<{ color?: boolean }>`
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.3px;
    color: ${(props) => (!props.color ? '#A3A4AF' : '#000000')};
    font-family: ${(props) => (!props.color ? 'Pretendard400' : 'Pretendard500')};
`;
