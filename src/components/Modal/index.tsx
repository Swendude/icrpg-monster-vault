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
      className="fixed inset-0 hidden h-screen w-screen flex-col place-content-center items-center gap-4 overflow-y-auto bg-dark bg-opacity-70 data-[shown=true]:flex"
      onClick={() => {
        console.log("BACKSP");
        toggle();
      }}
    >
      {children}
      <button
        className="aspect-square rounded-full bg-white p-4 font-hand text-dark"
        onClick={(event) => {
          event.stopPropagation();
          console.log("BUT");
          toggle();
        }}
      >
        X
      </button>
    </div>
  );
};

export default Modal;
