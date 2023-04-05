import { YMInitializer } from 'react-yandex-metrika';

export const ymId = 93101865; // замените на свой идентификатор счетчика

export const Metrika = (): JSX.Element => (
  <YMInitializer accounts={[ymId]} options={{webvisor: true}} version="2" />
);