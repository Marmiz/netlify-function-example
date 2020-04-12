import HomePage from "./HomePage";
import { User } from "netlify-identity-widget";
import { Navigator } from "react-onsenui";

export type authProps = {
  isAuthenticated: boolean;
  user: null | User;
  authenticate: () => void;
  signout: (callback: any) => void;
};

export interface HomePageProps extends PrivateRouteProps {
  navigator: Navigator;
}

export interface PrivateRouteProps {
  isAuth: boolean;
  netlifyAuth: authProps;
}

/**
 * Remove from T the keys that are in common with K
 */
export type Optionalize<T extends K, K> = Omit<T, keyof K>;

export default HomePage;
