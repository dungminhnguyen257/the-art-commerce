type Props = {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => {} | void;
};

const SubmitButton: React.FC<Partial<Props>> = ({
  text = 'submit',
  type = 'submit',
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="float-right mt-8 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
    >
      <span className="capitalize">{text}</span>
    </button>
  );
};

export default SubmitButton;
