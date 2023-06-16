import SavedMovies from "../components/SavedMovies";

type PropsType = {
  onOpenModal: (movie: any) => void;
};

const Account = ({ onOpenModal }: PropsType) => {
  return (
    <div className="w-full mt-24 mb-8">
      <SavedMovies onOpen={onOpenModal} />
    </div>
  );
};

export default Account;