import { memo } from 'react';

import Main from "../components/Main";
import Row from "../components/Row";
import { requestsInfo } from "../Request";

type PropsType = {
  onOpenModal: (movie: any) => void;
};

const HomePage = ({ onOpenModal }: PropsType) => {
  return (
    <>
      <Main onOpen={onOpenModal} />
      {requestsInfo.map((request, index) => (
        <Row key={index} title={request.title} fetchUrl={request.requestUrl} onOpen={onOpenModal} />
      ))}
    </>
  );
};

export default memo(HomePage);