import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import { Vigenere } from "../components/vigenere";
import { Scytale } from "../components/scytale";
import { Caesar } from "../components/caesar";
import { BaseLayout } from "../components/layout";

export const Routes = () => {

    return (
        <Switch>
            <Route exact
                path="/caesar"
                render={() =>
                    <BaseLayout>
                        <Caesar />
                    </BaseLayout>
                }
            />
            <Route exact
                path="/vigenere"
                render={() =>
                    <BaseLayout>
                        <Vigenere />
                    </BaseLayout>
                }
            />
            <Route exact
                path="/escitala"
                render={() =>
                    <BaseLayout>
                        <Scytale />
                    </BaseLayout>
                }
            />
            <Redirect to="/vigenere" />
        </Switch>
    );
};