import { useNavigate } from "react-router";
import { trpc } from "../../lib/trpc";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { getSignInRoute } from "../../lib/routes";

export const SignOutPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  useEffect(() => {
    Cookies.remove("token");
    trpcUtils.invalidate().then(() => {
      trpcUtils.invalidate().then(() => {
        navigate(getSignInRoute());
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <p>Loading...</p>;
};
