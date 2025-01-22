import React, { ReactNode } from 'react';

interface DialogBoxProps {
  handdleclick: () => void; // Function to handle the cancel action
  confirmDelete: () => void; // Function to handle the confirm action
  children: ReactNode; // Dynamic content passed to the dialog
  confirmText?: string; // Customizable text for the confirm button
  cancelText?: string; // Customizable text for the cancel button
}

export function DialogBox({
  handdleclick,
  confirmDelete,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: DialogBoxProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded shadow-lg w-80">
        {children}
        <div className="flex justify-end gap-4 mt-4">
        <button
            onClick={() => { console.log('Confirm clicked'); confirmDelete(); }}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            {confirmText}
          </button>
          <button
            onClick={() => {  handdleclick(); }}
            className="px-4 py-2 bg-white text-black rounded"
          >
            {cancelText}
          </button>
         
        </div>
      </div>
    </div>
  );
}
