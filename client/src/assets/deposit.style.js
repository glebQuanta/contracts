import styled from '@emotion/styled';

export const DepositContainer = styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #333;
    color: white;
    width: 300px;
    margin: 20px auto;
`;

export const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

export const Button = styled.button`
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    width: 100%;

    &:hover {
        background-color: #0056b3;
    }
`;
