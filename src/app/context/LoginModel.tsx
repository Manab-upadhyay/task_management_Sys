import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context's value
interface ModalContextType {
  showModal: boolean;
  toggleModal: () => void;
}


const ModalContext = createContext<ModalContextType | undefined>(undefined);


interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    console.log("login modal toggled");
  };

  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  
  return context;
};
