import React from "react";
import Content from "./header-page.json";
import { Header } from "../../../components/Header/Header";

const HeaderPage = (): JSX.Element => <Header {...Content} />;

export default HeaderPage;
