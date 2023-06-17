import { useState } from "react";
import { useAccount } from "wagmi";

export default function LoginModal() {
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        onClick={openModal}
      >
        Open Modal
      </button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-blue-950 p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl font-bold mb-4">Modal Content</h1>
            <p>Clicking inside the modal won't close it.</p>
            <button onClick={closeModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
