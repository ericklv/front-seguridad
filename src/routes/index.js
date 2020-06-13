import {Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import { Vigenere } from "../components/vigenere";
import { Escitala } from "../components/escitala";
import { BaseLayout } from "../components/layout";

export const Routes = () => {

    return (
        <Switch>
            <Route exact
                   path="/vigenere"
                   render={() =>
                       <BaseLayout>
                           <Vigenere/>
                       </BaseLayout>
                   }
            />
            <Route exact
                   path="/escitala"
                   render={() =>
                       <BaseLayout>
                           <Escitala/>
                       </BaseLayout>
                   }
            />
            <Redirect to="/vigenere"/>
        </Switch>
    );
};