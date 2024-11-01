import { Input } from "@/components/ui/input";
import { ProfileEditFormProps } from "@/lib/type";

const ProfileEditForm = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="flex flex-col">
      <label htmlFor="name">Artist Name:</label>
      <Input
        id="name"
        name="name"
        defaultValue={formData.name}
        placeholder="Enter artist name"
        onChange={onChange}
        className="border border-gray-400 rounded-md p-2"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="experience">Work Experience:</label>
      <Input
        id="experience"
        name="experience"
        defaultValue={formData.experience}
        placeholder="Enter experience"
        onChange={onChange}
        className="border border-gray-400 rounded-md p-2"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="studio">Studio:</label>
      <Input
        id="studio"
        name="studio"
        onChange={onChange}
        className="border border-gray-400 rounded-md p-2"
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="profilePicture">Profile Picture:</label>
      <input
        type="file"
        id="file-upload"
        name="file-upload"
        onChange={onFileChange}
        className="border border-gray-400 rounded-md p-2"
      />
    </div>
    <div className="flex space-x-4">
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save Changes
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-red-500 text-white p-2 rounded"
      >
        Cancel
      </button>
    </div>
  </form>
);

export default ProfileEditForm;
