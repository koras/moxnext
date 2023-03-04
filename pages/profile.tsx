import ContentBox from "../components/ContentBox";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'


export default () => {
  const { data: session } = useSession();
  const router = useRouter();
  const GetProfileInfo = () => {
    if (session) {
      return (
        <div>
          Пока здесь пусто, но скоро здесь будет страничка профиля
        </div>
      )
    } else {
      return <div>
        Вы не авторизаваны на сайте.
      </div>
    }
  }
  return (
    <ContentBox title="Кабинет" pageTitle="Кабинет" hideBorder={true} >
      <div >{<GetProfileInfo />}</div>
    </ContentBox>
  );
}
