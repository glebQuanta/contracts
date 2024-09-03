import React from 'react';
import SwapComponent from './components/Swap';
import {Wallet} from './components/Wallet';
import {Global, css} from "@emotion/react";
import {AppContainer} from "./assets/swap.style";
import DepositETH from "./components/DepositETH";
import DepositBNB from "./components/DepositBNB";

function App() {

    return (

        <>

            <Global
                styles={css`
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: black;
                        color: white;
                        font-family: 'Arial', sans-serif;
                    }
                `}
            />

            <AppContainer>

                <SwapComponent/>
                <Wallet/>
                <DepositETH/>
                {/*<DepositBNB/>*/}

            </AppContainer>

        </>

    );

}

export default App;
