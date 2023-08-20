const Modal = ({
  children,
  shown,
  toggle,
}: {
  children: React.ReactNode;
  shown: boolean;
  toggle: () => void;
}) => {
  return (
    <div
      id="modal"
      data-shown={shown}
      className="fixed inset-0 hidden h-screen w-screen place-content-center overflow-y-auto bg-dark bg-opacity-70 data-[shown=true]:grid"
      onClick={toggle}
    >
      {children}
      <button
        className="rounded-xl bg-white px-4 py-1 text-dark"
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
      >
        close
      </button>
    </div>
  );
};

export default Modal;
