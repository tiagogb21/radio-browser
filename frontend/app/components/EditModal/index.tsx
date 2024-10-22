interface EditModalProp {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  name: string;
  editedName: string;
  setEditedName: (value: string) => void;
  handleSaveEdit: () => void;
}

export const EditModal = ({
  isModalOpen,
  setIsModalOpen,
  name,
  editedName,
  setEditedName,
  handleSaveEdit,
}: EditModalProp) => {
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl mb-4">Edit Radio Name</h2>
            <p className="mb-2">
              Current Name: <strong>{name}</strong>
            </p>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border rounded-lg w-full p-2 mb-4"
              placeholder="Enter new name"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
