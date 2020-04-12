import * as React from "react";
import netlifyIdentity from "netlify-identity-widget";

import { PrivateRouteProps, Optionalize, authProps } from "./index";

const netlifyAuth: authProps = {
  isAuthenticated: false,
  user: null,
  authenticate() {
    console.log("auth", this);
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on("login", user => {
      this.user = user;
    });
  },
  signout(callback: any) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      this.user = null;
      callback();
    });
  }
};

// see https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/HOC.md#section-0-full-hoc-example
function withAuth<T extends PrivateRouteProps = PrivateRouteProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  return class ComponentWithTheme extends React.Component<
    Optionalize<T, PrivateRouteProps>
  > {
    public static displayName = `withAuth(${displayName})`;

    public render() {
      // Fetch the props you want inject. This could be done with context instead.
      const themeProps = { foo: "bar", netlifyAuth };

      // this.props comes afterwards so the can override the default ones.
      return <WrappedComponent {...themeProps} {...(this.props as T)} />;
    }
  };
}

export default withAuth;
