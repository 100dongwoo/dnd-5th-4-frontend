import styled from 'styled-components/native';
export const Container = styled.View`
    flex: 1;
    align-content: center;
    justify-content: space-between;
    width: 100%;
`;
export const TopContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const LogoImage = styled.Image`
    margin-bottom: 18px;
    width: 59px;
    height: 54px;
`;
export const BottomContainer = styled.View`
    padding-horizontal: 20px;
    padding-bottom: 12px;
    width: 100%;
    flex: 0.5;
    justify-content: flex-end;
`;
export const SocialBox = styled.View<{ background: string }>`
    background-color: ${(props) => props.background};
    border-radius: 4px;
    height: 44px;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin-bottom: 12px;
    border: ${(props) => (props.background === '#fff' ? '0.5px solid #B3B3B3;' : 'none')}; ;
`;
export const SocialImage = styled.Image<{ widthSize?: string; heightSize?: string; name?: string }>`
    width: ${(props) => props.widthSize};
    height: ${(props) => props.heightSize};
    position: absolute;
    left: ${(props) => (props.name === 'google' ? '15px' : '21px')}; ;
`;
export const SocialText = styled.Text<{ color?: any }>`
    font-family: 'Pretendard400';
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.64px;
    flex: 1;
    color: ${(props) => (props.color === '#fff' ? '#fff' : '#381f1f')};
`;
