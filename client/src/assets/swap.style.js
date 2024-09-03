import styled from "@emotion/styled";

export const SwapContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #1c1c1e;
    border-radius: 10px;
    width: 400px;
    margin: 0 auto;
`;

export const Select = styled.select`
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    font-size: 16px;
`;

export const Input = styled.input`
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    font-size: 16px;
    width: calc(100% - 40px);
`;

export const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;
