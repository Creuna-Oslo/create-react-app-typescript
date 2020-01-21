import * as React from "react";
import cn from "classnames";
import C1 from "../../assets/creuna-logos/C1.svg";
import C2 from "../../assets/creuna-logos/C2.svg";
import C3 from "../../assets/creuna-logos/C3.svg";
import C4 from "../../assets/creuna-logos/C4.svg";
import * as css from "./Header.module.scss";

interface IProps {
  username: string;
  logoutUrl: string;
}

export class Header extends React.PureComponent<IProps> {
  render(): JSX.Element {
    return (
      <div>
        <p>
          Example component showing use of inline svg import, classnames, and
          scss modules.
        </p>
        <C1
          width={30}
          height={30}
          className={cn("d-inline-block align-top", css.default.logo)}
        />
        <C2
          width={30}
          height={30}
          className={cn("d-inline-block align-top", css.default.logo)}
        />
        <C3
          width={30}
          height={30}
          className={cn("d-inline-block align-top", css.default.logo)}
        />
        <div className="black-background">
          <C4
            width={30}
            height={30}
            className={cn("d-inline-block align-top", css.default.logo)}
          />
        </div>
      </div>
    );
  }
}
